"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";

const Login = () => {
  const handleLogin = () => {
    console.log("Countercheck");
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="rounded-md flex flex-col justify-center items-center gap-2 p-4 w-1/4 border-[1px] border-[#0004]">
        <form action="post">
          <div className="flex gap-2 items-center">
            <LogIn className="size-4" />
            <h1 className="text-xl font-bold">Login</h1>
          </div>
          <div className="w-full">
            <label htmlFor="email">E-mail</label>
            <Input id="email" name="nome" type="email" />
          </div>
          <div className="w-full">
            <label htmlFor="password">Senha</label>
            <Input id="email" name="nome" type="password" />
          </div>
          <div className="w-full">
            <Button className="w-full" onClick={handleLogin}>
              Fazer login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
