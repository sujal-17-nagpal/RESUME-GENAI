import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials : true
})

export const generateInterviewReportApi = async({jobDescription,selfDescription,resumeFile})=>{
    const formData = new formData()
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    formData.append("resume",resume)

    const response = api.post("/api/interview/",formData,{
        headers:{
            "Content-Type":"multiport/form-data"
        }
    })

    return response.data
}

export const getInterviewReportById = async(interviewId)=>{
    const res = await api.get(`/api/interview/${getInterviewReportById}`)
    return res.data
}

export const getAllInterviewReports = async()=>{
    const res = await api.get("/api/interview/")
    return res.data
}