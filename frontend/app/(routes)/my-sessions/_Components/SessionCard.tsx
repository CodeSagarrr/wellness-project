"use client"
import { DraftSessionsApi, PublishSessionsApi , DeleteSessionsApi } from "../../../Apis/RequestAPI";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Eye, FileText, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import moment from "moment";
import React, { useState } from "react";
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast";
export interface EditDraftSessionsType {
    sessionId: string,
    title: string,
    description: string,
    tags: string,
    json_file_url: string,
    difficulty: string
}

export const SessionCard = ({ session }: { session: any }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        tags: '',
        JsonUrl: "",
        difficulty: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleEditPublish = async(sessionId : string) => {
        const payLoad: EditDraftSessionsType = {
            sessionId: sessionId,
            title: session.title,
            description: session.description,
            tags: session.tags.join(', '),
            json_file_url: session.json_file_url,
            difficulty: session.difficulty
        }
        try {
            const response = await PublishSessionsApi("/v1/my-sessions/publish", payLoad);
            if (response?.status === 200) {
                toast.success("Published successfully")
            } else {
                toast.error(response?.data.message)
            }
        } catch (error:any) {
            console.log("Error from publish function" , error.message)
        }
    }

    const handleEdit = () => {
        setIsEditDialogOpen(true);

        // Populate form with existing session data
        setEditForm({
            title: session.title,
            description: session.description,
            tags: session.tags.join(', '),
            JsonUrl: session.json_file_url,
            difficulty: session.difficulty,
        });
    };

    const handleSubmit = async () => {
        const payLoad: EditDraftSessionsType = {
            sessionId: session._id,
            title: editForm.title,
            description: editForm.description,
            tags: editForm.tags,
            json_file_url: editForm.JsonUrl,
            difficulty: editForm.difficulty
        }

        try {
            const response = await DraftSessionsApi("/v1/my-sessions/save-draft", payLoad);
            if (response?.status === 200) {
                toast.success("Update session successfully")
                setIsEditDialogOpen(false)
            } else {
                toast.error(response?.data.message)
            }
        } catch (error: any) {
            console.log("Edit form error", error.message)
        }
    }

    const handleDelete = async(sessionId : String) => {
        try {
            const response = await DeleteSessionsApi(`/v1/sessions/${sessionId}`);
            if(response?.status === 200){
                toast.success("Session are deleted")
            }else{
                toast.error(response?.data.message)
            }
        } catch (error : any) {
            console.log("error from delete function" , error.message)
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'meditation': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
            case 'mindfulness': return 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30';
            case 'yoga': return 'bg-orange-500/20 text-orange-400 border-orange-400/30';
            case 'sleep': return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
            case 'breathing': return 'bg-pink-500/20 text-pink-400 border-pink-400/30';
            default: return 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30';
        }
    };

    return (
        <div>
            <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <CardTitle className="sm:text-2xl text-xl">{session.title}</CardTitle>
                                {session.status === 'published' ? (
                                    <CheckCircle className="h-6 w-6 sm:mr-0 mr-6 text-green-500" />
                                ) : (
                                    <FileText className="sm:h-6 h-5 sm:w-6 w-5 sm:mr-0 mr-6 text-rose-400" />
                                )}
                            </div>
                            <CardDescription>{session.description}</CardDescription>
                        </div>
                        <Badge
                            variant={session.status === 'published' ? 'default' : 'secondary'}
                            className="capitalize"
                        >
                            {session.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {session.tags.map((tag: string) => (
                                <Badge key={tag} variant="outline" className={`text-xs ${getCategoryColor(tag)}`}>
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="text-sm text-muted-foreground">
                            <div>Created: {moment(session.created_at).format("l")}</div>
                            <div>Updated: {moment(session.updated_at).format("lll")}</div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t">
                            <div className="flex gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleEdit}
                                    className="gap-2"
                                >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Eye className="h-4 w-4" />
                                  
                                </Button>
                            </div>

                            <div className="flex gap-2">
                                {session.status === 'draft' && (
                                    <Button
                                        size="sm"
                                        onClick={() => handleEditPublish(session._id)}
                                        className="gap-2"
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        Publish
                                    </Button>
                                )}
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(session._id)}
                                    className="gap-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className='text-black text-3xl font-extrabold'>Edit Session</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="space-y-2 text-black">
                            <label htmlFor="edit-title">Title</label>
                            <Input
                                id="edit-title"
                                name='title'
                                value={editForm.title}
                                onChange={handleChange}
                                placeholder="Session title"
                            />
                        </div>

                        <div className="space-y-2 text-black">
                            <label htmlFor="edit-description">Description</label>
                            <Textarea
                                id="edit-description"
                                name='description'
                                value={editForm.description}
                                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Session description"
                                rows={6}
                            />
                        </div>

                        <div className="space-y-3 text-black">
                            <label htmlFor="edit-tags">Tags</label>
                            <Input
                                id="edit-tags"
                                name='tags'
                                value={editForm.tags}
                                onChange={handleChange}
                                placeholder="meditation, yoga, stress-relief"
                            />
                            <p className="text-xs text-muted-foreground">
                                Separate tags with commas
                            </p>
                        </div>

                        <div className="space-y-2 text-black">
                            <label htmlFor="json-file">JSON File URL</label>
                            <Input
                                id="json-file"
                                name='JsonUrl'
                                onChange={handleChange}
                                placeholder="http://example.com/session.json"
                            />
                        </div>

                        <div className="space-y-2 text-black">
                            <label htmlFor="difficulty">Difficulty</label>
                            <Input
                                id="difficulty"
                                name='difficulty'
                                onChange={handleChange}
                                placeholder="Beginner , Intermediate , Advanced "
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => setIsEditDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            Save Changes
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>

    )
};
