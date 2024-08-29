import { CarroI } from "@/utils/types/carros";

export function ItemCarros({ data }: { data: CarroI }) {
  return (
    <div className="mt-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src="https://www.carrodopovo.com.br/fotos/bigimage/b6e18da8688128823e31711dcd177cc4.jpg" 
          alt={`Imagem do ${data.modelo}`}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.marca.nome} {data.modelo}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Ano: {data.ano} - {data.km} km <br />
        </p>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Preço R$ {Number(data.preco).toLocaleString("pt-BR",{minimumFractionDigits: 2})}
        </p>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.acessorios}
        </p>
        <button
          type="button"
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
