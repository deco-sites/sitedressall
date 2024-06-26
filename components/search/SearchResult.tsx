import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import SearchControls from "../../islands/SearchControls.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import BannerSearch from "./BannerSearch.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import Carousel, { Props as CarouselProps } from "../layout/Carousel.tsx";
import RoundedImageCard, {
  Props as RoundedImageCardProps,
} from "./RoundedImageCard.tsx";

export type Format = "Show More" | "Pagination";

export interface Banner {
  /** @title Busca */
  /** @description Texto da busca, ex: Caso queira que o banner exiba quando for busca 'masculino' digite masculino neste campo e toda busca onde houver esse mesmo texto o banner aparecerá. Caso não hovuer nenhum texto esse banner exibirá em toda busca  */
  search?: string;
  /** @title Título */
  /** @description Título a ser exibido ao lado do banner */
  title?: string;
  /** @title Subtítulo / Paragrafo */
  /** @description Texto a ser exibido ao lado do banner */
  /** @format rich-text*/
  subtitle?: string;
  image: {
    /** @description Imagem para Desktop */
    desktop: ImageWidget;
    /** @description Imagem para Mobile */
    mobile: ImageWidget;
    /** @description Texto alternativo da imagem */
    alt?: string;
  };
}

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  banners?: Banner[];
  sliders?: CarouselProps;
  items?: RoundedImageCardProps[];
  placeholderItems?: number;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  /** @hide */
  displayFiltersDesk?: boolean;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  startingPage = 0,
  url: _url,
  banners,
  items,
  sliders,
  placeholderItems,
  displayFiltersDesk = true,
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  url: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const url = new URL(_url);
  const { format = "Show More" } = layout ?? {};
  const id = useId();
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const isPartial = url.searchParams.get("partial") === "true";
  const isFirstPage = !pageInfo.previousPage;
  const searchBanner = banners?.find(({ search }) =>
    search && url.search.includes(`?q=${search}`)
  );
  const defaultBanner = banners?.find(({ search }) => !search);
  const banner = searchBanner || defaultBanner || null;
  const ITEMS: RoundedImageCardProps[] = new Array(placeholderItems || 10).fill(
    {},
  );
  const allItems = !items || items?.length === 0 ? ITEMS : items;

  return (
    <>
      <div class="sm:py-10">
        <div class="flex lg:hidden px-4">
          <Breadcrumb itemListElement={breadcrumb.itemListElement} />
        </div>
        <div class="">
          <BannerSearch banner={banner} />
        </div>
        <div class="lg:mt-5 block lg:flex lg:px-4 max-w-[1440px] mx-auto">
          <div class="mb-8 block lg:hidden px-4">
            <div>
              <h3 class="font-bold text-base text-[#3c3c3b] mb-4">
                CATEGORIAS EM DESTAQUE
              </h3>
            </div>
            <Carousel
              layout={{ itemWidth: 115 }}
              {...sliders}
              children={allItems.map((item) => (
                <RoundedImageCard
                  {...item}
                />
              ))}
            />
          </div>
          <div class="hidden lg:flex justify-center items-center">
            <button
              class="px-4 border-[#3c3c3b] border h-[40px] justify-center items-center hidden lg:flex mr-10 gap-4"
              {...usePartialSection({
                props: { displayFiltersDesk: !displayFiltersDesk },
              })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="z-[-1]"
              >
                <path
                  d="M3 7H6"
                  stroke="#3C3C3B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 17H9"
                  stroke="#3C3C3B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 17H21"
                  stroke="#3C3C3B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 7H21"
                  stroke="#3C3C3B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z"
                  stroke="#3C3C3B"
                  stroke-width="1.5"
                />
                <path
                  d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z"
                  stroke="#3C3C3B"
                  stroke-width="1.5"
                />
              </svg>
              FILTROS
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="z-[-1]"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#3C3C3B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          {(isFirstPage || !isPartial) && (
            <SearchControls
              sortOptions={sortOptions}
              filters={filters}
              breadcrumb={breadcrumb}
              displayFilter={layout?.variant === "drawer"}
            />
          )}
        </div>

        <div class="flex flex-row lg:justify-between max-w-[1440px] mx-auto">
          {layout?.variant === "aside" &&
            filters.length > 0 &&
            (isFirstPage || !isPartial) && (
            <aside
              class={`hidden lg:block transition-all ease-in-out ${
                displayFiltersDesk ? "w-full" : "w-0"
              } max-w-[205px] overflow-hidden`}
            >
              <Filters filters={filters} />
            </aside>
          )}
          <div
            class={`flex-grow transition-all ease-in-out pt-4 ${
              displayFiltersDesk ? "lg-new:max-w-[80vw] max-w-[1024px]" : "max-w-[1440px]"
            } w-full px-4`}
            id={id}
          >
            <div class="mb-4 lg:mb-8 hidden lg:block">
              <div>
                <h3 class="font-bold text-base text-[#3c3c3b] mb-4">
                  CATEGORIAS EM DESTAQUE
                </h3>
              </div>
              <Carousel
                layout={{ itemWidth: 115 }}
                {...sliders}
                children={allItems.map((item) => (
                  <RoundedImageCard
                    {...item}
                  />
                ))}
              />
            </div>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ columns: layout?.columns, format }}
              pageInfo={pageInfo}
              url={url}
            />
          </div>
        </div>

        {format == "Pagination" && (
          <div class="flex justify-center my-4">
            <div class="join flex items-center justify-center">
              <a
                aria-label="previous page link"
                rel="prev"
                href={pageInfo.previousPage ?? "#"}
                class="mr-6"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={1} />
              </a>
              <div class="flex items-center justify-center gap-4">
                {pageInfo.previousPage
                  ? (
                    <>
                      <span class="text-base font-light text-blackPrimary">
                        {zeroIndexedOffsetPage}
                      </span>
                      <span class="text-base font-light text-blackPrimary">
                        |
                      </span>
                    </>
                  )
                  : (
                    ""
                  )}

                <span class="underline">{zeroIndexedOffsetPage + 1}</span>

                {pageInfo.nextPage
                  ? (
                    <>
                      <span class="text-base font-light text-blackPrimary">
                        |
                      </span>
                      <span class="text-base font-light text-blackPrimary">
                        {zeroIndexedOffsetPage + 2}
                      </span>
                    </>
                  )
                  : (
                    ""
                  )}
              </div>
              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? "#"}
                class="ml-6 rotate-180"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={1} />
              </a>
            </div>
          </div>
        )}
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...useOffer(product.offers),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: ReturnType<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};

export default SearchResult;
