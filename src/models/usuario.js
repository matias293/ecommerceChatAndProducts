import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const UsuarioSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    
  });


  UsuarioSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
  
    this.password = hash;
    next();
  });

  UsuarioSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password.toString(), user.password);
  return compare;
};

export default model('Usuario', UsuarioSchema);