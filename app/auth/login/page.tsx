"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BaseSyntheticEvent } from "react";

import Link from "next/link";

const Login = () => {
  const handleLogin = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log("Countercheck");
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="rounded-md flex flex-col justify-center items-center gap-2 p-4 w-1/3 border-[1px] border-[#0004]">
        <form
          action="post"
          className="w-full flex flex-col justify-center items-center gap-3"
        >
          <div className="flex flex-col w-full justify-center gap-1">
            <h1 className="text-2xl font-bold">Entre na sua conta</h1>
            <span className="text-sm text-gray-500">
              Digite seu email e sua senha para entrar
            </span>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold">
              Email
            </label>
            <Input id="email" name="nome" type="email" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-bold">
              Senha
            </label>
            <Input id="email" name="nome" type="password" />
          </div>
          <div className="flex flex-col w-full">
            <span className="flex-start text-gray-600">
              Quero falar como o {" "}
              <Link className="underline text-bold text-red-600" href={"/roosebot_premium"}>
                Roosebot Premium
              </Link>
            </span>
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
