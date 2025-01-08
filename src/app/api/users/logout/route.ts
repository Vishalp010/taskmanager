import { NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig"

connect()
export async function GET (){

    try {
      const response = NextResponse.json({message:"logout successful"},{status:200}) //hume ye nextresponse type ka isliy bnaaya h taaki ye cookies k saath interact kr ske kuk ye feature nextresponse me inbuilt hota h 
      response.cookies.set("token","",{httpOnly:true,expires:new Date(0)})   //"token","" this part of code is here use to set token a blank string which means empty timestamp 0 krke humne turant khtm krdiya
      return response
    } catch (error:any) {
      return NextResponse.json({error:error.messsage},{status:500})
    }


}