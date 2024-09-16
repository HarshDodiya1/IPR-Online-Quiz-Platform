// CircularProgressRing.jsx
import React from 'react';

const CircularProgressRing = ({ score, total, radius = 50, stroke = 10 }) => {
  const progress = (score / total) * 100;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      className="relative"
    >
      <circle
        stroke="red"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="transition-transform duration-1000 ease-in-out"
      />
      <circle
        stroke="green"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-transform duration-1000 ease-in-out"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="text-xl font-bold text-gray-800"
      >
        {score} / {total}
      </text>
    </svg>
  );
};

export default CircularProgressRing;
