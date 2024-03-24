import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET (request: Request) {
    return Response.json({ text: 'This is the GET request' });
}

export async function POST(req: any, res: any){
    const data = await req.json()
    console.log(data)

    return Response.json(data)
}