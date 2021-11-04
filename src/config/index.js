import dotenv from 'dotenv';

dotenv.config();



export default {
    PORT:process.env.PORT,
    MONGO_INGRESS: process.env.MONGO,
    FACEBOOK_APP_ID: process.env.FACEBOOK_ID,
    FACEBOOK_APP_SECRET: process.env.SECRET_FACEBOOK,
    ETHEREAL_NAME:process.env.ETHEREAL_NAME,
    ETHEREAL_EMAIL:process.env.ETHEREAL_EMAIL,
    ETHEREAL_PASSWORD:process.env.ETHEREAL_PASSWORD,
    GMAIL_NAME: process.env.GMAIL_NAME,
    GMAIL_EMAIL: process.env.GMAIL_EMAIL,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN,
    TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE
    }

