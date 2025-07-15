import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// Importer les icônes individuellement pour éviter les problèmes de typage
import { FiUser } from '@react-icons/all-files/fi/FiUser';
import { FiMail } from '@react-icons/all-files/fi/FiMail';
import { FiMessageSquare } from '@react-icons/all-files/fi/FiMessageSquare';
import { FiSend } from '@react-icons/all-files/fi/FiSend';
import { FiMapPin } from '@react-icons/all-files/fi/FiMapPin';
import { FiPhone } from '@react-icons/all-files/fi/FiPhone';
import { FiAlertCircle } from '@react-icons/all-files/fi/FiAlertCircle';
import { FiCheckCircle } from '@react-icons/all-files/fi/FiCheckCircle';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import styles from '../styles/Contact.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: 'error',
        message: 'Veuillez remplir tous les champs obligatoires.'
      });
      return;
    }
    
    // Validation d'email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: 'error',
        message: 'Veuillez entrer une adresse email valide.'
      });
      return;
    }
    
    setFormStatus({ type: 'loading', message: 'Envoi en cours...' });
    
    try {
      // Ici, vous pouvez ajouter l'appel à votre API ou service d'email
      // Par exemple, avec fetch ou axios
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulation d'un délai pour le chargement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simuler une réponse réussie
      // if (response.ok) {
      setFormStatus({
        type: 'success',
        message: 'Votre message a été envoyé avec succès ! Je vous répondrai dès que possible.'
      });
      
      // Réinitialiser le formulaire après un envoi réussi
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      // } else {
      //   throw new Error('Erreur lors de l\'envoi du message');
      // }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setFormStatus({
        type: 'error',
        message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.'
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className={styles.contact} id="contact">
      {/* Décoration */}
      <div className={`${styles.decoration} ${styles.circle1}`}></div>
      <div className={`${styles.decoration} ${styles.circle2}`}></div>
      
      {/* En-tête */}
      <div className={styles.header} ref={ref}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Contactez-moi
        </motion.h2>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Vous avez une question ou souhaitez discuter d'un projet ? N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.
        </motion.p>
      </div>

      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Section d'informations de contact */}
        <motion.div className={styles.contactInfo} variants={itemVariants}>
          <h3 className={styles.contactInfoTitle}>Informations de contact</h3>
          <p className={styles.contactInfoText}>
            Je suis disponible pour discuter de nouveaux projets, opportunités de collaboration ou simplement échanger sur des sujets liés au développement et aux opérations DevOps.
          </p>
          
          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <FiMail className={styles.contactIcon} />
              <div>
                <span className={styles.contactLabel}>Email</span>
                <a href="mailto:contact@example.com" className={styles.contactValue}>
                  contact@example.com
                </a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <FiPhone className={styles.contactIcon} />
              <div>
                <span className={styles.contactLabel}>Téléphone</span>
                <a href="tel:+33612345678" className={styles.contactValue}>
                  +33 6 12 34 56 78
                </a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <FiMapPin className={styles.contactIcon} />
              <div>
                <span className={styles.contactLabel}>Localisation</span>
                <span className={styles.contactValue}>Paris, France</span>
              </div>
            </div>
          </div>
          
          <div className={styles.socialLinks}>
            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaGithub className={styles.socialIcon} />
              <span>GitHub</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaLinkedin className={styles.socialIcon} />
              <span>LinkedIn</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaTwitter className={styles.socialIcon} />
              <span>Twitter</span>
            </a>
          </div>
        </motion.div>
        
        {/* Formulaire de contact */}
        <motion.form 
          onSubmit={handleSubmit} 
          className={styles.contactForm}
          variants={itemVariants}
        >
          <h3 className={styles.formTitle}>Envoyez-moi un message</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">
              <FiUser className={styles.inputIcon} />
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">
              <FiMail className={styles.inputIcon} />
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="subject">
              <FiMessageSquare className={styles.inputIcon} />
              Sujet
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">
              <FiMessageSquare className={styles.inputIcon} />
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={formStatus.type === 'loading'}
          >
            {formStatus.type === 'loading' ? (
              'Envoi en cours...'
            ) : (
              <>
                <FiSend className={styles.buttonIcon} />
                Envoyer le message
              </>
            )}
          </button>
          
          {formStatus.message && (
            <div className={`${styles.formMessage} ${styles[formStatus.type]}`}>
              {formStatus.message}
            </div>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;
