import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Import des composants
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";

// Import des styles
import "./styles/transitions.css";
import "./styles/global.css";

// Composant pour gérer les animations de transition entre les pages
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  // Faire défiler vers le haut lors du changement de route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
        unmountOnExit
      >
        <div className="page-content">
          <Switch location={location}>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/projects" component={Projects} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/contact" component={Contact} />
            {/* Ajoutez d'autres routes ici au besoin */}
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
};

export default App;
