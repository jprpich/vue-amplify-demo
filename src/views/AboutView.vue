<template>
  <div class="about">
    <div class="about-container">
      <h1>About This Project</h1>

      <div class="intro-section">
        <p class="lead">
          This is a <strong>demonstration project</strong> showcasing the power of AWS Amplify Gen 2
          with Vue 3. It's designed to illustrate modern serverless architecture and cloud-native
          development practices.
        </p>
      </div>

      <div class="tech-stack">
        <h2>🏗️ Architecture Overview</h2>

        <div class="stack-item">
          <h3>Frontend</h3>
          <ul>
            <li><strong>Vue 3</strong> - Progressive JavaScript framework with Composition API</li>
            <li>
              <strong>Vite</strong> - Next generation frontend tooling for blazing fast development
            </li>
            <li>
              <strong>Vue Router</strong> - Official routing library for single-page applications
            </li>
          </ul>
        </div>

        <div class="stack-item">
          <h3>Backend (AWS Services)</h3>
          <ul>
            <li>
              <strong>AWS Amplify Gen 2</strong> - Full-stack development platform with code-first
              TypeScript definitions
            </li>
            <li>
              <strong>AWS Lambda</strong> - Serverless compute functions that run your backend code
              without managing servers
            </li>
            <li>
              <strong>Amazon API Gateway</strong> - REST API endpoints that trigger Lambda functions
              with automatic scaling
            </li>
            <li>
              <strong>Amazon DynamoDB</strong> - Fully managed NoSQL database for storing contact
              form submissions
            </li>
            <li>
              <strong>Amazon S3</strong> - Object storage for hosting static website assets (HTML,
              CSS, JavaScript)
            </li>
            <li>
              <strong>Amazon CloudFront</strong> - Global CDN that delivers content from edge
              locations for low latency
            </li>
            <li>
              <strong>AWS IAM</strong> - Automated identity and access management, configured by
              Amplify
            </li>
          </ul>
        </div>

        <div class="stack-item">
          <h3>Key Features</h3>
          <ul>
            <li>
              🚀 <strong>Serverless Architecture</strong> - No servers to manage, pay only for what
              you use
            </li>
            <li>
              ⚡ <strong>Automatic Scaling</strong> - Handles traffic spikes without configuration
            </li>
            <li>
              🌍 <strong>Global CDN</strong> - CloudFront distributes content worldwide for fast
              loading
            </li>
            <li>
              🔐 <strong>Secure by Default</strong> - IAM roles and CORS configured automatically
            </li>
            <li>📦 <strong>Infrastructure as Code</strong> - Entire stack defined in TypeScript</li>
            <li>🔄 <strong>CI/CD Ready</strong> - Deploy with git push via Amplify Hosting</li>
          </ul>
        </div>

        <div class="stack-item workflow">
          <h3>How It Works</h3>
          <ol>
            <li>
              <strong>S3 + CloudFront:</strong> Vue app is built and deployed to S3, distributed
              globally via CloudFront CDN
            </li>
            <li>
              <strong>API Gateway:</strong> Routes HTTP requests to appropriate Lambda functions
            </li>
            <li>
              <strong>Lambda Functions:</strong> Execute serverless code to handle GET/POST requests
            </li>
            <li><strong>DynamoDB:</strong> Stores data with automatic scaling and backup</li>
            <li>
              <strong>Amplify:</strong> Orchestrates all services, manages deployments, and handles
              configuration
            </li>
          </ol>
        </div>
      </div>

      <div class="demo-note">
        <h2>📋 Demo Purpose</h2>
        <p>
          This project demonstrates how quickly you can build and deploy a production-ready
          full-stack application using AWS services. It's perfect for learning cloud architecture,
          testing Amplify features, or using as a starter template for your own projects.
        </p>
        <p>
          <strong>Try it out:</strong> Visit the <strong>API GET</strong> page to see Lambda in
          action, or submit the <strong>API POST</strong> form to write data to DynamoDB!
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  padding: 2rem 1rem;
  background: var(--color-background);
}

.about-container {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
  text-align: center;
}

h2 {
  font-size: 1.8rem;
  color: var(--color-heading);
  margin: 2.5rem 0 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #00dc82;
}

h3 {
  font-size: 1.3rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.intro-section {
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border-left: 4px solid #00dc82;
}

.lead {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--color-text);
  margin: 0;
}

.tech-stack {
  margin-top: 3rem;
}

.stack-item {
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.stack-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 220, 130, 0.2);
}

.stack-item ul,
.stack-item ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.stack-item li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
  color: var(--color-text);
}

.stack-item strong {
  color: #00dc82;
  font-weight: 600;
}

.workflow ol {
  counter-reset: workflow-counter;
  list-style: none;
  padding-left: 0;
}

.workflow li {
  counter-increment: workflow-counter;
  position: relative;
  padding-left: 3rem;
  margin-bottom: 1.5rem;
}

.workflow li::before {
  content: counter(workflow-counter);
  position: absolute;
  left: 0;
  top: 0;
  background: #00dc82;
  color: white;
  font-weight: bold;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.demo-note {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 3rem;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
}

.demo-note h2 {
  color: white;
  border-bottom-color: rgba(255, 255, 255, 0.3);
  margin-top: 0;
}

.demo-note p {
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.demo-note p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .about {
    padding: 1rem 0.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.15rem;
  }

  .intro-section,
  .stack-item,
  .demo-note {
    padding: 1.25rem;
  }

  .lead {
    font-size: 1.05rem;
  }

  .stack-item li {
    font-size: 0.95rem;
  }

  .workflow li {
    padding-left: 2.5rem;
  }

  .workflow li::before {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 1rem;
  }
}
</style>
