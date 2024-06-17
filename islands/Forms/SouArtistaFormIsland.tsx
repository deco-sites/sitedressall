// deno-lint-ignore-file no-explicit-any
// import InputFile from "../InputFile.tsx"
import type { JSX } from "preact";
import { useRef } from 'preact/hooks';
import { invoke } from "../../runtime.ts";


interface SouArtistaFormProps {
    pessoaJuridica?: boolean
}

const SouArtistaFormIsland = ({ pessoaJuridica=false }: SouArtistaFormProps) => {
    const formRef = useRef(null);

    const handleSubmit = async (e: JSX.TargetedSubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(formRef.current as any);
        const data: any = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        const fields = Object.entries(data).map(([key, value]) => {
            if (key === 'data_de_nascimento') {
                // Converter a data para o formato YYYY-MM-DD
                const [dia, mes, ano] = (value as string).split('/');
                value = `${ano}-${mes}-${dia}`;
            }
            if (key === 'portfolio' && typeof value === 'object') {
                // Certificar-se de que o portfolio é uma string válida de referência a um arquivo
                value = JSON.stringify(value);  // Ajuste conforme necessário para atender ao formato esperado pelo backend
            }
            return { key, value };
        });

        const result = await invoke.site.actions.postArtistaMetaObject({fields})

        const resultEmail = await invoke.site.actions.getArtistaMetaObject({handle: 'cleyton.mendes@wedigi.com.br'})

        console.log(result, resultEmail, 'ressssssssssssult')
    };
    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            {!pessoaJuridica &&
                (
                    <div>
                        <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="nome">
                                    nome
                                </label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    required
                                    placeholder="digite seu nome"
                                />
                            </div>
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="sobrenome">
                                    sobrenome
                                </label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="sobrenome"
                                    id="sobrenome"
                                    required
                                    placeholder="digite seu sobrenome"
                                />
                            </div>
                        </div>
                        <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="cpf">cpf</label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="cpf"
                                    id="cpf"
                                    required
                                    placeholder="ex: 999.999.999-99"
                                />
                            </div>
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="data_de_nascimento">
                                    data de nascimento
                                </label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="data_de_nascimento"
                                    id="data_de_nascimento"
                                    placeholder="ex: 99/99/9999"
                                />
                            </div>
                        </div>
                        <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="email">e-mail</label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="ex: contato@dressframe.com.br"
                                />
                            </div>
                        </div>
                        <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="telefone">
                                    telefone
                                </label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="telefone"
                                    id="telefone"
                                    placeholder="ex: 99 99999-9999"
                                />
                            </div>
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="nome_artistico">
                                    nome artístico
                                </label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="nome_artistico"
                                    id="nome_artistico"
                                    placeholder="digite seu nome artístico"
                                />
                            </div>
                        </div>
                        <div class="flex gap-4 mb-4">
                            <div class="flex flex-1">
                                <input type="checkbox" name="ofertas_email" id="ofertas_email" />
                                <label htmlFor="ofertas_email">desejo receber ofertas por e-mail</label>
                            </div>
                        </div>
                    </div>
                )}
            {pessoaJuridica &&
                (
                    <div>
                        <div class="flex flex-col lg:flex-row gap-4 mb-4">
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="razao_social">
                                    Razão Social
                                </label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="razao_social"
                                    id="razao_social"
                                    placeholder="digite sua razão social"
                                    required
                                />
                            </div>
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="cnpj">CNPJ</label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="cnpj"
                                    id="cnpj"
                                    placeholder="digite seu CNPJ"
                                    required
                                />
                            </div>
                        </div>
                        <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="inscricao_estadual">
                                    Inscrição Estadual
                                </label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="inscricao_estadual"
                                    id="inscricao_estadual"
                                    placeholder="digite sua inscrição estadual"
                                />
                            </div>
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="inscricao_municipal">
                                    Inscrição Municipal
                                </label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="inscricao_municipal"
                                    id="inscricao_municipal"
                                    placeholder="digite sua inscrição municipal"
                                />
                            </div>
                        </div>
                        <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="email">e-mail</label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="ex: contato@dressframe.com.br"
                                    required
                                />
                            </div>
                        </div>
                        <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="telefone">
                                    telefone
                                </label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="telefone"
                                    id="telefone"
                                    placeholder="ex: 99 99999-9999"
                                />
                            </div>
                            <div class="flex flex-col flex-1">
                                <label class="text-base block mb-2" htmlFor="nome_artistico">
                                    nome artístico
                                </label>
                                <input
                                    class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                                    type="text"
                                    name="nome_artistico"
                                    id="nome_artistico"
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
                        <label class="text-base block mb-2" htmlFor="cep">cep</label>
                        <input
                            class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                            type="text"
                            name="cep"
                            id="cep"
                            placeholder="ex: 99999-999"
                            required
                        />
                    </div>
                </div>
                <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                    <div class="flex flex-col flex-1">
                        <label class="text-base block mb-2" htmlFor="rua">rua</label>
                        <input
                            class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                            type="text"
                            name="rua"
                            id="rua"
                            placeholder="digite o nome da sua rua"
                            required
                        />
                    </div>
                    <div class="flex flex-col flex-1">
                        <label class="text-base block mb-2" htmlFor="numero">número</label>
                        <input
                            class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                            type="text"
                            name="numero"
                            id="numero"
                            placeholder="digite o número da residência"
                            required
                        />
                    </div>
                </div>
                <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                    <div class="flex flex-col flex-1">
                        <label class="text-base block mb-2" htmlFor="complemento">complemento</label>
                        <input
                            class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                            type="text"
                            name="complemento"
                            id="complemento"
                            placeholder="digite o complemento"
                        />
                    </div>
                    <div class="flex flex-col flex-1">
                        <label class="text-base block mb-2" htmlFor="bairro">bairro</label>
                        <input
                            class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                            type="text"
                            name="bairro"
                            id="bairro"
                            placeholder="digite o nome do bairro"
                        />
                    </div>
                </div>
                <div class="flex gap-4 mb-4 flex-col lg:flex-row">
                    <div class="flex flex-col flex-1">
                        <label class="text-base block mb-2" htmlFor="cidade">cidade</label>
                        <input
                            class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                            type="text"
                            name="cidade"
                            id="cidade"
                            placeholder="digite a cidade"
                        />
                    </div>
                    <div class="flex flex-col flex-1">
                        <label class="text-base block mb-2" htmlFor="estado">estado</label>
                        <input
                            class="border border-[#4F4F4F] rounded-[5px] py-3 px-4"
                            type="text"
                            name="estado"
                            id="estado"
                            placeholder="digite o estado"
                        />
                    </div>
                </div>
            </div>
            {/* <div>
                <h3 class="text-xl font-bold mb-4">2. compartilhe seu portfólio</h3>
                <div>
                    <label htmlFor="portfolio" class="text-base mb-2 block">
                        faça upload do seu portfólio
                    </label>
                    <div class="flex">
                        <InputFile />
                    </div>
                </div>
            </div> */}
            <div class="flex justify-center items-center mt-8">
                <input
                    class="bg-[#FE8330] cursor-pointer rounded-[30px] py-3 px-8 text-white text-xl font-bold"
                    type="submit"
                    value="criar cadastro"
                />
            </div>
        </form>
    )
}

export default SouArtistaFormIsland