import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Events from '../pages/Events';
import CreateEvent from '../pages/CreateEvent';
import EventDetails from '../pages/EventDetails';
import CommunityHelpRequests from '../pages/CommunityHelpRequests';
import CreateCommunityRequest from '../pages/CreateCommunityRequest';
import CommunityRequestDetail from '../pages/CommunityRequestDetail';
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="events" element={<Events />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="create-event"
            element={
              <PrivateRoute>
                <CreateEvent />
              </PrivateRoute>
            }
          />
          <Route path="event-details/:id" element={<EventDetails />} />
          <Route path="community-requests" element={<CommunityHelpRequests />} />
          <Route
            path="community-requests/create"
            element={
              <PrivateRoute>
                <CreateCommunityRequest />
              </PrivateRoute>
            }
          />
          <Route path="community-requests/:id" element={<CommunityRequestDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;