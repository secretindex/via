"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

import { signup } from "./actions";
import { BaseSyntheticEvent, useState } from "react";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleRegister = () => {
    if (!email) {
      setErrorMessage("Digite um e-mail válido");
      return;
    }
    if (!password) {
      setErrorMessage("Digite uma senha válida");
      return;
    }
    if (!name) {
      setErrorMessage("Digite um nome");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Senhas não coincidem");
      return;
    }

    const newUser = {
      email: email,
      password: password,
    };

    console.log(newUser);
  };

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center">
      <div className="rounded-md  p-4 w-1/4 border-[1px] border-[#0004]">
        <form className="flex flex-col justify-center items-center gap-2 w-full h-full">
          <div className="flex items-center gap-2">
            <User className="size-4" />
            <h1 className="text-xl font-bold">Register</h1>
          </div>
          <div className="w-full">
            <label htmlFor="nome">Nome</label>
            <Input
              id="nome"
              name="nome"
              type="text"
              onChange={(e: BaseSyntheticEvent) => setName(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="email">E-mail</label>
            <Input
              id="email"
              name="nome"
              type="email"
              onChange={(e: BaseSyntheticEvent) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="password">Senha</label>
            <Input
              id="email"
              name="nome"
              type="password"
              onChange={(e: BaseSyntheticEvent) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="confirm-password">Confirmar senha</label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              onChange={(e: BaseSyntheticEvent) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>
          {errorMessage && (
            <div>
              <span>{errorMessage}</span>
            </div>
          )}
          <div>
            <span>
              Quero falar como o <Link href={"/roosebot"}>Roosebot</Link>
            </span>
          </div>
          <div className="w-full">
            <Button className="w-full" onSubmit={handleRegister}>
              Registrar-se
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
