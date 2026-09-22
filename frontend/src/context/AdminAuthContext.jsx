import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return sessionStorage.getItem('traffic_ai_admin_unlocked') === 'true';
  });

  const unlockAdmin = (password) => {
    if (password === 'aman@1234') {
      setIsAdminUnlocked(true);
      sessionStorage.setItem('traffic_ai_admin_unlocked', 'true');
      return { success: true, message: 'Admin access authorized.' };
    }
    return { success: false, message: 'Invalid password. Access denied.' };
  };

  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    sessionStorage.removeItem('traffic_ai_admin_unlocked');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminUnlocked, unlockAdmin, lockAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default AdminAuthContext;
