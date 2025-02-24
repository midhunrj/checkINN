import mongoose, { Schema } from "mongoose";
import { type } from "os";


const HotelSchema=new Schema({
    name: { type: String, required: true },
  city: { type: String, required: true },
  image:{type:String,},
  rooms: { type: Number, min: 1, max: 3 },
  adults: { type: Number, min: 1, max: 3 },
  children: { type: Number, min: 0, max: 3 },
  totalPriceWithGST: { type: Number, required: true }
})


export const HotelModel = mongoose.model("hotels", HotelSchema);