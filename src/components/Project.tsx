import SingleProjectNew from './SingleProjectNew';
import { projectsDataNew } from '../data/projectsNew';

interface ProjectProps {
  onBackClick: () => void;
  projectName?: string;
  coverImage?: string | null;
  projectCategory?: string | null;
  onSwipeYChange?: (y: number) => void;
}

const Project = ({ onBackClick, projectName = 'Playdago', coverImage = null, projectCategory = null, onSwipeYChange }: ProjectProps) => {
  const projectData = projectsDataNew[projectName] || projectsDataNew['Playdago'];
  
  return (
    <SingleProjectNew 
      projectData={projectData} 
      onBackClick={onBackClick}
      coverImage={coverImage}
      projectCategory={projectCategory}
      onSwipeYChange={onSwipeYChange}
    />
  );
};

export default Project;
