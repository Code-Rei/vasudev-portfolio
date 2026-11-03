import React from 'react';

export default function ExperienceSection({ experience }) {
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--card-x', `${x}px`);
    card.style.setProperty('--card-y', `${y}px`);
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--card-x', `-500px`);
    card.style.setProperty('--card-y', `-500px`);
  };

  return (
    <div className="timeline-wrapper">
      <div className="timeline-container">
        <div className="timeline-line" />

        {experience.map((job, index) => (
          <div key={job.role} className="timeline-item">
            {/* Milestone Beacon */}
            <div className="timeline-dot" />

            {/* Experience Card */}
            <div
              className="timeline-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="exp-inner-content">
                <div className="card-top-row">
                  <div className="badge-row">
                    <span className="badge-type">{job.badge}</span>
                    <span className="badge-duration">{job.duration}</span>
                  </div>
                  <span className="sys-badge-mono">TRACK // #EXP-0{index + 1}</span>
                </div>

                {/* Role Title */}
                <h3 className="role-name">{job.role}</h3>

                <div className="company-name">
                  <strong>{job.company}</strong> — {job.location}
                </div>

                {/* Highlights */}
                {job.highlights && (
                  <div className="resp-section">
                    <div className="resp-header">CORE HIGHLIGHTS & OPERATIONAL ACHIEVEMENTS</div>
                    <ul className="resp-list">
                      {job.highlights.map((hl, hIdx) => (
                        <li key={hIdx}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
