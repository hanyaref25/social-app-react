import { Check } from "lucide-react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Notfound from "./pages/Notfound/Notfound";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Layout from "./components/Layout/Layout";
import Notification from "./pages/Notification/Notification";
import { Toaster } from "sonner";
import UserProvider from "./context/user.context";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index={true}
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Notification"
                element={
                  <ProtectedRoute>
                    <Notification />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Notfound />} />
            </Route>

            <Route path="Login" element={<Login />} />
            <Route path="Signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" />
      </UserProvider>
    </>
  );
}

export default App;
