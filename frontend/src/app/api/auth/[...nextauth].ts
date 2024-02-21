import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ]
  
  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")

  // Will hide the `GoogleProvider` when you visit `/api/auth/signin`
  // if (isDefaultSigninPage) providers.pop()

  if(req.query.nextauth.includes("callback") && req.method === "POST") {
    console.log(
      "Handling callback request from my Identity Provider",
      req.body
    )
  }

  // Get a custom cookie value from the request
  const someCookie = req.cookies["some-custom-cookie"]

  return await NextAuth(req, res, {
    providers,
    callbacks: {
      session({ session, token }) {
        // Return a cookie value as part of the session
        // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
        session.someCookie = someCookie
        return session
      }
    }
  })
}