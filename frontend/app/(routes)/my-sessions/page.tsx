"use client"
import { useSession , allSessionType } from '../../Apis/AppContext'
import { Button } from "@/components/ui/button";
import { Card , CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CheckCircle, Plus, LayoutDashboard } from "lucide-react";
import Navbar from "../../_components/Navbar";
import Link from "next/link";
import { SessionCard } from "./_Components/SessionCard"

export default function MySessions() {
  const { mySessions }:any = useSession();
  const draftSessions = mySessions?.filter((session : any) => session.status === 'draft') || [];
  const publishedSessions = mySessions?.filter((session : any) => session.status === 'published') || [];
 

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between flex-col  sm:flex-row items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">My Sessions</h1>
              <p className="text-muted-foreground mt-2">
                Manage your wellness sessions and track your progress
              </p>
            </div>
            <Link href="/create-sessions">
              <Button className="gap-2 wellness-gradient sm:mt-0 mt-6">
                <Plus className="h-4 w-4 " />
                Create New Session
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <Card >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm  font-large text-black font-extrabold ">
                  Total Sessions
                </CardTitle>
                <div className="text-2xl text-orange-500 font-bold">{mySessions.length}</div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-large text-black font-extrabold">
                  Published
                </CardTitle>
                <div className="text-2xl font-bold text-green-600">
                  {publishedSessions.length}
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-large text-black font-extrabold">
                  Drafts
                </CardTitle>
                <div className="text-2xl text-rose-400 font-bold">
                  {draftSessions.length}
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Sessions Tabs */}
          <Tabs defaultValue="all" className="space-y-6 text-black">
            <TabsList className="grid w-full grid-cols-3 max-w-md ">
              <TabsTrigger   value="all">All Sessions</TabsTrigger>
              <TabsTrigger   value="published">Published</TabsTrigger>
              <TabsTrigger   value="drafts">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid gap-6">
                {mySessions.length > 0 ? mySessions.map((session:allSessionType , index:number) => (
                  <SessionCard key={index} session={session}  />
                )) : (
                  <Card className="p-12 text-center">
                    <div className="space-y-4">
                      <LayoutDashboard  className="h-12 w-12 mx-auto text-orange-400" />
                      <div>
                        <h3 className="text-lg font-medium">No your sessions created yet</h3>
                        <p className="text-muted-foreground">
                          Start creating and publishing your wellness sessions
                        </p>
                      </div>
                      <Link href="/create-sessions">
                        <Button>Create First Session</Button>
                      </Link>
                    </div>
                  </Card> )}
              </div>
            </TabsContent>

            <TabsContent value="published" className="space-y-6">
              <div className="grid gap-6">
                {publishedSessions.length > 0 ? (
                  publishedSessions.map((session:allSessionType , index:number) => (
                    <SessionCard key={index} session={session} />
                  ))
                ) : (
                  <Card className="p-12 text-center">
                    <div className="space-y-4">
                      <CheckCircle className="h-12 w-12 mx-auto text-emerald-400" />
                      <div>
                        <h3 className="text-lg font-medium">No published sessions yet</h3>
                        <p className="text-muted-foreground">
                          Start creating and publishing your wellness sessions
                        </p>
                      </div>
                      <Link href="/create-sessions">
                        <Button>Create First Session</Button>
                      </Link>
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="drafts" className="space-y-6">
              <div className="grid gap-6">
                {draftSessions.length > 0 ? (
                  draftSessions.map((session:allSessionType , index:number) => (
                    <SessionCard key={index} session={session} />
                  ))
                ) : (
                  <Card className="p-12 text-center">
                    <div className="space-y-4">
                      <FileText className="h-12 w-12 mx-auto text-rose-400" />
                      <div>
                        <h3 className="text-lg font-medium">No drafts</h3>
                        <p className="text-muted-foreground">
                          All your sessions are published or you haven't started any drafts yet
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
           
    </div>
  );
}