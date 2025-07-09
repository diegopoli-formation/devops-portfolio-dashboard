import React from 'react';
import styles from '../styles/About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>About Me</h1>
      <p>I’m building a DevOps portfolio to showcase my skills.</p>
    </div>
  );
};

export default About;
