import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>À propos</h1>
            <p className={styles.subtitle}>Qui suis-je ?</p>
            <div className={styles.card}>Contenu ici</div>
        </div>
    );
};

export default About;