import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        "flex flex-col gap-4 p-12 border-t border-b border-gray-700 max-1023:p-4",
        tiled &&
          "lg:flex-col lg:w-full lg:justify-between p-12 border-t border-b border-gray-700 max-1023:p-4",
      )}
    >
      <div class="flex flex-col gap-4">
        {content?.title && (
          <h4 class={tiled ? "font-bold text-3xl leading-9" : "text-lg"}>
            {content?.title}
          </h4>
        )}
        {content?.description && (
          <div class="text-base font-normal">{content?.description}</div>
        )}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="form-control gap-4"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-4 max-1023:flex max-1023:flex-col">
            <input
              name="email"
              class=" flex-auto input rounded-3xl border-slate-600"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <input
              name="name"
              class=" flex-auto input rounded-3xl border-slate-600"
              placeholder={content?.form?.placeholder || "Digite seu nome"}
            />
            <button
              type="submit"
              class=" btn disabled:loading rounded-3xl bg-gray-300 text-white w-1/5 text-xl hover:bg-orange-500 max-1023:w-full"
              disabled={loading}
            >
              {content?.form?.buttonText || "me inscrever"}
            </button>
          </div>
          <div class="flex gap-2">
            <input type="checkbox" />
            <span class="max-768:text-xs text-base">
              Preciso de ajuda para escolher e comprar
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
