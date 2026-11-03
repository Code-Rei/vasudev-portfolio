import React, { useState } from 'react';

export default function ProjectsSection({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Enterprise FinTech', 'AI Microservice', 'Spatial Logistics', 'Client System'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="projects-wrapper">
      {/* Category Filter Segmented Tabs */}
      <div className="filter-bar">
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
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="project-card">
            {/* Card Header */}
            <div className="card-meta-row">
              <span className="cat-pill">{proj.type}</span>
              {proj.badge && <span className="badge-pill">{proj.badge}</span>}
            </div>

            <h3 className="proj-title">{proj.name}</h3>
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
        ))}
      </div>
    </div>
  );
}
