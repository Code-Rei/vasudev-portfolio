import React from 'react';
import { RiMapPinLine } from '@remixicon/react';

export default function EducationSection({ education }) {
  return (
    <div className="education-grid">
      {education.map((edu, index) => (
        <div key={index} className="edu-card">
          <div className="edu-top-row">
            <span className="edu-badge">{edu.badge}</span>
            <span className="edu-year">{edu.year}</span>
          </div>
          <h3 className="edu-degree">{edu.degree}</h3>
          <div className="edu-inst">{edu.institution}</div>
          {edu.location && (
            <div className="edu-loc">
              <RiMapPinLine size={14} className="inline-icon mr-1" />
              <span>{edu.location}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
