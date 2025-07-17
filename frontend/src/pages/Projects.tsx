import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "../styles/Projects.module.css";

// Types
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  codeUrl: string;
  category: string;
};

// Données des projets
const projectsData: Project[] = [
  {
    id: 1,
    title: "CI/CD Pipeline avec GitHub Actions",
    description:
      "Mise en place d'un pipeline CI/CD automatisé pour le déploiement d'applications avec tests automatisés, linting et déploiement sur AWS.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["CI/CD", "GitHub Actions", "AWS", "Docker"],
    demoUrl: "#",
    codeUrl: "#",
    category: "DevOps",
  },
  {
    id: 2,
    title: "Application Node.js Conteneurisée",
    description:
      "Développement d'une application Node.js moderne avec Express et MongoDB, conteneurisée avec Docker et orchestrée avec Docker Compose.",
    image:
      "https://images.unsplash.com/photo-1581092162429-991ef0b6e1c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Node.js", "Docker", "MongoDB", "Express"],
    demoUrl: "#",
    codeUrl: "#",
    category: "Développement",
  },
  {
    id: 3,
    title: "Déploiement Kubernetes",
    description:
      "Configuration et déploiement d'une application microservices sur un cluster Kubernetes avec monitoring Prometheus/Grafana.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Kubernetes", "Helm", "Prometheus", "Grafana"],
    demoUrl: "#",
    codeUrl: "#",
    category: "Cloud",
  },
  {
    id: 4,
    title: "Infrastructure as Code avec Terraform",
    description:
      "Automatisation du déploiement d'infrastructure cloud sur AWS en utilisant Terraform pour une infrastructure reproductible et versionnée.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Terraform", "AWS", "IaC", "CI/CD"],
    demoUrl: "#",
    codeUrl: "#",
    category: "Cloud",
  },
  {
    id: 5,
    title: "Monitoring avec ELK Stack",
    description:
      "Mise en place d'une solution de logging et monitoring avec Elasticsearch, Logstash et Kibana pour une application distribuée.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["ELK", "Monitoring", "Logging", "DevOps"],
    demoUrl: "#",
    codeUrl: "#",
    category: "DevOps",
  },
  {
    id: 6,
    title: "API REST sécurisée",
    description:
      "Développement d'une API REST sécurisée avec authentification JWT, documentation Swagger et tests d'intégration.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Node.js", "JWT", "Swagger", "Jest"],
    demoUrl: "#",
    codeUrl: "#",
    category: "Développement",
  },
];

// Catégories uniques pour les filtres
const uniqueCategories = Array.from(
  new Set(projectsData.map((project) => project.category)),
);
const categories = ["Tous", ...uniqueCategories];

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Filtrage des projets
  useEffect(() => {
    setIsLoading(true);

    // Filtrer les projets de manière synchrone
    const filtered =
      activeFilter === "Tous"
        ? projectsData
        : projectsData.filter((project) => project.category === activeFilter);

    // Mettre à jour les projets filtrés
    setFilteredProjects(filtered);

    // Désactiver le chargement après un court délai pour éviter le clignotement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [activeFilter, projectsData]);

  // Animation au défilement
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.header} ref={ref}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mes Projets
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Découvrez une sélection de mes projets récents couvrant divers aspects
          du développement et des opérations DevOps.
        </motion.p>
      </div>

      <div className={styles.filters}>
        {categories.map((category, index) => (
          <motion.button
            key={category}
            className={`${styles.filterButton} ${activeFilter === category ? styles.active : ""}`}
            onClick={() => {
              setActiveFilter(category);
              setIsLoading(true);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            {category === "Tous" && (
              <span className={styles.filterIcon}>🔍</span>
            )}
            {category === "Développement" && (
              <span className={styles.filterIcon}>💻</span>
            )}
            {category === "DevOps" && (
              <span className={styles.filterIcon}>⚙️</span>
            )}
            {category === "Cloud" && (
              <span className={styles.filterIcon}>☁️</span>
            )}
            {category === "Infrastructure" && (
              <span className={styles.filterIcon}>🖥️</span>
            )}
            <span>{category}</span>
          </motion.button>
        ))}
      </div>

      {isLoading && filteredProjects.length === 0 ? (
        <div className={styles.projectsGrid}>
          {[1, 2, 3].map((item) => (
            <div key={`loading-${item}`} className={styles.loadingCard}>
              <div style={{ height: "200px", background: "#e0e0e0" }}></div>
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    height: "24px",
                    width: "80%",
                    background: "#e0e0e0",
                    marginBottom: "1rem",
                  }}
                ></div>
                <div
                  style={{
                    height: "16px",
                    width: "100%",
                    background: "#e0e0e0",
                    marginBottom: "0.5rem",
                  }}
                ></div>
                <div
                  style={{
                    height: "16px",
                    width: "90%",
                    background: "#e0e0e0",
                    marginBottom: "1.5rem",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "24px",
                      background: "#e0e0e0",
                      borderRadius: "12px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "70px",
                      height: "24px",
                      background: "#e0e0e0",
                      borderRadius: "12px",
                    }}
                  ></div>
                </div>
                <div
                  style={{ display: "flex", gap: "1rem", marginTop: "auto" }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "40px",
                      background: "#e0e0e0",
                      borderRadius: "6px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "100px",
                      height: "40px",
                      background: "#e0e0e0",
                      borderRadius: "6px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className={styles.projectsGrid}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className={styles.projectCard}
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className={styles.projectImage}
                loading="lazy"
              />
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <div className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  <a
                    href={project.demoUrl}
                    className={`${styles.linkButton} ${styles.primaryButton}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.buttonIcon}>🔗</span> Voir le projet
                  </a>
                  <a
                    href={project.codeUrl}
                    className={`${styles.linkButton} ${styles.secondaryButton}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.buttonIcon}>🐙</span> Code source
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
