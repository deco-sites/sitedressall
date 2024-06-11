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

      <div class="group flex flex-col gap-2 px-2 py-[11px] bg-[#F8F8F8] hover:bg-slate-50 hover:shadow-slate-600/40 hover:shadow-lg">
        <div class="relative">
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
          {
            <div class="z-[-1] w-full flex gap-2 items-center font-light absolute bottom-0 group-hover:bg-slate-50 group-hover:z-[5]">
              {
                /* <span class="line-through text-sm">
              A PARTIR DE {formatPrice(listPrice, offers?.priceCurrency)}
            </span> */
              }
              <span>
                A PARTIR DE {formatPrice(price, offers?.priceCurrency)}
              </span>
            </div>
          }
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
