import mongoose , {Schema, Document} from "mongoose";
import { Scada } from "next/font/google";

export interface Message extends Document{
    content : string;
    createdAt : Date;
}

const MessageSchema : Schema<Message>  = new Schema({
    content :{
        type : String,
        required : true,
    },
    createdAt :{
        type : Date,
        required :true,
        default : Date.now
    },
})


export interface User extends Document{
    username : string;
    email : string;
    password : string;
    verifyCode : string;
    verifyCodeExpiry : Date;
    isVerified : boolean;
    isAcceptingMessage : boolean;
    messages : Message[]
}

const UserSchema : Schema<User>  = new Schema({
    username :{
        type : String,
        required : [true, "username is required"],
        trim : true,
        unique : true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'please use a valid email address'],
   },
    password :{
        type : String,
        required : [true, "password is required"],
   },
    verifyCode :{
        type : String,
        required : [true, "verify Code is required"],
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verifyCodeExpiry :{
        type : Date,
        required : [true, "verify Code Expiry is required"],
    },
    isAcceptingMessage :{
        type : Boolean,
        default : true
    },
    messages :{
        type : [MessageSchema],
    }
})

// ✅ Prevent model re-compilation in Next.js

//If model already exists → reuse it
// Else → create it
const UserModel: mongoose.Model<User> =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);
