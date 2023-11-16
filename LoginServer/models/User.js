const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: { type: String,required:true},
    email:{type:String, unique: true},
    phone: { type: String, required: true },
    password: { type: String, required: true },
    // otpSecret: { type: String, required: true },
    // otp: { type: String, expires: '1m' },
    // verified: {type: Boolean,default:false},
    company:{type:String},
    company_address: { type: String },
    company_email: { type: String},
    company_pan: { type: String },
    gst: { type: String  },
    cheque: { type: String  },
  });
  const User = mongoose.model("User", userSchema);

  module.exports =User;