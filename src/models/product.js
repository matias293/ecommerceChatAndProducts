import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    }
  });

export default model('Product', ProductSchema);