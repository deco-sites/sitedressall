import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
// import Avatar from "../../components/ui/Avatar.tsx";
// import {
//   default as WishlistButtonVtex,
//   default as WishlistButtonWake,
// } from "../../islands/WishlistButton/vtex.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
// import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
}

const WIDTH = 304;
const HEIGHT = 367;

function ProductCard({
  product,
  preload,
  itemListName,
  // platform,
  index,
}: Props) {
  const { url, productID, image: images, name, offers } = product;
  const id = `product-card-${productID}`;
  // const hasVariant = isVariantOf?.hasVariant ?? [];
  // const productGroupID = isVariantOf?.productGroupID;
  // const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { price } = useOffer(offers);
  // const possibilities = useVariantPossibilities(hasVariant, product);
  // const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  return (
    <div
      id={id}
      data-deco="view-product"
      class="card card-compact group w-full lg:border lg:border-transparent lg:p-4"
    >
      {/* Add click event to dataLayer */}
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                // price,
                // listPrice,
                index,
              }),
            ],
          },
        }}
      />

      <div class="group flex flex-col gap-2 p-2 bg-[#F8F8F8] hover:bg-slate-50 hover:shadow-slate-600/40 hover:shadow-lg">
        <div class="relative">
          <button class="wishlist z-[1] flex justify-center items-center w-8 h-8 rounded-full bg-white absolute top-1 right-1 lg:hidden">
            <svg
              class="pointer-events-none"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7573 2.62677C14.3858 2.25513 13.9448 1.96033 13.4594 1.75919C12.974 1.55805 12.4537 1.45453 11.9282 1.45453C11.4028 1.45453 10.8825 1.55805 10.397 1.75919C9.91162 1.96033 9.47058 2.25513 9.09912 2.62677L8.32821 3.39767L7.5573 2.62677C6.80698 1.87644 5.78933 1.45492 4.72821 1.45492C3.6671 1.45492 2.64944 1.87644 1.89912 2.62677C1.1488 3.37709 0.727272 4.39474 0.727272 5.45586C0.727272 6.51697 1.1488 7.53463 1.89912 8.28495L2.67003 9.05586L8.32821 14.714L13.9864 9.05586L14.7573 8.28495C15.1289 7.91349 15.4237 7.47245 15.6249 6.98702C15.826 6.5016 15.9295 5.9813 15.9295 5.45586C15.9295 4.93041 15.826 4.41011 15.6249 3.92469C15.4237 3.43926 15.1289 2.99822 14.7573 2.62677Z"
                stroke="#3C3C3B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          {/* Name/Description */}
          <div class="flex flex-col absolute w-full group-hover:bg-slate-50 group-hover:z-[5]">
            <h2
              class="truncate text-base lg:text-lg uppercase"
              dangerouslySetInnerHTML={{ __html: name ?? "" }}
            />

            {
              /* <div
            class="truncate text-xs"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          /> */
            }
          </div>
          <figure class="relative overflow-hidden" style={{ aspectRatio }}>
            {/* Wishlist button */}
            <div
              class={clx(
                "absolute top-0 left-0",
                "z-10 w-full",
                "flex items-center justify-end",
              )}
            >
              {/* Discount % */}
              {
                /* <div class="text-sm px-3">
              <span class="font-bold">
                {listPrice && price
                  ? `${Math.round(((listPrice - price) / listPrice) * 100)}% `
                  : ""}
              </span>
              OFF
            </div> */
              }
              {
                /* <div class="lg:group-hover:block">
              {platform === "vtex" && (
                <WishlistButtonVtex
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
              {platform === "wake" && (
                <WishlistButtonWake
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
            </div> */
              }
            </div>

            {/* Product Images */}
            <a
              href={relativeUrl}
              aria-label="view product"
              class={clx(
                "absolute top-0 left-0",
                "grid grid-cols-1 grid-rows-1",
                "w-full",
              )}
            >
              <Image
                src={front.url!}
                alt={front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                style={{ aspectRatio }}
                class={clx(
                  "bg-base-100",
                  "object-cover",
                  "rounded w-full",
                  "col-span-full row-span-full",
                )}
                sizes="(max-width: 640px) 50vw, 20vw"
                preload={preload}
                loading={preload ? "eager" : "lazy"}
                decoding="async"
              />
              <Image
                src={back?.url ?? front.url!}
                alt={back?.alternateName ?? front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                style={{ aspectRatio }}
                class={clx(
                  "bg-base-100",
                  "object-cover",
                  "rounded w-full",
                  "col-span-full row-span-full",
                  "transition-opacity opacity-0",
                )}
                sizes="(max-width: 640px) 50vw, 20vw"
                loading="lazy"
                decoding="async"
              />
            </a>
          </figure>
          {/* Price from/to */}

          <div class="z-[-1] w-full flex justify-between items-center font-light absolute bottom-0 group-hover:bg-slate-50 group-hover:z-[5]">
            <span class="text-sm text-black hidden lg:block">
              A PARTIR DE {formatPrice(price, offers?.priceCurrency)}
            </span>
            <button class="wishlist z-[1] hidden justify-center items-center w-8 h-8 rounded-full bg-transparent lg:flex">
              <svg
                class="pointer-events-none"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.7573 2.62677C14.3858 2.25513 13.9448 1.96033 13.4594 1.75919C12.974 1.55805 12.4537 1.45453 11.9282 1.45453C11.4028 1.45453 10.8825 1.55805 10.397 1.75919C9.91162 1.96033 9.47058 2.25513 9.09912 2.62677L8.32821 3.39767L7.5573 2.62677C6.80698 1.87644 5.78933 1.45492 4.72821 1.45492C3.6671 1.45492 2.64944 1.87644 1.89912 2.62677C1.1488 3.37709 0.727272 4.39474 0.727272 5.45586C0.727272 6.51697 1.1488 7.53463 1.89912 8.28495L2.67003 9.05586L8.32821 14.714L13.9864 9.05586L14.7573 8.28495C15.1289 7.91349 15.4237 7.47245 15.6249 6.98702C15.826 6.5016 15.9295 5.9813 15.9295 5.45586C15.9295 4.93041 15.826 4.41011 15.6249 3.92469C15.4237 3.43926 15.1289 2.99822 14.7573 2.62677Z"
                  stroke="#3C3C3B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div class="flex flex-col w-full lg:hidden">
            <h2
              class="uppercase pt-2 text-xs"
              dangerouslySetInnerHTML={{ __html: name ?? "" }}
            />
          </div>

          <span class="block lg:hidden text-[#8c8b8b] text-xs pt-1">
            A partir de{" "}
            <span class="text-black">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </span>
        </div>

        {/* SKU Selector */}
        {
          /* <ul class="flex items-center justify-center gap-2">
          {variants
            .map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link}>
                  <Avatar
                    content={value}
                    variant={link === relativeUrl
                      ? "active"
                      : link
                      ? "default"
                      : "disabled"}
                  />
                </a>
              </li>
            ))}
        </ul> */
        }

        {/* Installments */}
        {
          /* <span class="flex justify-end gap-2 font-light text-sm truncate">
          ou {installments}
        </span> */
        }

        {
          /* <a
          href={relativeUrl}
          aria-label="view product"
          class="btn btn-block"
        >
          Ver produto
        </a> */
        }
      </div>
    </div>
  );
}

export default ProductCard;
