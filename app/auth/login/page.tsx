"use client"

import { createClient } from "@/utils/supabase/client"
import { useState, BaseSyntheticEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

const Login = () => {
  const supabase = createClient()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLogin = async (formData: FormData) => {
    const eml = formData.get("email") as string
    const passwd = formData.get("password") as string

    console.log({ eml, passwd })

    const { error } = await supabase.auth.signInWithPassword({
      email: eml,
      password: passwd,
    })

    if (error) {
      console.error("Not allowed to login -> ", error.message)
    } else {
      redirect("/")
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <div className="p-4 w-2/4 rounded-md border-[1px] border-[#0003] shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={(e: BaseSyntheticEvent) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm" htmlFor="password">
              Password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={(e: BaseSyntheticEvent) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <Button formAction={handleLogin} className="w-full">
              Login
            </Button>
          </div>
          <div className="text-sm m-auto">
            <span>Switch to</span>{" "}
            <a
              className="font-bold underline cursor-pointer"
              onClick={() => redirect("/auth/register")}
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
