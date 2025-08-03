"use client"
import axios from "axios";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

 export interface loggedUser {
  isAuthenticated: boolean,
  firstname: string,
  lastname: string,
  email: string,
}

export interface allSessionType {
  user_id: string,
  title: string,
  description : string,
  tags: string[],
  json_file_url: string,
  status: "draft"| "published",
  difficulty : "Beginner" | "Intermediate" | "Advanced",
  created_at: Date
  updated_at: Date
}

type SessionContextType = {
  user: loggedUser | undefined;
  isAuthenticated : boolean;
  allSessions : allSessionType[];
  mySessions : allSessionType[];
};


const SessionContext = createContext<SessionContextType | undefined>(undefined);


export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<loggedUser>();
  const [isAuthenticated , setIsAuthenticated] = useState<boolean>(false);
  const [allSessions, setAllSessions] = useState<allSessionType[]>([]);
  const [mySessions, setMySessions] = useState<allSessionType[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/v1/check-auth", { withCredentials: true });
        if (res.status === 200) {
          setUser(res.data);
          setIsAuthenticated(!isAuthenticated)
        } else {
          console.log(res.data.message)
        }
      } catch (error: any) {
        console.log("error in check user", error.message)
      }
    }
    checkUser();
    const interval = setInterval(() => {
      checkUser()
    }, 2000)
    return () => clearInterval(interval);
  }, [])


  useEffect(() => {
    const getAllSessions = async () => {
      try {
        const res = await axios.get("/v1/sessions", { withCredentials: true });
        if (res.status === 200) {
          setAllSessions(res.data?.publishedSession);
        } else {
          console.log(res.data.message)
        }
      } catch (error: any) {
        console.log("error in all sessions", error.message)
      }
    }
    getAllSessions();
    const interval = setInterval(() => {
      getAllSessions()
    }, 1000)
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    const getMySessions = async () => {
      try {
        const res = await axios.get("/v1/my-sessions", { withCredentials: true });
        if (res.status === 200) {
          setMySessions(res.data?.mySessions);
        } else {
          console.log(res.data.message)
        }
      } catch (error: any) {
        console.log("error in all sessions", error.message)
      }
    }
    getMySessions();
    const interval = setInterval(() => {
      getMySessions()
    }, 1000)
    return () => clearInterval(interval);
  }, [])

  return (
    <SessionContext.Provider
      value={{ user , isAuthenticated , allSessions , mySessions }}
    >
      {children}
    </SessionContext.Provider>
  );
};


export const useSession = () => useContext(SessionContext);
