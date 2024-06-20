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
  banners?: Banner[]
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
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
  banners
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
  const searchBanner = banners?.find(({ search }) => search && url.search.includes(`?q=${search}`));
  const defaultBanner = banners?.find(({ search }) => !search);
  const banner = searchBanner || defaultBanner || null;

  return (
    <>
      <div class="max-w-[1440px] mx-auto px-4 sm:py-10">
        <div class="flex lg:hidden">
          <Breadcrumb itemListElement={breadcrumb.itemListElement}/>
        </div>
        <div>
          <BannerSearch banner={banner}/>
        </div>
        {(isFirstPage || !isPartial) && (
          <SearchControls
            sortOptions={sortOptions}
            filters={filters}
            breadcrumb={breadcrumb}
            displayFilter={layout?.variant === "drawer"}
          />
        )}

        <div class="flex flex-row">
          {layout?.variant === "aside" &&
            filters.length > 0 &&
            (isFirstPage || !isPartial) && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow" id={id}>
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
