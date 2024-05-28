"use client";

import { Input } from "@/components/Elements";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
      throw new Error("Invalid username or password");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg max-w-sm w-full max-sm:m-4">
        <div className="flex gap-2 items-center mb-6">
          <div className="rounded-full bg-orange-400 h-6 w-6 sm:h-7 sm:w-7" />
          <p className="font-semibold text-lg">{session ? `Já tens sessão iniciada!` : "Login"}</p>
        </div>
        {!session && (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Utilizador"
              className="mb-4 mt-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-400"
              required
            />
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="************"
              className="mb-4 mt-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-400"
              required
            />
            <button type="submit" className="w-full bg-orange-400 text-white py-2 px-4 transition-all hover:bg-orange-500">
              Entrar
            </button>
          </form>
        )}
        {session && (
          <div className="flex gap-2 ml-9">
            <Link href="/" className="text-sky-600 underline">
              Volta ao início
            </Link>
            <span onClick={() => signOut()} className="text-sky-600 underline cursor-pointer">
              Termina a sessão
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
