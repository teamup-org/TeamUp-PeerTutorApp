import {NextRequest, NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest, res: NextResponse,) {

    let bodyText = await new Response(req.body).text()
    let parsedJSON = JSON.parse(bodyText)

    if(req.method === 'POST'){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.CONTACT_FORM_ADDRESS,
                pass: process.env.CONTACT_FORM_PASS
            }
        })

        const mailOptions = {
            from: parsedJSON.email,
            to: process.env.CONTACT_FORM_ADDRESS,
            subject: `Theo Contact Form: ${parsedJSON.subject}`,
            text: `Sender: ${parsedJSON.name}\nEmail: ${parsedJSON.email}\nSubject: ${parsedJSON.subject}\nMessage: ${parsedJSON.message}`
        }

        transporter.sendMail(mailOptions, (error)=>{
            if(error){
                return new Response("E-mail form could not be processed.", { status: 405 })
            }
        })

        return new Response("E-mail form successfully received!", { status: 200 })
    }
    else{
        return new Response("E-mail form could not be processed.", { status: 405 })
    }
}