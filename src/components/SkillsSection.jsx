import React from 'react';

export default function SkillsSection({ categories }) {
  return (
    <div className="skills-categories-grid">
      {categories.map((cat) => (
        <div key={cat.category} className="skill-category-card">
          <div className="cat-header">
            <span className="cat-accent-dot" />
            <h3 className="cat-title">{cat.category}</h3>
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
      ))}
    </div>
  );
}
