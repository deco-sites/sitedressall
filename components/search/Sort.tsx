import { useMemo, useState } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
// import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      globalThis.window.location?.search,
    );
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (value: string) => {
  const urlSearchParams = new URLSearchParams(
    globalThis.window.location.search,
  );

  urlSearchParams.delete(PAGE_QUERY_PARAM);
  urlSearchParams.set(SORT_QUERY_PARAM, value);
  globalThis.window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  // "release:desc": "Relevância - Decrescente",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions }: Props) {
  const [open, setOpen] = useState(false);
  const sort = useSort();

  const optionSelected = sortOptions.map(({ value, label }) => ({
    value,
    label: portugueseMappings[label as keyof typeof portugueseMappings] ??
      label,
  })).filter(({ label }) => label).find((item) => item.value === sort);
  console.log(sortOptions, sort, optionSelected, "options");

  return (
    <button
      class="border border-[#3c3c3b] px-4 h-[40px] relative z-10"
      onClick={() => setOpen(!open)}
    >
      <span htmlFor="sort" class="flex gap-4 uppercase text-sm">
        <div class="flex items-center justify-center">
          Ordenar: {optionSelected?.label}
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="#3C3C3B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <ul
        class={`absolute w-full left-0 top-10 bg-white overflow-hidden border border-t-0 ${
          !open ? "h-0" : ""
        }`}
      >
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }) => (
          <li
            key={value}
            value={value}
            selected={value === sort}
            onClick={() => applySort(value)}
          >
            <span class="text-sm">{label}</span>
          </li>
        ))}
      </ul>
      {
        /* <label htmlFor="sort" class="">Ordenar:</label>
      <select
        id="sort"
        ref={selectRef}
        name="sort"
        onInput={applySort}
        class="w-min h-[36px] px-1 rounded text-base-content cursor-pointer outline-none"
      >
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }) => (
          <option key={value} value={value} selected={value === sort}>
            <span class="text-sm">{label}</span>
          </option>
        ))}
      </select> */
      }
    </button>
  );
}

export default Sort;
