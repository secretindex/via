"use client"

import { Input } from "@/components/ui/input"
import { BaseSyntheticEvent, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

const Auth = () => {
  const supabase = createClient()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const handleRegister = async (formData: FormData) => {
    if (password !== confirmPassword) return

    const [eml, passwd]: [eml: string, passwd: string] = [
      formData.get("email") as string,
      formData.get("password") as string,
    ]

    console.log({ eml, passwd })

    const { data, error } = await supabase.auth.signUp({
      email: eml,
      password: passwd,
    })

    if (error) console.error("Not allowed to sign up -> ", error.message)
    else console.log("Please, check your email ", data)
  }

  const isLoggedIn = async () => {
    const user = await supabase.auth.getUser()

    console.log(user)
  }

  isLoggedIn()

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <div className="p-4 w-2/4 flex flex-col gap-4 rounded-md border-[1px] border-[#0003] shadow-md">
        <h1 className="text-2xl font-bold text-center">Register</h1>
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
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm" htmlFor="confirm-password">
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirm-password"
              id="confirm-password"
              onChange={(e: BaseSyntheticEvent) =>
                setConfirmPassword(e.target.value)
              }
              value={confirmPassword}
            />
          </div>
          <div>
            <Button formAction={handleRegister} className="w-full">
              Register
            </Button>
          </div>
          <div className="text-sm flex justify-center items-center gap-1">
            <span>Switch to</span>{" "}
            <a
              className="font-bold underline cursor-pointer"
              onClick={() => redirect("/auth/login")}
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth
