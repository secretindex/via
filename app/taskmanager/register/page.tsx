"use client"

import { createClient } from "@/utils/supabase/client"
import { useState, BaseSyntheticEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Register = () => {
  const supabase = createClient()
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
                onClick={() => console.log("oi")}
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Register