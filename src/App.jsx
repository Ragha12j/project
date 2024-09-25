import "./App.css";
import "./index.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddDecoration from "./pages/admin/decortion/AddDecoration";
import AddAdvertisement from "./pages/admin/advertisement/AddAdvertisement";
import AdminPage from "./pages/admin/AdminPage";
import Dashboard from "./pages/admin/dashboard/Dashboard"; 
import Form from "./pages/admin/form/Form";
import Calendar from "./pages/admin/calendar/Calendar";
import View from "./pages/admin/dashboard/view"; 
import Edit from "./pages/admin/dashboard/edit";
function App() {
  return (
    <Router>
      <Routes>
        {/* مسار صفحة الـ AdminPage كأب */}
        <Route path="/adminPage" element={<AdminPage />}>
          {/* المسارات الفرعية ضمن AdminPage */}
          <Route path="dashboard" element={<Dashboard />} />
          {/* إضافة مسار عرض الحجز كصفحة منفصلة */}
          <Route path="dashboard/edit/:id" element={<Edit />} />
          <Route path="dashboard/view/:id" element={<View />} />
          <Route path="add-advertisement" element={<AddAdvertisement />} />
          <Route path="add-decoration" element={<AddDecoration />} />
          <Route path="form" element={<Form />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
      
      </Routes>
    </Router>
  );
}

export default App;
