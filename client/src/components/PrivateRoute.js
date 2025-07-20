// client/src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- CORRECTED IMPORT

function PrivateRoute({ children }) {
  const { user, isLoading } = useAuth(); // <-- CORRECTED USAGE

  // If the authentication is still loading, show a loading message
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // If there is no user, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If there is a user, render the children components
  return children;
}

export default PrivateRoute;