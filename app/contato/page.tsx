"use client"

import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function Contato () {
  const router = useRouter()
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 w-1/6">
        <h1 className="font-bold text-center">Selecione a empresa</h1>
        <Select onValueChange={(e) => router.push(e)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Empresa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="/contato/bra">BRA Consultoria</SelectItem>
            <SelectItem value="/contato/futura">Futura Tecnologia</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
