import Link from "next/link";
import { Title } from "../components/Elements";

export default function NotFound() {
  return (
    <div className="flex bg-[#F3F3F3] items-center justify-center h-[100vh]">
      <div className="flex flex-col gap-1">
        <Title>
          Erro 404
          <br />
          Página não encontrada {":("}
        </Title>
        <Link href="/" className="text-sky-600 underline">
          {"<"} Voltar ao início
        </Link>
      </div>
    </div>
  );
}
