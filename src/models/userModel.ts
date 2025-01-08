import mongoose,{Schema,Document} from "mongoose";

interface IUser extends Document{
  username:string;
  email:string;
  password:string;
}

const UserSchema : Schema<IUser> = new Schema({
  username:{
    type:String,
    required:[true,"username is required"],
    unique: true,
  },
  email:{
    type:String,
    reuired:[true,'email is required'],
    unique:true,
    match: [/.+\@.+\..+/, "please use a valid email address"]
  },
  password:{
    type:String,
    required:[true,"password is required"],
    minLength:6,
  }
})

const UserModel = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User",UserSchema)
export default UserModel