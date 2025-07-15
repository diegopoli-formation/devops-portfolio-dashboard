import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// Importer les icônes individuellement pour éviter les problèmes de typage
import { FaCode } from '@react-icons/all-files/fa/FaCode';
import { FaServer } from '@react-icons/all-files/fa/FaServer';
import { FaCloud } from '@react-icons/all-files/fa/FaCloud';
import { FaTools } from '@react-icons/all-files/fa/FaTools';
import { FaDocker } from '@react-icons/all-files/fa/FaDocker';
import { FaAws } from '@react-icons/all-files/fa/FaAws';
import { FaJenkins } from '@react-icons/all-files/fa/FaJenkins';
import { SiKubernetes } from '@react-icons/all-files/si/SiKubernetes';
import { SiTerraform } from '@react-icons/all-files/si/SiTerraform';
import { SiPrometheus } from '@react-icons/all-files/si/SiPrometheus';
import { SiGrafana } from '@react-icons/all-files/si/SiGrafana';
import { SiGooglecloud } from '@react-icons/all-files/si/SiGooglecloud';
import styles from '../styles/About.module.css';

const About: React.FC = () => {
  // Animations avec useInView
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (aboutInView) {
      controls.start('visible');
    }
  }, [controls, aboutInView]);

  // Données des compétences
  const skills = [
    {
      category: 'Développement',
      icon: <FaCode className={styles.skillIcon} />,
      items: [
        { name: 'Python', level: 90 },
        { name: 'JavaScript/TypeScript', level: 85 },
        { name: 'Bash/Shell', level: 80 },
        { name: 'Go', level: 70 },
        { name: 'Java', level: 65 },
      ],
    },
    {
      category: 'Infrastructure',
      icon: <FaServer className={styles.skillIcon} />,
      items: [
        { name: 'Linux/Unix', level: 90 },
        { name: 'Réseaux', level: 85 },
        { name: 'Sécurité', level: 80 },
        { name: 'Virtualisation', level: 75 },
      ],
    },
    {
      category: 'Cloud & Conteneurs',
      icon: <FaCloud className={styles.skillIcon} />,
      items: [
        { name: 'AWS', level: 85 },
        { name: 'Docker', level: 90 },
        { name: 'Kubernetes', level: 85 },
        { name: 'Azure', level: 75 },
        { name: 'GCP', level: 70 },
      ],
    },
    {
      category: 'DevOps',
      icon: <FaTools className={styles.skillIcon} />,
      items: [
        { name: 'CI/CD', level: 90 },
        { name: 'Terraform', level: 85 },
        { name: 'Ansible', level: 80 },
        { name: 'Prometheus/Grafana', level: 85 },
        { name: 'ELK Stack', level: 75 },
      ],
    },
  ];

  // Données du parcours professionnel
  const experiences = [
    {
      id: 1,
      date: '2021 - Présent',
      title: 'DevOps Engineer Senior',
      company: 'TechInnovate Solutions',
      description: 'Responsable de la conception et de la mise en œuvre de pipelines CI/CD, de l\'automatisation de l\'infrastructure et de l\'optimisation des performances des applications cloud.',
    },
    {
      id: 2,
      date: '2019 - 2021',
      title: 'Ingénieur DevOps',
      company: 'CloudScale Technologies',
      description: 'Migration des infrastructures sur site vers le cloud, mise en place de conteneurs et d\'orchestrateurs, et automatisation des déploiements.',
    },
    {
      id: 3,
      date: '2017 - 2019',
      title: 'Développeur Full Stack',
      company: 'WebCraft Studios',
      description: 'Développement d\'applications web et participation à la mise en place des premières pratiques DevOps dans l\'entreprise.',
    },
    {
      id: 4,
      date: '2015 - 2017',
      title: 'Stagiaire en Développement',
      company: 'Digital Solutions Inc.',
      description: 'Participation au développement d\'applications et apprentissage des bonnes pratiques de développement et de déploiement.',
    },
  ];

  return (
    <div className={styles.about}>
      {/* Section Héro */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            À propos de moi
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Développeur DevOps passionné avec plus de 5 ans d'expérience dans la conception et la mise en œuvre d'infrastructures cloud évolutives et sécurisées.
          </motion.p>
        </div>
      </section>

      {/* Section À propos */}
      <section className={styles.aboutSection} ref={aboutRef}>
        <h2 className={styles.sectionTitle}>Qui suis-je ?</h2>
        <div className={styles.aboutContent}>
          <motion.div 
            className={styles.aboutText}
            initial={{ opacity: 0, x: -50 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p>
              Passionné par les technologies cloud et l'automatisation, je me suis spécialisé dans le DevOps pour aider les entreprises à délivrer des logiciels plus rapidement et de manière plus fiable.
            </p>
            <p>
              Avec une solide expérience en développement et en administration système, je mets à profit mes compétences pour concevoir et mettre en œuvre des solutions d'infrastructure modernes, évolutives et sécurisées.
            </p>
            <p>
              Mon approche se concentre sur l'automatisation, la qualité du code et l'amélioration continue pour optimiser les processus de développement et de déploiement.
            </p>
          </motion.div>
          
          <motion.div 
            className={styles.aboutSkills}
            initial={{ opacity: 0, x: 50 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Pourquoi travailler avec moi ?</h3>
            <ul className={styles.skillsList}>
              <li>Expérience éprouvée avec les principales plateformes cloud (AWS, Azure, GCP)</li>
              <li>Expertise en conteneurisation et orchestration (Docker, Kubernetes)</li>
              <li>Maîtrise des outils d'infrastructure as code (Terraform, CloudFormation)</li>
              <li>Mise en place de pipelines CI/CD performants</li>
              <li>Approche axée sur la sécurité et les bonnes pratiques</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Section Compétences */}
      <section className={styles.skillsSection} ref={skillsRef}>
        <h2 className={styles.sectionTitle}>Mes Compétences</h2>
        <div className={styles.skillsGrid}>
          {skills.map((category, index) => (
            <motion.div 
              key={category.category}
              className={styles.skillCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className={styles.skillTitle}>
                <span className={styles.iconWrapper}>
                  {category.icon}
                </span>
                {category.category}
              </h3>
              <ul className={styles.skillList}>
                {category.items.map((skill) => (
                  <li key={skill.name} className={styles.skillItem}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <div className={styles.skillLevel}>
                      <div 
                        className={styles.skillLevelBar} 
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Parcours */}
      <section className={styles.timelineSection} ref={timelineRef}>
        <h2 className={styles.sectionTitle}>Mon Parcours</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.timelineItemLeft : styles.timelineItemRight}`}
              initial={{ opacity: 0, y: 30 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className={styles.timelineContent}>
                <span className={styles.timelineDate}>{exp.date}</span>
                <h3 className={styles.timelineTitle}>{exp.title}</h3>
                <span className={styles.timelineCompany}>{exp.company}</span>
                <p className={styles.timelineDescription}>{exp.description}</p>
              </div>
              <div className={styles.timelineDot}></div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
