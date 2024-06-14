import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import InputFile from "../../islands/InputFile.tsx";

interface SouArtistaFormProps {
  /** @hide */
  pessoaJuridica?: boolean;
}

const SouArtistaForm = ({ pessoaJuridica }: SouArtistaFormProps) => {
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
      <form action="">
        {!pessoaJuridica &&
          (
            <div>
              <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="name">
                    nome
                  </label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="digite seu nome"
                  />
                </div>
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="lastname">
                    sobrenome
                  </label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="digite seu sobrenome"
                  />
                </div>
              </div>
              <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">cpf</label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="ex: 999.999.999-99"
                  />
                </div>
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">
                    data de nascimento
                  </label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="ex: 99/99/99"
                  />
                </div>
              </div>
              <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">e-mail</label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="ex: contato@dressframe.com.br"
                  />
                </div>
              </div>
              <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">
                    telefone
                  </label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="ex: 99 99999-9999"
                  />
                </div>
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">
                    nome artístico
                  </label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="digite seu nome artístico"
                  />
                </div>
              </div>
              <div class="flex gap-4 mb-4">
                <div class="flex flex-1">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">desejo receber ofertas por e-mail</label>
                </div>
              </div>
            </div>
          )}
        {pessoaJuridica &&
          (
            <div>
              <div class="flex flex-col lg:flex-row gap-4 mb-4">
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">
                    Razão Social
                  </label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="digite sua razão social"
                  />
                </div>
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">CNPJ</label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="digite seu CNPJ"
                  />
                </div>
              </div>
              <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">
                    Inscrição Estadual
                  </label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="digite sua inscrição estadual"
                  />
                </div>
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">
                    Inscrição Municipal
                  </label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="digite sua inscrição municipal"
                  />
                </div>
              </div>
              <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">e-mail</label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="ex: contato@dressframe.com.br"
                  />
                </div>
              </div>
              <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">
                    telefone
                  </label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="ex: 99 99999-9999"
                  />
                </div>
                <div class="flex flex-col flex-1">
                  <label class="text-base block mb-2" htmlFor="">
                    nome artístico
                  </label>
                  <input
                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                    type="text"
                    name=""
                    id=""
                    placeholder="digite seu nome artístico"
                  />
                </div>
              </div>
            </div>
          )}
        <div>
          <h3 class="text-xl font-bold mb-4">2. endereço</h3>
          <div class="flex gap-4 mb-4">
            <div class="flex flex-col flex-1">
              <label class="text-base block mb-2" htmlFor="">cep</label>
              <input
                class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                type="text"
                name=""
                id=""
                placeholder="ex: 99999-999"
              />
            </div>
          </div>
          <div class="flex gap-4 mb-4 flex-col lg:flex-row">
            <div class="flex flex-col flex-1">
              <label class="text-base block mb-2" htmlFor="">rua</label>
              <input
                class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                type="text"
                name=""
                id=""
                placeholder="digite sua razão social"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label class="text-base block mb-2" htmlFor="">número</label>
              <input
                class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                type="text"
                name=""
                id=""
                placeholder="digite seu CNPJ"
              />
            </div>
          </div>
          <div class="flex gap-4 mb-4 flex-col lg:flex-row">
            <div class="flex flex-col flex-1">
              <label class="text-base block mb-2" htmlFor="">complemento</label>
              <input
                class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                type="text"
                name=""
                id=""
                placeholder="digite sua razão social"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label class="text-base block mb-2" htmlFor="">bairro</label>
              <input
                class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                type="text"
                name=""
                id=""
                placeholder="digite seu CNPJ"
              />
            </div>
          </div>
          <div class="flex gap-4 mb-4 flex-col lg:flex-row">
            <div class="flex flex-col flex-1">
              <label class="text-base block mb-2" htmlFor="">cidade</label>
              <input
                class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                type="text"
                name=""
                id=""
                placeholder="digite sua razão social"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label class="text-base block mb-2" htmlFor="">estado</label>
              <input
                class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                type="text"
                name=""
                id=""
                placeholder="digite seu CNPJ"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">2. compartilhe seu portfólio</h3>
          <div>
            <label htmlFor="portfolio" class="text-base mb-2 block">
              faça upload do seu portfólio
            </label>
            <div class="flex">
              <InputFile />
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center mt-8">
          <input
            class="bg-[#FE8330] cursor-pointer rounded-[30px] py-3 px-8 text-white text-xl font-bold"
            type="submit"
            value="criar cadastro"
          />
        </div>
      </form>
    </div>
  );
};

export default SouArtistaForm;
