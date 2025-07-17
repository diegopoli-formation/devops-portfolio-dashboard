import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "../styles/Home.module.css";

// Composant pour les cartes de statistiques
const StatCard: React.FC<{ value: string; label: string; delay: number }> = ({
  value,
  label,
  delay,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={styles.statCard}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: delay * 0.1,
          },
        },
        hidden: {
          opacity: 0,
          y: 20,
        },
      }}
    >
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </motion.div>
  );
};

const Home: React.FC = () => {
  // Animation pour la section héro
  const heroControls = useAnimation();
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Références pour les animations d'entrée
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (heroInView) {
      heroControls.start("visible");
    }
  }, [heroControls, heroInView]);

  return (
    <div className={styles.home}>
      {/* Section Héro */}
      <section className={styles.hero} ref={heroRef}>
        <div className="container">
          <motion.div
            className={styles.heroContent}
            initial="hidden"
            animate={heroControls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  staggerChildren: 0.2,
                  delayChildren: 0.3,
                },
              },
              hidden: {
                opacity: 0,
                y: 30,
              },
            }}
          >
            <motion.h1
              className={styles.heroTitle}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
            >
              Développeur DevOps &<br />
              <span className={styles.highlight}>Architecte Cloud</span>
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
            >
              Je conçois, développe et déploie des solutions cloud évolutives et
              sécurisées pour transformer vos idées en réalité technique.
            </motion.p>

            <motion.div
              className={styles.heroButtons}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
            >
              <Link to="/contact" className="btn btn-primary">
                Me contacter
              </Link>
              <Link to="/projects" className="btn btn-outline">
                Voir mes projets
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className={styles.heroBackground}>
          <div className={styles.heroOverlay}></div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <StatCard value="5+" label="Années d'expérience" delay={0} />
            <StatCard value="50+" label="Projets livrés" delay={1} />
            <StatCard value="100%" label="Clients satisfaits" delay={2} />
            <StatCard value="24/7" label="Support disponible" delay={3} />
          </div>
        </div>
      </section>

      {/* Section À propos (version courte) */}
      <section className={styles.aboutSection} ref={aboutRef}>
        <div className="container">
          <div className={styles.aboutContent}>
            <motion.div
              className={styles.aboutText}
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2>À propos de moi</h2>
              <p>
                Passionné par le DevOps et les technologies cloud, je mets mon
                expertise au service de vos projets pour vous offrir des
                solutions robustes, évolutives et sécurisées. Avec une approche
                centrée sur l'automatisation et l'amélioration continue, je vous
                accompagne dans la transformation de votre infrastructure et de
                vos processus de développement.
              </p>
              <Link to="/about" className={styles.aboutLink}>
                En savoir plus sur mon parcours <span>→</span>
              </Link>
            </motion.div>
            <motion.div
              className={styles.aboutSkills}
              ref={skillsRef}
              initial={{ opacity: 0, x: 50 }}
              animate={
                skillsInView
                  ? {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, delay: 0.2 },
                    }
                  : {}
              }
            >
              <h3>Expertise clé</h3>
              <ul className={styles.skillsList}>
                <li>Infrastructure as Code (Terraform, CloudFormation)</li>
                <li>CI/CD (GitHub Actions, GitLab CI, Jenkins)</li>
                <li>Conteneurisation & Orchestration (Docker, Kubernetes)</li>
                <li>Cloud Providers (AWS, Azure, GCP)</li>
                <li>Monitoring & Observabilité (Prometheus, Grafana, ELK)</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
