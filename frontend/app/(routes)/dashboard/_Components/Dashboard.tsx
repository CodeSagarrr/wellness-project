"use client"
import { useState } from "react";
import { useSession, allSessionType } from '../../../Apis/AppContext'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboardpage() {
  const { allSessions }: any = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const filteredSessions = allSessions?.filter((session: allSessionType) =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handlePreview = (session: any) => {
    setSelectedSession(session);
  };

  const closePreview = () => {
    setSelectedSession(null);
  };

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
    <div className="min-h-screen ">


      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Discover Wellness Sessions
            </h1>
            <p className="sm:text-xl text-medium text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of guided meditation and yoga sessions designed to
              nurture your mind, body, and spirit.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sessions Grid */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSessions.length > 0 ? filteredSessions.map((session: allSessionType, i: number) => (
              <Card
                key={i}
                className="bg-[#FFFFFF] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {session.title}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {session.status}
                    </Badge>
                  </div>
                  <CardDescription>{session.description}</CardDescription>
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

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {session.difficulty}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handlePreview(session)}
                        className="gap-2"
                      >
                        <Play className="h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) :(
              <div className="flex flex-col space-y-3">
              <Skeleton className="h-[250px] w-[400px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[400px]" />
                <Skeleton className="h-4 w-[400px]" />
              </div>
            </div>
            )}
           
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedSession.title}</h2>
                  <p className="text-muted-foreground mt-2">{selectedSession.description}</p>
                </div>
                <Button variant="secondary" size="icon" onClick={closePreview}>
                  ×
                </Button>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <Play className="h-12 w-12 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Session preview would load here from the JSON URL
                </p>
                <div className="flex justify-center gap-4">
                  <Badge>{selectedSession.status}</Badge>
                  <Badge variant="outline">{selectedSession.difficulty}</Badge>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={closePreview}>
                  Close
                </Button>
                <Button>Start Session</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}