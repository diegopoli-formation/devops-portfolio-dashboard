import React from 'react';
import './Projects.module.css';

const Projects = () => {
    const devOpsTools = [
        { name: 'Docker', description: 'Containerization platform for building and running applications.' },
        { name: 'Kubernetes', description: 'Orchestration tool for managing containerized applications.' },
        { name: 'Jenkins', description: 'Automation server for CI/CD pipelines.' },
        { name: 'GitHub Actions', description: 'CI/CD service for automating workflows directly from GitHub.' },
        { name: 'Terraform', description: 'Infrastructure as code tool for building, changing, and versioning infrastructure safely and efficiently.' },
    ];

    return (
        <div>
            <h1>Projects</h1>
            <h2>DevOps Tools Used</h2>
            <ul>
                {devOpsTools.map((tool, index) => (
                    <li key={index}>
                        <strong>{tool.name}</strong>: {tool.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;