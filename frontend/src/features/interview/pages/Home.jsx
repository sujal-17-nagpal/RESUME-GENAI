import React from "react";
import "../styles/Home.scss";

const Home = () => {
  return (
    <main className="home">
      <div className="home__wrapper">
        <section className="home__left">
          <div className="textarea-label">
            <h1>Job Description</h1>
          </div>
          <textarea
            id="jobDescription"
            name="jobDescription"
            placeholder="Enter job description here"
          />
        </section>

        <section className="home__right">
          <div className="input-group">
            <label htmlFor="resume">Upload Resume</label>
            <input type="file" name="resume" id="resume" accept=".pdf" />
          </div>

          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea
              id="selfDescription"
              name="selfDescription"
              placeholder="Describe yourself"
            />
          </div>

          <button className="generate-btn" type="button">
            Generate Interview Report
          </button>
        </section>
      </div>
    </main>
  );
};

export default Home;
