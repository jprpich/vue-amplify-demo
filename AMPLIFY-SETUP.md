# 🚀 AWS Amplify REST API Setup Guide

This guide will walk you through deploying your Vue app with a serverless REST API to AWS Amplify.

## ⚡ Quick Summary

Your app now includes:

- ✅ REST API with Lambda function (GET /hello endpoint)
- ✅ API Gateway for routing
- ✅ CORS enabled for browser access
- ✅ Automatic backend/frontend deployment
- ✅ Build process that works with or without backend deployed

## 📋 Prerequisites

- AWS Account (free tier works!)
- AWS CLI configured with your credentials
- Node.js 20+ installed

## 🎯 Quick Start - Local Development

### 1. Test Locally with Amplify Sandbox

Run the Amplify sandbox to test your API locally:

```bash
npm run sandbox
```

This will:

- Deploy your backend to AWS in a temporary sandbox environment
- Generate `amplify_outputs.json` with your API configuration
- Watch for changes and auto-deploy updates

### 2. Run Your Vue App

In a new terminal, start your Vue dev server:

```bash
npm run dev
```

Visit http://localhost:5173 and click the "Call API" button on the home page to test your API!

## 🌐 Deploy to Production

### Option 1: Deploy via Amplify Console (Easiest!)

1. **Push your code to GitHub:**

   ```bash
   git add .
   git commit -m "Add Amplify REST API"
   git push origin main
   ```

2. **Connect to Amplify Hosting:**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Select your GitHub repository
   - Amplify will auto-detect the build settings from `amplify.yml`
   - **Important**: Make sure to grant Amplify permissions to deploy backend resources

3. **Configure Build Settings:**
   Amplify should auto-detect these settings, but verify:

   ```yaml
   version: 1
   backend:
     phases:
       build:
         commands:
           - npm ci --cache .npm --prefer-offline
           - npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci --cache .npm --prefer-offline
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - .npm/**/*
         - node_modules/**/*
   ```

4. **Deploy:**
   - Click "Save and deploy"
   - Amplify will build your frontend and deploy your backend automatically!

5. **Test Your API:**
   - Once deployed, visit your Amplify URL
   - Click the "Call API" button to test the connection

### Option 2: Manual Deploy

If you prefer CLI deployment:

```bash
# Set your Amplify App ID (get this from Amplify Console)
export AMPLIFY_APP_ID=your-app-id-here

# Deploy the pipeline
npm run deploy
```

## 📁 Project Structure

```
vue-amplify-demo/
├── amplify/                          # Amplify backend definition
│   ├── backend.ts                    # Backend configuration
│   ├── functions/                    # Lambda functions
│   │   └── my-function/
│   │       ├── handler.ts            # API handler code
│   │       ├── resource.ts           # Function definition
│   │       └── package.json          # Function dependencies
│   └── tsconfig.json                 # TypeScript config
├── src/
│   ├── main.js                       # Amplify client config
│   └── views/
│       └── HomeView.vue              # API demo component
└── amplify_outputs.json              # Auto-generated API config (gitignored)
```

## 🔧 Understanding Your API

### The Backend (`amplify/backend.ts`)

Defines your Amplify backend resources. Currently includes:

- A Lambda function named `myFunction`
- An HTTP endpoint at `GET /hello`

### The Lambda Function (`amplify/functions/my-function/handler.ts`)

Your serverless API handler that:

- Returns a JSON response with a message
- Includes a timestamp
- Has CORS enabled for browser requests

### The Frontend (`src/views/HomeView.vue`)

A Vue component that:

- Calls the API when you click the button
- Displays the response
- Handles loading and error states

## 🎨 Next Steps

Now that you have a working API, you can:

1. **Add More Endpoints:**

   ```typescript
   // In amplify/backend.ts
   backend.myFunction.addHttpRoute('POST', '/items', {
     /* ... */
   })
   backend.myFunction.addHttpRoute('GET', '/items/:id', {
     /* ... */
   })
   ```

2. **Add a Database:**
   - Add DynamoDB with `@aws-amplify/backend` data resources
   - Connect your Lambda to the database

3. **Add Authentication:**
   - Add Cognito authentication
   - Protect your API endpoints

4. **Environment Variables:**
   - Add secrets and environment variables to your Lambda functions
   - Use `defineFunction()` with `environment` option

## 📚 Resources

- [Amplify Gen 2 Documentation](https://docs.amplify.aws/)
- [Building REST APIs](https://docs.amplify.aws/javascript/build-a-backend/functions/)
- [Vue + Amplify Guide](https://docs.amplify.aws/vue/)

## 🐛 Troubleshooting

### API not working locally?

- Make sure `npm run sandbox` is running
- Check that `amplify_outputs.json` was generated
- Look for errors in the sandbox terminal

### API not working in production?

- Check Amplify Console build logs
- Verify CORS settings in your Lambda function
- Check CloudWatch logs for your Lambda function

### Need to update your API?

- Make changes to your Lambda handler
- The sandbox auto-deploys changes locally
- In production, push to GitHub and Amplify will redeploy

## 💡 Tips

- The sandbox creates temporary AWS resources - they're automatically cleaned up
- Each Git branch can have its own backend (branch-based deployments)
- Monitor your API calls in AWS CloudWatch
- Use the Amplify Console to view logs and metrics

---

Happy coding! 🎉
