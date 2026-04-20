import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Interview.scss";
import { useInterview } from "../hooks/useInterview";

const Interview = () => {
  const navigate = useNavigate();
  const {interviewId} = useParams()
  const { report, loading } = useInterview(interviewId);

  const [activeTab, setActiveTab] = useState("overview");

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case "high": return "badge-danger";
      case "medium": return "badge-warning";
      case "low": return "badge-success";
      default: return "badge-default";
    }
  };

  if (loading) {
    return (
      <div className="interview-page">
        <div className="interview-layout pt-glass" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
          <p style={{ fontSize: "1.2rem", opacity: 0.7 }}>Loading report&hellip;</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="interview-page">
        <div className="interview-layout pt-glass" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", gap: "1rem" }}>
          <p style={{ fontSize: "1.2rem", opacity: 0.7 }}>No report available.</p>
          <button className="back-btn" onClick={() => navigate("/")}>
            &larr; Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-page">
      <div className="interview-layout pt-glass">
        
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <button className="back-btn" onClick={() => navigate("/")}>
              &larr; Back
            </button>
            <h2>Analysis Report</h2>
          </div>
          
          <nav className="tab-menu">
            <button 
              className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview & Match
            </button>
            <button 
              className={`tab-btn ${activeTab === "technical" ? "active" : ""}`}
              onClick={() => setActiveTab("technical")}
            >
              Technical Questions
            </button>
            <button 
              className={`tab-btn ${activeTab === "behavioral" ? "active" : ""}`}
              onClick={() => setActiveTab("behavioral")}
            >
              Behavioral Questions
            </button>
            <button 
              className={`tab-btn ${activeTab === "preparation" ? "active" : ""}`}
              onClick={() => setActiveTab("preparation")}
            >
              Preparation Plan
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="content-area">
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="tab-content overview-tab animate-fade-in">
              <header className="overview-header">
                <div className="header-text">
                  <h1>Executive Summary</h1>
                  <p className="subtitle">Based on your resume and job description</p>
                </div>
                <div className="match-score">
                  <div className="progress-circle" style={{ "--score": `${report.matchScore}%` }}>
                    <div className="progress-circle-inner">
                      <span>{report.matchScore ?? 0}</span>
                      <small>%</small>
                    </div>
                  </div>
                  <p>Match Score</p>
                </div>
              </header>

              <section className="interview-section skill-gaps-section">
                <h2>Identified Skill Gaps</h2>
                {report.skillGaps && report.skillGaps.length > 0 ? (
                  <div className="gaps-container">
                    {report.skillGaps.map((gap, index) => (
                      <div key={index} className="gap-card">
                        <span className={`severity-badge ${getSeverityClass(gap.severity)}`}>
                          {gap.severity} Priority
                        </span>
                        <h3>{gap.skill}</h3>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No major skill gaps identified. Great match!</p>
                )}
              </section>
            </div>
          )}

          {/* TAB: TECHNICAL QUESTIONS */}
          {activeTab === "technical" && (
            <div className="tab-content animate-fade-in">
              <section className="interview-section">
                <h2>Technical Questions</h2>
                <p className="tab-desc">Questions targeting your technical expertise and problem solving.</p>
                <div className="qa-list">
                  {report.technicalQuestions?.map((tq, index) => (
                    <div key={index} className="qa-card">
                      <div className="qa-header">
                        <span className="q-num">Q{index + 1}</span>
                        <p className="intention">{tq.intention}</p>
                      </div>
                      <h4 className="question">{tq.question}</h4>
                      <div className="answer-box">
                        <strong>Suggested Answer Focus:</strong>
                        <p>{tq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* TAB: BEHAVIORAL QUESTIONS */}
          {activeTab === "behavioral" && (
            <div className="tab-content animate-fade-in">
              <section className="interview-section">
                <h2>Behavioral Questions</h2>
                <p className="tab-desc">Questions assessing your soft skills, leadership, and cultural fit.</p>
                <div className="qa-list">
                  {report.behavioralQuestions?.map((bq, index) => (
                    <div key={index} className="qa-card">
                      <div className="qa-header">
                        <span className="q-num">Q{index + 1}</span>
                        <p className="intention">{bq.intention}</p>
                      </div>
                      <h4 className="question">{bq.question}</h4>
                      <div className="answer-box">
                        <strong>Suggested Answer Focus:</strong>
                        <p>{bq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* TAB: PREPARATION PLAN */}
          {activeTab === "preparation" && (
            <div className="tab-content animate-fade-in">
              <section className="interview-section preparation-section">
                <h2>Preparation Timeline</h2>
                <p className="tab-desc">A structured day-by-day plan to boost your confidence.</p>
                <div className="timeline">
                  {report.preparationPlan?.map((plan, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-day">Day {plan.day}</div>
                      <div className="timeline-content">
                        <h3>{plan.focus}</h3>
                        <ul>
                          {plan.tasks?.map((task, tIndex) => (
                            <li key={tIndex}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Interview;
