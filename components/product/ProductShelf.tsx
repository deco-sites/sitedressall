import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductCard from "../../components/product/ProductCard.tsx";
// import Icon from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
    showDots?: boolean;
  };
}

function ProductShelf({ products, title, description, layout }: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };
  return (
    <div class="w-full container py-8 px-4 flex flex-col gap-6 lg:py-10">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class={clx(
          "px-0 container flex flex-col relative",
        )}
      >
        <Slider class="carousel carousel-center sm:carousel-end sm:gap-1 row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={clx(
                "carousel-item",
                slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                slideMobile[layout?.numberOfSliders?.mobile ?? 1],
              )}
            >
              <ProductCard
                product={product}
                itemListName={title}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        {
          /* {layout?.showArrows && (
          <>
            <div class="block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="w-12 h-12 flex justify-center items-center">
                <Icon size={24} id="ChevronLeft" strokeWidth={3} class="w-5" />
              </Slider.PrevButton>
            </div>
            <div class="block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="w-12 h-12 flex justify-center items-center">
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
        )} */
        }
        {layout?.showDots && (
          <div class="flex justify-center items-center gap-4">
            {layout?.showArrows && (
              <>
                <div class="block z-10 col-start-1 row-start-3">
                  <Slider.PrevButton class="w-6 h-6 flex justify-center items-center">
                    <svg
                      class="pointer-events-none"
                      width="7"
                      height="14"
                      viewBox="0 0 7 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.5 13L0.5 7L6.5 1"
                        stroke="black"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Slider.PrevButton>
                </div>
              </>
            )}
            <ul class="flex items-end justify-center gap-2 dots-container">
              {products?.map((_, index) => (
                <li class="">
                  <Slider.Dot index={index}>
                    {index + 1}
                    {index === products.length - 1
                      ? null
                      : <span class="ml-2 text-blackPrimary font-bold">|</span>}
                  </Slider.Dot>
                </li>
              ))}
            </ul>
            {layout?.showArrows && (
              <>
                <div class="block z-10 col-start-3 row-start-3">
                  <Slider.NextButton class="w-6 h-6 flex justify-center items-center">
                    <svg
                      class="pointer-events-none"
                      width="7"
                      height="14"
                      viewBox="0 0 7 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.5 13L6.5 7L0.5 1"
                        stroke="black"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Slider.NextButton>
                </div>
              </>
            )}
          </div>
        )}

        <Slider.JS rootId={id} scroll="smooth" infinite />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...useOffer(product.offers),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductShelf;
