import React from 'react';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to DevLab</h1>
      <p>Your personal DevOps journey starts here.</p>
    </div>
  );
};

export default Home;
