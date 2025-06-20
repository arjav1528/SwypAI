# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Authentication Setup (Clerk)

This app uses [Clerk](https://clerk.com) for authentication. To get started:

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application in your Clerk dashboard
3. Copy your **Publishable Key** from the Clerk dashboard
4. Create a `.env` file in the root directory with:

   ```bash
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   ```

5. Replace `pk_test_your_publishable_key_here` with your actual Clerk publishable key

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Authentication Flow

The app includes a complete authentication flow:

- **Login Screen** (`app/(auth)/login.tsx`) - Email/password and Google OAuth sign-in
- **Signup Screen** (`app/(auth)/signup.tsx`) - User registration
- **Home Screen** (`app/(app)/home.tsx`) - Protected authenticated area
- **Profile Completion** (`app/(app)/complete-profile.tsx`) - User profile setup

The main entry point (`app/index.tsx`) automatically redirects users based on their authentication status.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [Clerk documentation](https://clerk.com/docs): Learn about Clerk authentication features.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
