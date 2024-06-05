import { HTMLWidget } from "apps/admin/widgets.ts";

/**
 * @title {{{type}}}
 */

interface Option {
  /** @title Tipo do Texto */
  type: "Título" | "Paragrafo";
  /** @title Texto */
  text: HTMLWidget;
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
                class={`font-bold text-xl mb-4 lg:text-3xl${
                  option.marginTop ? "mt-8" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: option.text }}
              />
            )}
          {option.type === "Paragrafo" &&
            (
              <div
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
