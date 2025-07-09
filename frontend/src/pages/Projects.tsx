import React from 'react';
import styles from '../styles/Projects.module.css';

const Projects: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Projects</h1>
      <ul>
        <li>CI/CD pipeline with GitHub Actions</li>
        <li>Dockerized Node.js app</li>
        <li>Kubernetes deployment demo</li>
      </ul>
    </div>
  );
};

export default Projects;
