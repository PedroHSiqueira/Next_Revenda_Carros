"use client";
import { InputPesquisa } from "@/components/InputPesquisa";
import { ItemCarros } from "@/components/ItemCarros";
import { CarroI } from "@/utils/types/carros";
import { useEffect, useState } from "react";

export default function Home() {
  const [carros, setCarros] = useState<CarroI[]>([]);

  useEffect(() => {
    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/carros`);
      const dados = await response.json();
      console.log(dados);
      setCarros(dados);
    }
    getDados();
  }, []);

  const listaCarros = carros.map((carro) => (
    <ItemCarros data={carro} key={carro.id} />
  ));

  return (
    <>
    <InputPesquisa setCarros={setCarros} />
    <div className="mx-auto max-w-screen-xl">
      <h1 className="mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Veiculos{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-yellow-400 dark:decoration-yellow-600">
          Em Destaque
        </span>
      </h1>
      <section className=" mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {listaCarros}
      </section>
    </div>
    </>
  );
}
