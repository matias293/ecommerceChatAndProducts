import { Schema, model } from 'mongoose';
import moment from 'moment'

const msgCollectionName = 'message';

const messageSchema  = new Schema(
	{
		author: {
			email:    { type: String, required: true, max: 100 },
			nombre:   { type: String, required: true, max: 100 },
			apellido: { type: String, required: true, max: 100 },
			edad:     { type: Number, required: true },
			alias:    { type: String, required: true, max: 100 },
			avatar:   { type: String, required: true, max: 100 },
			fecha:    { type :String ,default:moment().format('DD/MM/YYYY HH:mm:ss') },
			
		},
		mensaje: { type: String, required: true, max: 1000 },
	}
);

export const messageModel = model(msgCollectionName, messageSchema );