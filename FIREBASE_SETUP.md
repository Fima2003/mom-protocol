# Firebase Setup Guide

This guide will help you set up Firebase and Firestore for the Mom's Sick Day Protocol app.

## Prerequisites

- A Google account
- Node.js installed on your machine

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "moms-sick-day-protocol")
4. Accept the Firebase terms and click "Continue"
5. (Optional) Enable Google Analytics or skip it
6. Click "Create project" and wait for it to be created

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
2. Give your app a nickname (e.g., "Mom's Protocol Web App")
3. **Do NOT** check "Also set up Firebase Hosting" (unless you want to use it)
4. Click "Register app"

## Step 3: Get Your Firebase Configuration

After registering, you'll see a configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

**Copy these values** - you'll need them in the next step.

## Step 4: Enable Firestore Database

1. In the Firebase Console, click on **Firestore Database** in the left sidebar
2. Click "Create database"
3. Choose **"Start in test mode"** for development (we'll update rules later)
4. Select a Firestore location (choose one close to your users)
5. Click "Enable"

## Step 5: Configure Environment Variables

1. In your project root, create a file named `.env.local`
2. Copy the contents from `.env.example` and fill in your Firebase config values:

```bash
GOOGLE_API_KEY=your-google-api-key-here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-from-firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

## Step 6: Update Firestore Security Rules (Production)

For production, update your Firestore rules to allow users to only read/write their own data:

1. Go to **Firestore Database** > **Rules** in Firebase Console
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own health data
    match /health-data/{userId} {
      allow read: if true;  // Anyone can read (for share links)
      allow write: if request.auth != null || true;  // For now allow all writes
      // TODO: Implement proper authentication
    }
  }
}
```

**Note:** The above rules allow anyone to write. For production, you should implement Firebase Authentication and restrict writes to authenticated users.

## Step 7: Test the Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

4. Try adding some health activities - they should now be saved to Firestore!

5. Check your Firebase Console > Firestore Database to see the data being saved

## Step 8: Using the Share Link Feature

1. On the main dashboard, click the **"🔗 Share Live Link"** button
2. Copy the generated link
3. Share it with someone
4. When they open the link, they'll see your health status in real-time (read-only)
5. Any updates you make will appear live on their screen!

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Double-check your `NEXT_PUBLIC_FIREBASE_API_KEY` in `.env.local`
- Make sure there are no extra spaces or quotes

### "FirebaseError: Missing or insufficient permissions"
- Go to Firestore Database > Rules and ensure you're in "test mode" or have proper rules set

### Changes not appearing in Firestore
- Check the browser console for errors
- Verify all environment variables are prefixed with `NEXT_PUBLIC_`
- Restart the development server after changing `.env.local`

### Share link not working
- Make sure the person opening the link is using the full URL including the user ID
- Check that Firestore read permissions are enabled in your security rules

## Optional: Firebase Authentication

For added security, you can implement Firebase Authentication:

1. Enable Authentication in Firebase Console
2. Choose a sign-in method (Email/Password, Google, etc.)
3. Update the code to require authentication before allowing writes
4. Update Firestore rules to check `request.auth.uid`

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add all `NEXT_PUBLIC_FIREBASE_*` environment variables to your hosting platform
2. Update Firestore security rules to be more restrictive
3. Consider implementing Firebase Authentication
4. Enable Firebase App Check for additional security

---

**Need help?** Check the [Firebase Documentation](https://firebase.google.com/docs) or open an issue on GitHub.
