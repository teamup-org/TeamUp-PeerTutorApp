import { NextAuthOptions, User, getServerSession } from 'next-auth';

// import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { useSession } from 'next-auth/react';

import { redirect, useRouter } from 'next/navigation';

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

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token;
    },

    /*async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session;
    },

    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return profile.email && profile?.email.endsWidth("@tamu.edu")
      }

      return true
    },*/
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/");
  }
}
