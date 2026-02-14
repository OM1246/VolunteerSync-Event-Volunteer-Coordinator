import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Volunteers from './pages/Volunteers';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchEvents from './pages/SearchEvents';
import MyActivity from './pages/MyActivity';
import HostCreateEvent from './pages/HostCreateEvent';
import HostMyEvents from './pages/HostMyEvents';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/get-started" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard Routes - We will protect these later */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} /> {/* Generic/Redirect */}
          
          {/* Volunteer Routes */}
          <Route path="/volunteer/dashboard" element={<Dashboard />} />
          <Route path="/volunteer/events" element={<SearchEvents />} />
          <Route path="/volunteer/my-activity" element={<MyActivity />} />

          {/* Host Routes */}
          <Route path="/host/dashboard" element={<Dashboard />} />
          <Route path="/host/create-event" element={<HostCreateEvent />} />
          <Route path="/host/my-events" element={<HostMyEvents />} />
          
          <Route path="/events" element={<Events />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
