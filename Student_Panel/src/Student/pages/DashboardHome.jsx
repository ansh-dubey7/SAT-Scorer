import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardHome() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/studentdashboard/mycourses');
  }, [navigate]);

  return null;
}

export default DashboardHome;





