import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import PostJob from "./pages/PostJob";
import ViewJob from "./pages/ViewJob";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/Authenications/protectedRoute";
import UpdateJob from "./pages/UpdateJob";
import JobDetails from "./pages/JobDetails";
import ViewApplications from "./pages/ViewApplications";
import EditformPage from "./pages/EditformPage";
import ChnagePassword from "./pages/ChnagePassword";
import CampusRequest from "./pages/CampusRequest";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute element={<Dashboard />} requiredType="employer" />
          }
        ></Route>
        <Route
          path="/jobs/postjobs"
          element={
            <ProtectedRoute element={<PostJob />} requiredType="employer" />
          }
        ></Route>
        <Route
          path="/jobs/viewjobs"
          element={
            <ProtectedRoute element={<ViewJob />} requiredType="employer" />
          }
        ></Route>
        <Route
          path="/jobs/view-application"
          element={
            <ProtectedRoute
              element={<ViewApplications />}
              requiredType="employer"
            />
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute element={<Profile />} requiredType="employer" />
          }
        ></Route>
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute
              element={<EditformPage />}
              requiredType="employer"
            />
          }
        ></Route>
        <Route
          path="/change-password"
          element={
            <ProtectedRoute
              element={<ChnagePassword />}
              requiredType="employer"
            />
          }
        ></Route>
        <Route
          path="/campus-request"
          element={
            <ProtectedRoute
              element={<CampusRequest />}
              requiredType="employer"
            />
          }
        ></Route>
        <Route
          path="/edit-job/:jobId"
          element={
            <ProtectedRoute element={<UpdateJob />} requiredType="employer" />
          }
        ></Route>

        <Route
          path="/job-details/:jobId"
          element={
            <ProtectedRoute element={<JobDetails />} requiredType="employer" />
          }
        ></Route>
        <Route path="/dashboard/student" element={<NotFound />}></Route>
        <Route path="/dashboard/university" element={<NotFound />}></Route>
        <Route path="/not-found" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
