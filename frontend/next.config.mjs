/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'upload.wikimedia.org'
        ],
    },

    // CORS for Next.js /api routes, not needed if running Java Spring Boot
    /* async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: process.env.ACCESS_CONTROL_ALLOW_CREDENTIALS },
                    { key: "Access-Control-Allow-Origin", value: process.env.ACCESS_CONTROL_ALLOW_ORIGIN },
                    { key: "Access-Control-Allow-Methods", value: process.env.ACCESS_CONTROL_ALLOW_METHODS },
                    { key: "Access-Control-Allow-Headers", value: process.env.ACCESS_CONTROL_ALLOW_HEADERS },
                ]
            }
        ]
    } */
};

export default nextConfig;
