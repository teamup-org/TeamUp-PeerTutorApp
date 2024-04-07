// import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions }
  from 'next-auth';
import { useSession }
  from 'next-auth/react';

import { TableFetch }
  from '@/app/_lib/data';


export const authConfig: NextAuthOptions = {
  providers: [
    /*CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const dbUser = await {}.user.findFirst({
          where: { email: credentials.email },
        });
        
        // USE BCRYPT
        if (dbUser && dbUser.password === credentials.password) {
          const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
          return dbUserWithoutPassword as User;
        }

        return null;
      },
    }),*/

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      const user = useSession();
      
      if (user) {
        const { data: tutorData } = TableFetch<TutorQuery>("tutor", [user], `email_contains=${user?.data.email}`);
        const { data: tuteeData } = TableFetch<TuteeQuery>("tutee", [user], `email_contains=${user?.data.email}`);

        // If registered as tutor/tutee, redirect to /dashboard
        if (tutorData?.data.length || tuteeData?.length) {
          return "/dashboard";
        }
        
        // Else if not registered, redirect to /register
        return "/register";
      }

      return "/login";
    }
  },
};