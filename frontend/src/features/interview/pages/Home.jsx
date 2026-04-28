import React,{useState,useRef} from "react";
import "../styles/Home.scss";
import { useInterview } from "../hooks/useInterview";
import {useNavigate} from "react-router-dom"

const Home = () => {

  const {loading,generateReport,reports} = useInterview()
  const  [jobDescription,setJobDescription] = useState("")
  const [selfDescription,setSelfDescription] = useState("")

  const resumeInputRef = useRef()
  const navigate = useNavigate()

  const handleGenerateReport = async()=>{
    console.log("chala")
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({jobDescription,selfDescription,resumeFile})
    console.log(data)
    if(data) navigate(`/interview/${data._id}`)
  }

  const getScoreColor = (score) => {
    if (score >= 75) return "#22c55e";
    if (score >= 50) return "#eab308";
    return "#ef4444";
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="home">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Generating your interview report<span className="dots"></span></p>
            <small>This may take a moment...</small>
          </div>
        </div>
      )}
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
            disabled={loading}
          />
        </section>

        <section className="home__right">
          <div className="input-group">
            <label htmlFor="resume">Upload Resume</label>
            <input ref={resumeInputRef} type="file" name="resume" id="resume" accept=".pdf" disabled={loading} />
          </div>

          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea
            onChange={(e)=>setSelfDescription(e.target.value)}
              id="selfDescription"
              name="selfDescription"
              placeholder="Describe yourself"
              disabled={loading}
            />
          </div>

          <button onClick={handleGenerateReport} className="generate-btn" type="button" disabled={loading}>
            {loading ? (
              <><span className="btn-spinner"></span> Generating...</>
            ) : (
              "Generate Interview Report"
            )}
          </button>
        </section>
      </div>

      {/* Previous Reports Section */}
      {reports && reports.length > 0 && (
        <section className="reports-section">
          <h2 className="reports-section__title">Previous Reports</h2>
          <div className="reports-grid">
            {reports.map((r) => (
              <div
                key={r._id}
                className="report-card"
                onClick={() => navigate(`/interview/${r._id}`)}
              >
                <div className="report-card__header">
                  <div
                    className="report-card__score"
                    style={{ "--score-color": getScoreColor(r.matchScore) }}
                  >
                    <span className="score-value">{r.matchScore ?? "–"}</span>
                    <span className="score-label">%</span>
                  </div>
                </div>
                <div className="report-card__body">
                  <h3 className="report-card__title">{r.title || "Interview Report"}</h3>
                  <p className="report-card__date">{formatDate(r.createdAt)}</p>
                </div>
                <div className="report-card__footer">
                  <span className="view-link">View Report &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
