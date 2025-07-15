-- Insert admin user (password: admin123)
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@example.com', '$2a$10$XFDW054BvVp0t26AQo1eBe5UG6A2oQ9HbtOsnO8XgWqR3s6ZxYQ1K', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, content, image_url, project_url, github_url, tags, is_featured, status, start_date, end_date, "order") VALUES
('CI/CD Pipeline with GitHub Actions', 'Automated build and deployment pipeline for a web application', 'This project implements a complete CI/CD pipeline using GitHub Actions. It includes automated testing, building Docker images, and deploying to a staging environment. The pipeline runs on every push to the main branch and includes security scanning and code quality checks.', 'https://via.placeholder.com/800x400?text=CI/CD+Pipeline', 'https://example.com/cicd-pipeline', 'https://github.com/example/cicd-pipeline', '{"CI/CD", "GitHub Actions", "Docker", "DevOps"}', true, 'completed', '2023-01-15', '2023-03-20', 1),

('Kubernetes Cluster on AWS EKS', 'Managed Kubernetes cluster with auto-scaling and monitoring', 'Deployed a production-grade Kubernetes cluster on AWS EKS with Terraform. The setup includes auto-scaling node groups, cluster autoscaler, Prometheus for monitoring, and EFK stack for logging. The infrastructure is fully automated using Terraform and follows GitOps practices with ArgoCD.', 'https://via.placeholder.com/800x400?text=Kubernetes+Cluster', 'https://example.com/kubernetes-cluster', 'https://github.com/example/kubernetes-setup', '{"Kubernetes", "AWS", "Terraform", "DevOps"}', true, 'completed', '2023-02-10', '2023-04-05', 2),

('Infrastructure as Code with Terraform', 'Modular and reusable Terraform modules for cloud infrastructure', 'Created a library of reusable Terraform modules for deploying cloud infrastructure across multiple providers (AWS, Azure, GCP). The modules follow best practices for security, scalability, and cost optimization. Includes documentation and examples for each module.', 'https://via.placeholder.com/800x400?text=Terraform+Modules', 'https://example.com/terraform-modules', 'https://github.com/example/terraform-modules', '{"Terraform", "Infrastructure as Code", "Cloud", "Automation"}', true, 'in-progress', '2023-03-01', NULL, 3),

('Monitoring Stack with Prometheus and Grafana', 'Centralized monitoring solution for microservices', 'Implemented a comprehensive monitoring solution using Prometheus for metrics collection and Grafana for visualization. The setup includes custom dashboards for different services, alerting rules, and integration with Slack for notifications. The solution is containerized and can be easily deployed to any environment.', 'https://via.placeholder.com/800x400?text=Monitoring+Stack', 'https://example.com/monitoring-stack', 'https://github.com/example/monitoring-stack', '{"Monitoring", "Prometheus", "Grafana", "DevOps"}', false, 'completed', '2023-01-20', '2023-02-28', 4),

('Serverless API with AWS Lambda', 'RESTful API built with serverless architecture', 'Developed a scalable serverless API using AWS Lambda, API Gateway, and DynamoDB. The project includes infrastructure as code with AWS CDK, automated testing, and continuous deployment. The architecture is designed for high availability and low operational overhead.', 'https://via.placeholder.com/800x400?text=Serverless+API', 'https://example.com/serverless-api', 'https://github.com/example/serverless-api', '{"Serverless", "AWS", "Lambda", "API"}', false, 'completed', '2023-02-15', '2023-03-10', 5)
ON CONFLICT (title) DO NOTHING;

-- Insert sample skills
INSERT INTO skills (name, category, proficiency, icon, color, is_featured, "order") VALUES
-- Programming Languages
('JavaScript', 'programming', 9, 'fab fa-js', '#F7DF1E', true, 1),
('Python', 'programming', 8, 'fab fa-python', '#3776AB', true, 2),
('TypeScript', 'programming', 8, 'fas fa-code', '#3178C6', true, 3),
('Go', 'programming', 7, 'fab fa-golang', '#00ADD8', false, 4),
('Bash', 'programming', 8, 'fas fa-terminal', '#4EAA25', false, 5),

-- DevOps Tools
('Docker', 'devops', 9, 'fab fa-docker', '#2496ED', true, 6),
('Kubernetes', 'devops', 8, 'fas fa-dharmachakra', '#326CE5', true, 7),
('Terraform', 'devops', 8, 'fas fa-code-branch', '#7B42BC', true, 8),
('Ansible', 'devops', 7, 'fas fa-server', '#EE0000', false, 9),
('Jenkins', 'devops', 7, 'fab fa-jenkins', '#D24939', false, 10),

