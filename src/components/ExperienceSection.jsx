import React from 'react';

export default function ExperienceSection({ experience }) {
  return (
    <div className="timeline-wrapper">
      {experience.map((job, index) => (
        <div key={index} className="timeline-card">
          {/* Timeline Connector */}
          <div className="timeline-indicator">
            <div className="timeline-dot" />
            {index !== experience.length - 1 && <div className="timeline-line" />}
          </div>

          {/* Experience Body */}
          <div className="exp-box">
            <div className="exp-header">
              <div>
                <div className="badge-row">
                  <span className="badge-type">{job.badge}</span>
                  <span className="badge-duration">{job.duration}</span>
                </div>
                <h3 className="role-name">{job.role}</h3>
                <div className="company-name">
                  <strong>{job.company}</strong> — {job.location}
                </div>
              </div>
            </div>

            <ul className="exp-list">
              {job.highlights.map((hl, hIdx) => (
                <li key={hIdx}>{hl}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
