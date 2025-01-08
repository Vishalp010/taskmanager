/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside yaha logic likhte h
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname    
  const isPathPublic = path === '/login' || path === '/signup'  // ye wo path h jo public h jo hume unhe show ni krne jiske paas token ho 
  const token = request.cookies.get('token')?.value || ""  // yaha hum token me agar token ki value h koi to us value ko token variable me store kr rhe h nahi to empty string
  if(isPathPublic && token){
    // return NextResponse.redirect('/')
    return NextResponse.redirect(new URL('/',request.nextUrl))
  }
  if (!isPathPublic && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next()
  // jo path public hote h like signup , login unpe us koo nahi bhejna jiske paas token h 
  //lekin jiske paas token nahi h 
}
 
// See "Matching Paths" ,is part me hum ye likhte h ki hmaara middle ware kis path pr run krega ki kis route se match krna h and middleware run krna h 
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup'
  ],
}