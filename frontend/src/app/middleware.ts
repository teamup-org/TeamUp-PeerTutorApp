import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    debug: true,
    afterAuth(auth, req, evt) {
      console.log("running");
      // Redirect logged in users to organization selection page if they are not active in an organization
      if (
        auth.userId && req.nextUrl.pathname == "/login"
      ) {
        const dashboard = new URL("/dashboard", req.url);
        return Response.redirect(dashboard);
      }

      // Allow users visiting public routes to access them
      //return Response.next();
    },
  });