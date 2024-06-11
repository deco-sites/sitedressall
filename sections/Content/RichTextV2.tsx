import { HTMLWidget } from "apps/admin/widgets.ts";

/**
 * @title {{{type}}}
 */

interface Option {
  /** @title Tipo do Texto */
  type: "Título" | "Paragrafo";
  /** @title Texto */
  text: HTMLWidget;
  /** @title Tamanho da fonte */
  /** @description Se não incluido, caso seja título será padrão 24 ou paragrafo padrão 16 */
  size?: number
  /** @title Exibe margem no topo do texto? */
  marginTop?: boolean;
}

interface Props {
  texts: Option[];
}

const RichTextV2 = ({ texts }: Props) => {
  return (
    <div>
      {texts.map((option) => (
        <>
          {option.type === "Título" &&
            (
              <h3
                style={option.size ? {fontSize: `${option.size}px`} : {}}
                class={`font-bold mb-4 text-xl lg:text-3xl`}
                dangerouslySetInnerHTML={{ __html: option.text }}
              />
            )}
          {option.type === "Paragrafo" &&
            (
              <div
                style={option.size ? {fontSize: `${option.size}px`} : {}}
                class={`mb-3 ${option.marginTop ? "mt-3" : ""}`}
                dangerouslySetInnerHTML={{ __html: option.text }}
              />
            )}
        </>
      ))}
    </div>
  );
};

export default RichTextV2;
