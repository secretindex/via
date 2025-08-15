"use client"

import { Input } from "@/components/ui/input"
import { BaseSyntheticEvent, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Island_Moments } from "next/font/google"

type AuthOption = "Login" | "Register"

const Auth = () => {
  const supabase = createClient()
  const [authOpt, setAuthOpt] = useState<AuthOption>("Register")


  if (authOpt === "Login") {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleLogin = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Not allowed to login -> ", error.message)
      }
    }

    return (
      <div className="flex flex-col justify-center items-center w-full gap-4">
        <div className="p-4 w-2/4 rounded-md border-[1px] border-[#0003] shadow-md">
          <h1>Login</h1>
          <form>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 text-sm" htmlFor="email"></label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={(e: BaseSyntheticEvent) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 text-sm" htmlFor="email"></label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={(e: BaseSyntheticEvent) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            <div>
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
            </div>
            <div className="text-sm">
              <span>Switch to</span>{" "}
              <a
                className="font-bold underline"
                onClick={() => setAuthOpt("Register")}
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    )
  } else {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const handleRegister = async (e: any) => {
      e.preventDefault()

      if (password !== confirmPassword) return

      console.log({ email, password })

      const { data, error } = await supabase.auth.signUp({ email, password })

      if (error) console.error("Not allowed to sign up -> ", error.message)
        else console.log("Please, check your email ", data)
    }

    const isLoggedIn = async () => {
      const user = await supabase.auth.getUser()


      console.log(user);
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
                onChange={(e: BaseSyntheticEvent) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="text-gray-600 text-sm"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <Input
                type="password"
                name="confirm-password"
                id="confirm-password"
                onChange={(e: BaseSyntheticEvent) =>
                  setConfirmPassword(e.target.value)
                }
              />
            </div>
            <div>
              <Button onClick={handleRegister} className="w-full">
                Register
              </Button>
            </div>
            <div className="text-sm flex justify-center items-center gap-1">
              <span>Switch to</span>{" "}
              <a
                className="font-bold underline"
                onClick={() => setAuthOpt("Login")}
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Auth
