/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel" 
import bcryptjs from 'bcryptjs'
import { NextResponse,NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request : NextRequest ){
  try {
    const reqBody = await request.json()
    //destructured user from the db
    const {email,password } = reqBody
    //grab the user by using the email saved in db of user
    const user = await User.findOne({email})
    if(!user){
      return NextResponse.json({error:'user not found'},{status:404})
    }
    //check the password saved in db of user
    const validatePassword = await bcryptjs.compare(password,user.password)
    if(!validatePassword){
      return NextResponse.json({error:'invalid credentials'},{status:404})
    }
    //collect token data yaha hum check krne k baad ki hn user exist krta h to hum user ki details hum user cookies me bhejege in secure and hashed form 
    const tokenData = {
      id:user._id,   //ye id hume mongodb se milti h hum akele is k behalf pr b sb kuchh find kr skte h kuki ye ekdum unique hoti h but isse alag b data bhejne me koi aafat ni aari 
      email:user.email,
      username:user.username,
      // password:user.password
    }
    // create the token to sending purpose
    const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'5h'})  //yaha signed token bnega jispe toekndata ka signed hoga basically uske acc bna hua hoga wo token 
    const response = NextResponse.json({
      message:'created succefully',
      success:true,
    })
    response.cookies.set('token',token,{httpOnly:true})
    return response
  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}