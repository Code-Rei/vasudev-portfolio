import React, { useState } from 'react';

// Technical System IDs for diagnostic credibility
const SYSTEM_METADATA = {
  fieldmate: { sysId: '1', status: 'PRODUCTION', latency: '<120ms' },
  'kamal-connect': { sysId: '2', status: 'PRODUCTION', latency: '40% SPEEDUP' },
  'gst-captcha': { sysId: '3', status: 'DOCKERIZED', latency: '<250ms' },
  'route-optimizer': { sysId: '4', status: 'ALGORITHMIC', latency: 'TSP SOLVED' },
  'kamal-skillup': { sysId: '5', status: 'PRODUCTION', latency: '75% FASTER' },
  'autonomous-bots': { sysId: '6', status: 'AUTOMATED', latency: '<350ms' },
  'kamal-analytics': { sysId: '7', status: 'PRODUCTION', latency: 'DAILY MIS' },
};

export default function ProjectsSection({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Enterprise FinTech', 'AI Microservice', 'Spatial Logistics'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
    <div className="projects-wrapper">
      {/* Category Filter Tabs */}
      <div className="filter-tab-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="project-grid">
        {filteredProjects.map((proj, idx) => {
          const meta = SYSTEM_METADATA[proj.id] || {
            sysId: `SYS // #PROJ-${idx + 10}`,
            status: 'ONLINE',
            latency: '<200ms',
          };

          return (
            <div
              key={proj.id}
              className="project-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="proj-inner-content">
                {/* Technical Diagnostic Header */}
                <div className="card-meta-row">
                  <div className="sys-id-tag">
                    <span className="pulse-dot-sm" />
                    <span className="sys-code">{meta.sysId}</span>
                  </div>
                  <span className="meta-status-pill">{meta.status}</span>
                </div>

                <div className="card-type-row">
                  <span className="cat-pill">{proj.type}</span>
                  {proj.badge && <span className="badge-pill">{proj.badge}</span>}
                </div>

                {/* Title */}
                <h3 className="proj-title">{proj.name}</h3>

                {/* Summary */}
                <p className="proj-summary">{proj.summary}</p>

                {/* Role Pill */}
                <div className="role-tag-box">
                  <span className="role-prefix">ROLE:</span>
                  <span className="role-title">{proj.role}</span>
                </div>

                {/* Tech Stack Tags */}
                <div className="stack-wrap">
                  {proj.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="highlights-box">
                  <div className="highlights-title">KEY IMPACT & ARCHITECTURE</div>
                  <ul className="highlights-list">
                    {proj.highlights.map((hl, hIdx) => (
                      <li key={hIdx}>{hl}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
