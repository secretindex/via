"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Upload } from "lucide-react"
import { useState } from "react"

export default function BraContact () {
  const [fileName, setFileName] = useState<string>("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log(file)
      setFileName(file!.name as string)
    }
  }

  return (
  <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="rounded-md flex flex-col justify-center items-center gap-2 p-4 w-1/4 border-[1px] border-[#0004]">
        <h1 className="font-bold text-center text-2xl">BRA Consultoria</h1>
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
            <label htmlFor="file_input" className="p-4 flex gap-2 justify-center items-center border-[1px] border-dotted border-[#2225] w-full rounded-md">
              <Upload size={14}/>
              <p className="text-center">Enviar arquivo</p>
              <Input type="file" onChange={handleFileChange} className="hidden" name="file_input" id="file_input" accept="image/*, application/pdf, .doc, .docx"/>
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
