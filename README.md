# GlobeData App 🌍

## Project Overview

GlobeData is a web application designed to provide users with information about countries, travel recommendations, and other geographical insights. The app utilizes AI-powered chat interfaces to answer user queries about countries, places, languages, cultures, and more. It also includes Google OAuth authentication to allow users to sign in securely and access protected content.

## Setup Instructions

Follow these instructions to set up the project locally.

### 1. Clone the repository

Clone the repository to your local using the following command:

```
git clone https://github.com/CoreX20/globedata.git
cd globedata
```

### 2. Install dependencies

Install the required dependencies:

```
npm install --legacy-peer-deps
```

### 3. Set environment variables

Create a `.env` file in the root of the project and add the following environment variables:

```
# Google OAuth client ID
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here

# Your NVIDIA API Key (https://build.nvidia.com/meta/llama-3_1-405b-instruct)
VITE_NVIDIA_API_KEY=your-api-key-here
```

### 4. Run the development server

To start the development server, run:

```
npm run dev
```

## Available Features

- **Google OAuth Login**: Users can sign in using their Google account for a secure and seamless experience.
- **Country Information**: Users can explore various countries, including their culture, famous places, languages, and travel recommendations.
- **AI-powered Chat Interface**: Users can ask the AI about specific countries, and the assistant will provide detailed and friendly responses.

## Technical Decisions and Architecture

1. The project is built using **React** with **TypeScript** for better type safety and a smoother development experience.

2. **Google OAuth Authentication**: The app uses **Google OAuth** for authentication, allowing users to log in with their Google account. The OAuth process is handled by the **@react-oauth/google** library. Once authenticated, the user's credentials are stored in **localStorage**

## Future Improvements

Here are a few potential areas for future development:

1. **User Profile**:

   - Add a **user profile** page where users can save their preferences (e.g., favorite countries, chat history).

2. **Unit and Integration Tests**:

   - Add **tests** using **Jest** and **React Testing Library** to ensure the reliability and robustness of the app, especially core features like authentication and the chat interface.

3. **Improve UI/UX**:
   - Enhance the **UI** with better design patterns and animations to provide a more engaging user experience.
