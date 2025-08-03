import axios from "axios"

interface authRegisterData {
    firstname : string,
    lastname : string,
    email : string,
    password : string
}
interface authLoginData {
    email : string,
    password : string
}
export interface publishSessionsType {
    title : string, 
    description : string,  
    tags : string, 
    json_file_url : string , 
    difficulty : string
}


export const RegisterApi = async(path : string , payLoad : authRegisterData) => {
    try {
        const res = await axios.post(path , payLoad , { withCredentials : true })
        return res
    } catch (error:any) {
        console.log("Error from register api" , error.message)
    }
}

export const LoginApi = async(path : string , payLoad : authLoginData) => {
    try {
        const res = await axios.post(path , payLoad , { withCredentials : true })
        return res
    } catch (error:any) {
        console.log("Error from login api" , error)
    }
}


// publish sessions

export const PublishSessionsApi = async(path : string , payLoad : publishSessionsType) => {
    try {
        const res = await axios.post(path , payLoad , { withCredentials : true })
        return res
    } catch (error:any) {
        console.log("Error from publish session api" , error)
    }
}


export const DraftSessionsApi = async(path : string , payLoad : publishSessionsType) => {
    try {
        const res = await axios.post(path , payLoad , { withCredentials : true })
        return res
    } catch (error:any) {
        console.log("Error from publish session api" , error)
    }
}

export const DeleteSessionsApi = async(path : string ) => {
    try {
        const res = await axios.delete(path , { withCredentials : true })
        return res
    } catch (error:any) {
        console.log("Error from Delete session api" , error)
    }
}