# 🚀 Deployment Checklist

## What We've Built

Your Vue app now has a complete serverless REST API backend! Here's what was added:

### Backend (`amplify/` folder)

- **Lambda Function**: Handles HTTP requests at `/hello` endpoint
- **API Gateway**: REST API that routes requests to your Lambda
- **CORS Configuration**: Allows browser access from any origin

### Frontend Updates

- **API Demo**: Home page now has a "Call API" button
- **Dynamic Config Loading**: Loads API endpoint at runtime (works in dev and production)
- **Error Handling**: Graceful fallbacks if API isn't available

### Build Configuration

- **`amplify.yml`**: Defines how Amplify builds backend then frontend
- **Vite Plugin**: Automatically copies API config to build output
- **Fixed Build Process**: No longer fails if config file is missing

---

## ✅ Ready to Deploy!

### Step 1: Commit Your Changes

```bash
git add .
git commit -m "Add Amplify REST API backend"
git push origin main
```

### Step 2: Deploy to Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Find your existing app (or create new one if starting fresh)
3. **If Creating New App:**
   - Click "New app" → "Host web app"
   - Connect your GitHub repository
   - Amplify will detect `amplify.yml` automatically
4. **If App Already Exists:**
   - Your next push will automatically trigger a deployment
5. **Important**: Amplify will ask for permissions to deploy backend resources (Lambda, API Gateway, etc.) - approve these!

### Step 3: Wait for Deployment

The deployment has two phases:

1. **Backend Phase**: Deploys Lambda function and API Gateway (~2-3 minutes)
2. **Frontend Phase**: Builds and deploys your Vue app (~1-2 minutes)

### Step 4: Test Your API!

Once deployed:

1. Visit your Amplify URL
2. Click the "Call API" button on the home page
3. You should see a response with timestamp and message! 🎉

---

## 🧪 Test Locally First (Optional)

Want to test before deploying to production?

### Terminal 1: Start Amplify Sandbox

```bash
npm run sandbox
```

Wait for:

```
✅ Deployed successfully
[Sandbox] Watching for file changes...
```

### Terminal 2: Start Vue Dev Server

```bash
npm run dev
```

Visit http://localhost:5173 and test the API button!

---

## 📁 What Each File Does

### `amplify/backend.ts`

- Defines your backend infrastructure
- Creates Lambda function and API Gateway
- Exports API endpoint URL for frontend to use

### `amplify/functions/my-function/handler.ts`

- Your API logic
- Handles incoming HTTP requests
- Returns JSON responses

### `amplify.yml`

- Tells Amplify how to build your app
- Ensures backend deploys before frontend
- Configures cache and artifact locations

### `vite.config.js`

- Added plugin to copy `amplify_outputs.json` to dist/
- This file contains your API endpoint URL

### `src/main.js`

- Loads Amplify configuration at app startup
- Uses `fetch()` to avoid build-time errors

### `src/views/HomeView.vue`

- Demo component showing how to call your API
- Loads endpoint from `amplify_outputs.json`
- Uses browser `fetch()` to make requests

---

## 🎯 Next Steps After Deployment

Once your API is live, you can:

### 1. **Add More Endpoints**

Edit `amplify/functions/my-function/handler.ts`:

```typescript
if (method === 'GET' && path === '/users') {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ users: ['Alice', 'Bob'] }),
  }
}
```

### 2. **Add a Database**

```bash
npm install @aws-amplify/backend-data
```

Then add DynamoDB tables to your backend!

### 3. **Add Authentication**

Protect your API with Cognito user authentication.

### 4. **Add More Lambda Functions**

Create separate functions for different API operations.

---

## 🐛 Troubleshooting

### Build Fails in Amplify

- Check the backend build logs first
- Verify AWS credentials are configured in Amplify
- Make sure backend permissions are granted

### API Button Shows Error

- Check browser console for details
- Verify `amplify_outputs.json` exists in production
- Check Network tab to see if API is reachable

### CORS Errors

- Check Lambda handler has CORS headers
- Verify API Gateway CORS settings in `backend.ts`

### Local Sandbox Issues

- Run `npx ampx configure profile` to set up AWS credentials
- Check AWS credentials are valid
- Make sure you're in the project root directory

---

## 📚 Learn More

- [Amplify Gen 2 Docs](https://docs.amplify.aws/)
- [Lambda Function Guide](https://docs.amplify.aws/javascript/build-a-backend/functions/)
- [API Gateway Docs](https://docs.aws.amazon.com/apigateway/)

---

**You're all set!** 🚀 Push your code and watch it deploy!
