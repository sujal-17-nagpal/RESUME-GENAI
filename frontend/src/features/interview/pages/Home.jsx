import React,{useState,useRef} from "react";
import "../styles/Home.scss";
import { useInterview } from "../hooks/useInterview";
import {useNavigate} from "react-router-dom"

const Home = () => {

  const {loading,generateReport} = useInterview()
  const  [jobDescription,setJobDescription] = useState("")
  const [selfDescription,setSelfDescription] = useState("")

  const resumeInputRef = useRef()
  const navigate = useNavigate()

  const handleGenerateReport = async()=>{
    // console.log("chala")
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({jobDescription,selfDescription,resumeFile})
    
    navigate(`/interview/${data._id}`)
  }

  return (
    <main className="home">
      <div className="home__wrapper">
        <section className="home__left">
          <div className="textarea-label">
            <h1>Job Description</h1>
          </div>
          <textarea
          onChange={(e)=>setJobDescription(e.target.value)}
            id="jobDescription"
            name="jobDescription"
            placeholder="Enter job description here"
          />
        </section>

        <section className="home__right">
          <div className="input-group">
            <label htmlFor="resume">Upload Resume</label>
            <input ref={resumeInputRef} type="file" name="resume" id="resume" accept=".pdf" />
          </div>

          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea
            onChange={(e)=>setSelfDescription(e.target.value)}
              id="selfDescription"
              name="selfDescription"
              placeholder="Describe yourself"
            />
          </div>

          <button onClick={handleGenerateReport} className="generate-btn" type="button">
            Generate Interview Report
          </button>
        </section>
      </div>
    </main>
  );
};

export default Home;
