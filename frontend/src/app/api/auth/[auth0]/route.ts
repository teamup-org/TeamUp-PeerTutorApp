import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const dynamicHandleLogin = (req: NextApiRequest, res: NextApiResponse) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const returnTo = url.searchParams.get('next') || '/dashboard';
    return handleLogin({
        returnTo,
    })(req, res);
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
});
