import { useContext } from "react";
import { InterviewContext } from "../interview.context";
import { generateInterviewReportApi, getAllInterviewReports, getInterviewReportById } from "../services/interview.api";

export const useInterview = ()=>{
    const context = useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be in Interview context");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true)
        try {
            console.log("chali useInterview.js")
            const response = await generateInterviewReportApi({jobDescription,selfDescription,resumeFile})
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    const getReportById = async(interviewId)=>{
        setLoading(true)
        try {
            const response = await  getInterviewReportById(interviewId)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    const getReports = async()=>{
        setLoading(false)
        try {
            const response = await getAllInterviewReports()
        setReports(response.interviewReports)
            return response.interviewReports
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    return {loading,report,reports,generateReport,getReportById,getReports}
}