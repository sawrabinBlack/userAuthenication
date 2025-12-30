# User Authentication App

## Overview
This is a simple React Native authentication app built as part of a coding test.  
The app demonstrates a complete authentication flow using React Context API, clean UI design, and intuitive navigation.

Authentication is mocked locally to focus on state management, validation logic, and user experience rather than backend integration.

---

## Features
- Login and Signup screens , 
- Home Screen that show User Info
- Form validation with clear, user-friendly error messages
- Global authentication state managed with React Context API
- Persistent authentication using AsyncStorage
- Conditional navigation based on authentication state
- Logout functionality
- Password visibility toggle

---

## Tech Stack
- React Native
- TypeScript
- React Context API
- React Navigation
- AsyncStorage

---

## App Flow
1. User signs up with name, email, and password
2. Registered users are stored locally using AsyncStorage
3. User logs in with valid credentials
4. Authentication state is persisted across app restarts
5. Authenticated users are redirected to the Home screen
6. User can log out and return to the Login screen

---

## Project Structure
```bash
src/
├── context/
│ └── AuthContext.tsx
├── navigation/
│ └── RootNavigation.tsx
│ └── Route.ts
├── screens/
│ ├── Login
│ ├── Signup
│ └── Home
├── theme/
│ ├── colors.ts
│ └── commonStyles.ts
├── utils/
│ └── validators.ts
└── App.tsx

```

## Project Requirement

- Java 17 
- Node 20.19.5 and above
- Xcode 16.1 and above

## How To Run 


## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```


```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```


