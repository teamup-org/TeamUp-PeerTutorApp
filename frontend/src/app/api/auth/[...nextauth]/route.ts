import { authConfig } from '@/app/api/auth/[...nextauth]';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };