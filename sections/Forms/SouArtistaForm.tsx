import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import SouArtistaFormIsland from "../../islands/Forms/SouArtistaFormIsland.tsx";
interface SouArtistaFormProps {
  /**
   * @hide
   * @readonly
   */
  pessoaJuridica?: boolean;
}

const SouArtistaForm = ({ pessoaJuridica = false }: SouArtistaFormProps) => {
  return (
    <div>
      <h2 class="text-xl font-bold mb-4">cadastro de artista</h2>
      <h3 class="text-xl font-bold mb-4">1. dados pessoais</h3>
      <div class="flex gap-4 mb-4">
        <button
          {...usePartialSection({ props: { pessoaJuridica: false } })}
          class={`px-4 py-3 w-full md:w-fit md:px-8 border rounded-[30px] text-base ${
            !pessoaJuridica ? "bg-[#B4B4B4]" : ""
          }`}
        >
          Pessoa Física
        </button>
        <button
          {...usePartialSection({ props: { pessoaJuridica: true } })}
          class={`px-4 py-3 w-full md:w-fit md:px-8 border rounded-[30px] text-base ${
            pessoaJuridica ? "bg-[#B4B4B4]" : ""
          }`}
        >
          Pessoa Juridica
        </button>
      </div>
      <SouArtistaFormIsland pessoaJuridica={pessoaJuridica} />
    </div>
  );
};

export default SouArtistaForm;
