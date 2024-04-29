'use client';


import React from 'react';

import { SessionProvider } 
  from 'next-auth/react';


/**
 * Component for establishing the application's Authentication Session Provider to Next-Auth.js
 * @param children - Child components passed from React
 * @returns 
 */  
export default function AuthProvider({ children }: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
