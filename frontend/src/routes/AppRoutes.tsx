import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Events from '../pages/Events';
import CreateEvent from '../pages/CreateEvent';
import PrivateRoute from '../components/PrivateRoute';
import EventDetails from '../pages/EventDetails';

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
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;