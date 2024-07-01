import { clx } from "../../sdk/clx.ts";

export interface Props {
  title?: string;
  description?: string;
  alignment?: "center" | "left";
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title && (
              <h1
                class={clx(
                  "lg:text-sectionTitle text-2xl font-bold text-blackPrimary leading-8 lg:leading-10",
                )}
              >
                {props.title}
              </h1>
            )}
            {props.description && (
              <h2 class={clx("leading-6 lg:leading-8")}>{props.description}</h2>
            )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
