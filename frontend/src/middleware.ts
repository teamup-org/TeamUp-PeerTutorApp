export { default } 
  from "next-auth/middleware";

/**
 * Requires user to authenicate before accessing any path under /dashboard or /register
 */
export const config = { matcher: ['/dashboard/:path*','/register'] }