-- Cloud Platforms
('AWS', 'cloud', 8, 'fab fa-aws', '#FF9900', true, 11),
('Google Cloud', 'cloud', 7, 'fab fa-google', '#4285F4', false, 12),
('Azure', 'cloud', 6, 'fab fa-microsoft', '#0089D6', false, 13),

-- Methodologies
('CI/CD', 'methodologies', 9, 'fas fa-sync-alt', '#5E6C84', true, 14),
('GitOps', 'methodologies', 8, 'fab fa-git-alt', '#F05032', true, 15),
('Agile', 'methodologies', 8, 'fas fa-tasks', '#00A67E', false, 16),

-- Tools
('Git', 'tools', 9, 'fab fa-git-alt', '#F05032', true, 17),
('Linux', 'tools', 8, 'fab fa-linux', '#FCC624', true, 18),
('Nginx', 'tools', 8, 'fas fa-server', '#009639', false, 19),
('Prometheus', 'tools', 7, 'fas fa-chart-line', '#E6522C', false, 20),
('Grafana', 'tools', 7, 'fas fa-chart-pie', '#F46800', false, 21)
ON CONFLICT (name) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, tags, status, published_at, meta_title, meta_description, read_time) VALUES
('Getting Started with Infrastructure as Code', 'getting-started-with-iac', 'Learn the basics of Infrastructure as Code and how it can transform your DevOps workflow.', '# Introduction to Infrastructure as Code

Infrastructure as Code (IaC) is a key practice in modern DevOps that allows you to manage and provision computing infrastructure through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.

## Why Use IaC?

- **Consistency**: Eliminate manual configuration and reduce human error
- **Version Control**: Track changes and maintain history of your infrastructure
- **Reusability**: Share and reuse configurations across projects
- **Documentation**: Your infrastructure is self-documenting

## Popular IaC Tools

1. **Terraform**
2. **AWS CloudFormation**
3. **Ansible**
4. **Pulumi**

## Getting Started

To get started with Terraform, you''ll need to:

1. Install Terraform on your machine
2. Create a new directory for your configuration
3. Write your first configuration file (main.tf)
4. Initialize the working directory
5. Apply the configuration

## Next Steps

In future posts, we''ll dive deeper into advanced Terraform concepts and best practices for managing infrastructure at scale.', 'https://via.placeholder.com/1200x630?text=Infrastructure+as+Code', '{"DevOps", "IaC", "Terraform", "Automation"}', 'published', '2023-05-15 10:00:00+00', 'Getting Started with Infrastructure as Code', 'Learn the basics of Infrastructure as Code and how it can transform your DevOps workflow.', 8),

('Building CI/CD Pipelines with GitHub Actions', 'github-actions-cicd', 'Learn how to set up automated CI/CD pipelines using GitHub Actions', 'Getting Started with GitHub Actions

GitHub Actions makes it easy to automate your build, test, and deployment pipeline. You can create workflows that build and test every pull request to your repository, or deploy merged pull requests to production.

Key Features:
- Automated testing on every push or pull request
- Built-in CI/CD capabilities
- Integration with GitHub ecosystem
- Support for multiple programming languages

Best Practices:
- Keep your workflows DRY
- Use actions from the GitHub Marketplace
- Set up branch protection rules
- Monitor your workflows with status badges', 'https://via.placeholder.com/1200x630?text=GitHub+Actions', '{"CI/CD", "GitHub Actions", "DevOps", "Automation"}', 'published', '2023-05-20 14:30:00+00', 'Building CI/CD Pipelines with GitHub Actions', 'A comprehensive guide to setting up automated CI/CD pipelines using GitHub Actions.', 10),

('Kubernetes Security Best Practices', 'kubernetes-security-best-practices', 'Essential security practices for running Kubernetes in production.', 'Kubernetes Security Best Practices

Running Kubernetes in production requires careful attention to security. Here are some best practices to secure your Kubernetes clusters.

Cluster Security:
- Enable Role-Based Access Control (RBAC)
- Use Network Policies for traffic control
- Implement pod security policies

Container Security:
- Use minimal base images
- Run containers as non-root
- Scan for vulnerabilities regularly

Secrets Management:
- Use Kubernetes Secrets
- Consider external secret management
- Rotate credentials regularly

Monitoring and Auditing:
- Enable audit logging
- Monitor for suspicious activity
- Keep components updated', 'https://via.placeholder.com/1200x630?text=Kubernetes+Security', '{"Kubernetes", "Security", "DevOps", "Containers"}', 'published', '2023-06-15 09:00:00+00', 'Kubernetes Security Best Practices', 'Essential security practices for running Kubernetes in production.', 12)
ON CONFLICT (slug) DO NOTHING;
