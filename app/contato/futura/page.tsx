'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"

export default function FuturaContact () {
  // axios
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="rounded-md flex flex-col justify-center items-center gap-2 p-4 w-1/4 border-[1px] border-[#0004]">
        <h1 className="font-bold text-center text-2xl">Futura Tecnologia</h1>
        <form action="post" className="w-full flex flex-col gap-3">
          <div>
            <label htmlFor="nome">Nome</label>
            <Input id="nome" name="nome" type="text"/>
          </div>
          <div>
            <label htmlFor="nome">Número</label>
            <Input id="nome" name="numero" type="text"/>
          </div>
          <div>
            <label htmlFor="nome">E-mail</label>
            <Input id="email" name="email" type="email"/>
          </div>
          <div>
            <label htmlFor="mensagem">Mensagem</label>
            <Textarea id="mensagem" name="mensagem"/>
          </div>
          <div>
            <label htmlFor="file_input" className="p-2 rounded-md">
              <Input type="file" accept="image/*, application/pdf, .doc, .docx"/>
            </label>
          </div>
          <div>
            <Button className="w-full">
              <Mail />
              Enviar mensagem
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
