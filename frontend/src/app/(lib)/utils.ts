// Define utility functions here

export function getGoogleOAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    
    const options: any = {
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL as string,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scopes: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(" "),
    };

    console.log({options});

    const qs = new URLSearchParams(options);

    console.log({ qs });

    return `${rootUrl}?${qs.toString()}`;
}
