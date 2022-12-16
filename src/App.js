import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = "https://course-api.com/react-tabs-project";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchData = async (url) => {
    const response = await fetch(url);
    const jobs = await response.json();

    return jobs;
  };

  const loadJobs = async () => {
    setIsLoading(true);
    const jobs = await fetchData(url);
    setJobs(jobs);
    setIsLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // RETURN
  if (isLoading)
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );

  // AFTER THE LOAD, SHOW FIRST ITEM
  const { company, dates, duties, title } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Experience:</h2>
        <div className="underline" />
      </div>

      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, index) => (
            <button
              key={job.id}
              onClick={() => {
                setValue(index);
              }}
              className={`job-btn ${value === index && `active-btn`}`}
            >
              {job.company}
            </button>
          ))}
        </div>

        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => (
            <div key={index} className="job-desc">
              <FaAngleDoubleRight className="job-icon" />
              <p>{duty}</p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
