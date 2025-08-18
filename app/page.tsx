import { Button } from "@/components/ui/button";
import { MailIcon, SignpostBig } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] w-full items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex flex-col w-full justify-center items-center">
            <div className="flex gap-2 justify-center items-center w-full">
              <SignpostBig size={'4.7rem'}/>
              <h1 className="text-8xl font-bold text-center">VIA</h1>
            </div>
            <span className="text-sm">VIA de Acesso</span>
          </div>
          <span>Solicite atendimento, orçamento ou visita de demonstração do sistema OnyxERP para seu RPPS</span>
        </div>
        <div className="m-auto">
          <Link href={"/contato"} >
            <Button className="flex cursor-pointer justify-center items-center">
              <MailIcon />
              Entrar em contato
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
