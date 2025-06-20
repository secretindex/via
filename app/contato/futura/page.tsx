"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

export default function FuturaContact() {
  // axios
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone();

  useEffect(() => {
    if (acceptedFiles.length > 0) console.log(acceptedFiles[0]);
  }, [acceptedFiles]);

  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [file, setFile] = useState(null);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="rounded-md flex flex-col justify-center items-center gap-2 p-4 w-1/4 border-[1px] border-[#0004]">
        <h1 className="font-bold text-center text-2xl">Futura Tecnologia</h1>
        <form action="post" className="w-full flex flex-col gap-3">
          <div>
            <label htmlFor="nome">Nome</label>
            <Input id="nome" name="nome" type="text" />
          </div>
          <div>
            <label htmlFor="title">Assunto</label>
            <Input id="title" name="title" type="text" />
          </div>
          <div>
            <label htmlFor="nome">Número</label>
            <Input id="nome" name="numero" type="text" />
          </div>
          <div>
            <label htmlFor="nome">E-mail</label>
            <Input id="email" name="email" type="email" />
          </div>
          <div>
            <label htmlFor="mensagem">Mensagem</label>
            <Textarea id="mensagem" name="mensagem" />
          </div>
          <div>
            <div
              {...getRootProps()}
              className={`w-full h-25 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isDragActive
                  ? "bg-orange-100 border-orange-400"
                  : "bg-white border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              {acceptedFiles.length > 0 ? (
                <p className="text-gray-800">{acceptedFiles[0].name}</p>
              ) : (
                <p className="text-gray-500">
                  Arraste arquivos aqui ou clique para selecionar
                </p>
              )}
            </div>
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
  );
}
