import React from 'react';
import SingleProject from './SingleProject';
import { projectsData } from '../data/projects';

interface ProjectProps {
  onBackClick: () => void;
  projectName?: string;
}

const Project = ({ onBackClick, projectName = 'Playdago' }: ProjectProps) => {
  const projectData = projectsData[projectName] || projectsData['Playdago'];
  
  return (
    <SingleProject 
      projectData={projectData} 
      onBackClick={onBackClick} 
    />
  );
};

export default Project;
