import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel" 
import bcryptjs from 'bcryptjs'
import { NextResponse,NextRequest } from 'next/server'


connect()

export async function POST(request : NextRequest ){
  try {
    const reqBody = await request.json()
    const {username,email,password } = reqBody
    //check user existance
    const user = await User.findOne({email})
    if(user){
      return NextResponse.json({error:'user already exists'},{status:400})
    }
    //hashed password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password,salt)
    
    //create newuser using that hashed password 
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })
    
    const savedUser = await newUser.save()
    return NextResponse.json(
        {message:'new user created succesfully',
        success:true,
      savedUser:savedUser
      })

  } catch (error:any) {
    return NextResponse.json({error: error.message},{status :500})
  }
}