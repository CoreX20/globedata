import { Routes, Route } from "react-router";
import Hero from "./components/Hero";
import CountriesList from "./components/CountriesList";
import ChatInterface from "./components/ChatInterface";
import LoginPage from "./components/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PrivateRoute from "./components/PrivateRoute";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <main>
                <Hero />
                <CountriesList />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:country?"
          element={
            <PrivateRoute>
              <ChatInterface />
            </PrivateRoute>
          }
        />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
