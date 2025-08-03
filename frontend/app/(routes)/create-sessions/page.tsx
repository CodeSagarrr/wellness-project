"use client"
import React, { useState, useEffect } from "react";
import { PublishSessionsApi, DraftSessionsApi, publishSessionsType } from '../../Apis/RequestAPI'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Save, Upload, Eye, ArrowLeft } from "lucide-react";
import Navbar from "../../_components/Navbar";
import Link from "next/link";
import toast from "react-hot-toast";

const CreateSessions = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    difficulty: "",
    jsonUrl: ""
  })
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save functionality with debouncing
  useEffect(() => {
    const hasData = formData.title || formData.description || formData.tags || formData.difficulty || formData.jsonUrl;

    if (hasData) {
      setHasUnsavedChanges(true);

      const timer = setTimeout(async () => {
        // Prevent auto-save if manual save is in progress
        if (isSaving) return;

        setIsAutoSaving(true);
        try {
          const payLoad: publishSessionsType = {
            title: formData.title,
            description: formData.description,
            tags: formData.tags,
            json_file_url: formData.jsonUrl,
            difficulty: formData.difficulty
          };

          const response = await DraftSessionsApi("/v1/my-sessions/save-draft", payLoad);
          if (response?.status === 200) {
            setLastSaved(new Date());
            setHasUnsavedChanges(false);
            setIsAutoSaving(false);
            toast.success("Changes auto-saved");
          }
        } catch (error: any) {
          console.error("Auto-save error:", error);
          setIsAutoSaving(false);
        }
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setHasUnsavedChanges(false);
      setIsAutoSaving(false);
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSaveDraft = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData) {
      toast.error("Missing required fields");
      return;
    }

    setIsSaving(true);
    const payLoad: publishSessionsType = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags,
      json_file_url: formData.jsonUrl,
      difficulty: formData.difficulty
    }

    try {
      const response = await DraftSessionsApi("/v1/my-sessions/save-draft", payLoad);
      if (response?.status === 200) {
        toast.success("Draft saved successfully");
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      } else {
        toast.error(response?.data.message)
      }
    } catch (error: any) {
      console.log("Error from session function", error.message)
    } finally {
      setIsSaving(false);
    }
  };



  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData) {
      toast.error("Missing required fields");
      return;
    }

    if (isSaving) {
      return toast("Session save as a draft , Go to my-session", { duration: 4000 });
    }
    const payLoad: publishSessionsType = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags,
      json_file_url: formData.jsonUrl,
      difficulty: formData.difficulty
    }

    try {
      const response = await PublishSessionsApi("/v1/my-sessions/publish", payLoad);
      if (response?.status === 200) {
        toast.success("Session published");
        setFormData({
          title: "",
          description: "",
          tags: "",
          difficulty: "",
          jsonUrl: ""
        })
        setLastSaved(null);
        setHasUnsavedChanges(false);
      } else {
        toast.error(response?.data.message)
      }
    } catch (error: any) {
      console.log("Error from session function", error.message)
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/my-sessions">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Session Editor</h1>
                <p className="text-muted-foreground">
                  Create a new wellness session or edit an existing one
                </p>
              </div>
            </div>
          </div>

          {/* Auto-Save Status Section */}
          <Card >
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isAutoSaving ? (
                    <>
                      <Clock className="h-5 w-5 text-wellness-primary animate-spin" />
                      <div>
                        <p className="font-medium text-wellness-primary">Auto-saving...</p>
                        <p className="text-xs text-muted-foreground">Your changes will be saved automatically</p>
                      </div>
                    </>
                  ) : hasUnsavedChanges ? (
                    <>
                      <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse" />
                      <div>
                        <p className="font-medium text-amber-700 dark:text-amber-400">Unsaved changes</p>
                        <p className="text-xs text-muted-foreground">Changes will auto-save in a few seconds</p>
                      </div>
                    </>
                  ) : lastSaved ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-emerald-700 dark:text-emerald-400">All changes saved</p>
                        <p className="text-xs text-muted-foreground">
                          Last saved at {lastSaved.toLocaleTimeString()}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                      <div>
                        <p className="font-medium text-muted-foreground">Ready to save</p>
                        <p className="text-xs text-muted-foreground">Start typing to enable auto-save</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  Auto-saves every 5 seconds
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Form */}
            <div className="space-y-6">
              <Card >
                <CardHeader>
                  <CardTitle>Session Details</CardTitle>
                  <CardDescription>
                    Provide basic information about your wellness session
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 ">
                  <div className="space-y-2">
                    <label htmlFor="title">Session Title *</label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter session title..."
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description">Description *</label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your wellness session..."
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setFormData({ ...formData, description: e.target.value }) }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="tags">Tags</label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="meditation, yoga, stress-relief (comma separated)"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="difficulty">Difficulty *</label>
                    <Input
                      id="difficulty"
                      name="difficulty"
                      placeholder="Beginner , Intermediate , Advanced"
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card >
                <CardHeader>
                  <CardTitle >Session Content</CardTitle>
                  <CardDescription>
                    Upload or link to your session content (JSON format)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 ">
                  <div className="space-y-2">
                    <label htmlFor="jsonUrl">JSON File URL</label>
                    <Input
                      id="jsonUrl"
                      name="jsonUrl"
                      placeholder="https://example.com/session.json"
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button variant="secondary" className="gap-2 flex-1" onClick={handleSaveDraft}>
                  <Save className="h-4 w-4" />
                  Save as Draft
                </Button>
                <Button onClick={handlePublish} className="gap-2 flex-1">
                  <Upload className="h-4 w-4" />
                  Publish Session
                </Button>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle >Live Preview</CardTitle>
                      <CardDescription>
                        See how your session will appear to users
                      </CardDescription>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      {showPreview ? 'Hide' : 'Show'} Preview
                    </Button>
                  </div>
                </CardHeader>
                {showPreview && (
                  <CardContent>
                    <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                      {formData.title ? (
                        <h3 className="text-xl font-semibold">{formData.title}</h3>
                      ) : (
                        <div className="h-6 bg-muted rounded animate-pulse" />
                      )}

                      {formData.description ? (
                        <p className="text-muted-foreground">{formData.description}</p>
                      ) : (
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded animate-pulse" />
                          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                        </div>
                      )}
                      {formData.difficulty ? (
                        <p className="text-black font-bold">{formData.difficulty}</p>
                      ) : (
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded animate-pulse" />
                          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                        </div>
                      )}


                      {formData.tags && (
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" >
                            {formData.tags}
                          </Badge>
                        </div>
                      )}

                      <div className="border rounded-lg p-4 bg-background/50">
                        <p className="text-sm text-muted-foreground text-center">
                          {formData.jsonUrl
                            ? "Session content would load from: " + formData.jsonUrl
                            : "Upload content to see session preview"
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Tips Card */}
              <Card >
                <CardHeader>
                  <CardTitle className="text-lg ">✨ Tips for Great Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm ">
                  <div className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Use descriptive titles that clearly explain the session's purpose</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Add relevant tags to help users discover your content</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Include session duration and difficulty level in the description</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Test your JSON content before publishing</span>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default CreateSessions
