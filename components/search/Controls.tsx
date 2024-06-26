import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Filters from "../../components/search/Filters.tsx";
import Sort from "../../components/search/Sort.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Carousel from "../layout/Carousel.tsx";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden w-[300px]">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} sortOptions={sortOptions} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between lg:p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] sm:border-b sm:border-base-200">
        <div class="hidden flex-row items-center sm:p-0 lg:flex">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>

        <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none w-full lg:w-fit">
          <Button
            class={`w-full px-4 block lg:hidden py-2 border-y border-x-0 border-[#d9d9d9] ${
              displayFilter ? "btn-ghost" : "btn-ghost"
            }`}
            onClick={() => {
              open.value = true;
            }}
          >
            <Carousel
              layout={{
                hide: { controls: true, indicators: true },
                gap: { mobile: "4" },
              }}
              children={[
                ...filters.map((item) => (
                  <div class="flex justify-center items-center gap-2 uppercase text-sm text-[#3c3c3b]">
                    {item.label}
                    <svg
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.24061 6.18369C5.84375 6.62111 5.15625 6.62111 4.75939 6.18369L2.25374 3.42193C1.67073 2.77933 2.12669 1.75 2.99436 1.75L8.00564 1.75C8.87331 1.75 9.32927 2.77933 8.74625 3.42193L6.24061 6.18369Z"
                        fill="#3C3C3B"
                      />
                    </svg>
                  </div>
                )),
                <div class="flex justify-center items-center gap-2 uppercase text-sm text-[#3c3c3b]">
                  ORDERNAR POR
                  <svg
                    width="11"
                    height="10"
                    viewBox="0 0 11 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.24061 6.18369C5.84375 6.62111 5.15625 6.62111 4.75939 6.18369L2.25374 3.42193C1.67073 2.77933 2.12669 1.75 2.99436 1.75L8.00564 1.75C8.87331 1.75 9.32927 2.77933 8.74625 3.42193L6.24061 6.18369Z"
                      fill="#3C3C3B"
                    />
                  </svg>
                </div>,
              ]}
            />
          </Button>
          <div class="hidden lg:block">
            {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
