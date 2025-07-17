import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

// Import des icônes individuellement pour éviter les problèmes de typage
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { FiCode } from "@react-icons/all-files/fi/FiCode";
import { FiMail } from "@react-icons/all-files/fi/FiMail";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";

// Type pour les icônes
interface IconProps {
  className?: string;
}

// Type pour les éléments de navigation
interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  exact?: boolean;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Gestion du défilement pour l'effet de rétrécissement
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Écouter les changements de taille d'écran pour fermer le menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Désactiver le défilement du corps lorsque le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems: NavItem[] = [
    {
      to: "/",
      label: "Accueil",
      icon: <FiHome className={styles.navIcon} />,
      exact: true,
    },
    {
      to: "/about",
      label: "À propos",
      icon: <FiUser className={styles.navIcon} />,
    },
    {
      to: "/projects",
      label: "Projets",
      icon: <FiCode className={styles.navIcon} />,
    },
    {
      to: "/contact",
      label: "Contact",
      icon: <FiMail className={styles.navIcon} />,
    },
  ];

  const socialLinks = [
    { url: "https://github.com", icon: <FaGithub />, label: "GitHub" },
    { url: "https://linkedin.com", icon: <FaLinkedin />, label: "LinkedIn" },
    { url: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`${styles.container} container`}>
          <NavLink to="/" className={styles.logo}>
            <span>Dev</span>Portfolio
          </NavLink>

          <button
            className={styles.menuButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="main-navigation"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>

          <nav
            id="main-navigation"
            className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}
            aria-label="Navigation principale"
          >
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.to} className={styles.navItem}>
                  <NavLink
                    to={item.to}
                    activeClassName={styles.active}
                    className={styles.navLink}
                    exact={item.exact}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <FiChevronRight className={styles.chevron} />
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className={styles.socialLinks} aria-label="Réseaux sociaux">
              {socialLinks.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Overlay pour fermer le menu en cliquant à côté */}
      {isOpen && (
        <div
          className={`${styles.overlay} ${styles.overlayVisible}`}
          onClick={() => setIsOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          aria-label="Fermer le menu"
        />
      )}
    </>
  );
};

export default Navbar;
