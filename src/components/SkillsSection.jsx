import React from 'react';

export default function SkillsSection({ categories }) {
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
    <div className="skills-matrix-wrapper">
      <div className="skills-matrix-grid">
        {categories.map((cat) => (
          <div
            key={cat.category}
            className="skill-category-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="skill-inner-content">
              <div className="cat-header">
                <div className="cat-title-wrap">
                  <span className="cat-accent-dot" />
                  <h3 className="cat-title">{cat.category}</h3>
                </div>
                <span className="cat-count">{cat.skills.length} Skills</span>
              </div>

              <div className="skills-tag-wrap">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
