/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {Toaster,toast} from "react-hot-toast"

const LoginPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    password: "",
    email:""
  });
  const [buttonDisabled,setButtonDisabled] = useState(true)
  const [loading,setLoading]= useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      await axios.post("/api/users/login",user)
      toast.success('Login succefully')
      router.push('/')
    } catch (error:any) {
      console.log('login Failed', error.message)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }

  };

  useEffect(() => {
      if (user?.email?.length > 0 && user?.password?.length > 0 ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {loading ? "loading...": "Login"}
        </h2>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.email}
              onChange={(e)=>setUser({...user,email:e.target.value})}
              placeholder="Enter your email"
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(e)=>setUser({...user,password:e.target.value})}
              placeholder="Enter your password"
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={onLogin}
            className="w-full mb-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            {buttonDisabled ? "Fill the details" : "Login"}
          </button>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don`&apos;`t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-500 hover:underline focus:outline-none focus:underline"
              >
                Signup
              </Link>
              <Toaster/>
            </p>
          </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default LoginPage;
