import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const dynamicHandleLogin = (req: NextApiRequest, res: NextApiResponse) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const returnTo = url.searchParams.get('next') || '/dashboard';
    return handleLogin({
        returnTo,
    })(req, res);
};

const dynamicHandleCallback = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await handleCallback(req, res);
    } catch (error) {
        console.log(req.headers.host)
        const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
        const redirectUrl = new URL(`/?error=${encodeURIComponent(errorMessage)}`, `http://localhost:3000`);
        // const redirectUrl = new URL('/', `http://${req.headers.host}`); 

        // Redirect using NextResponse
        const response = NextResponse.redirect(redirectUrl);
        return response;
    }
};

export const GET = handleAuth({
    login: dynamicHandleLogin,
    signup: handleLogin({
        authorizationParams: {
            screen_hint: "signup",
        },
        returnTo: "/register",
    }),
    logout: handleLogout({
        returnTo: "/",
    }),
    callback: dynamicHandleCallback,
});
