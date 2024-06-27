import { SendEventOnView } from "../../components/Analytics.tsx";
// import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "../../islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "../../islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "../../islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "../../islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "../../islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "../../islands/OutOfStock.tsx";
import ShippingSimulation from "../../islands/ShippingSimulation.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import ShareProductButton from "../../islands/ShareButton.tsx";
import { Returns } from "../../loaders/ParcelamentoConfig.tsx";
import Icon from "../../components/ui/Icon.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout?: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
  title?: string;
  ctaText?: string;
  cta?: string;
  installmentsConfig?: Returns;
}

function ProductInfo(
  { page, layout, title, cta, ctaText, installmentsConfig }: Props,
) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const maxInstallments = installmentsConfig?.maxInstallment;
  const minValue = installmentsConfig?.minValue;
  let installments = maxInstallments;

  if (minValue && minValue > 0 && maxInstallments) {
    const calculatedInstallments = Math.ceil(price / minValue);
    installments = calculatedInstallments > maxInstallments
      ? maxInstallments
      : calculatedInstallments;
  }

  const installmentValue = installments ? price / installments : false;

  return (
    <div class="flex flex-col w-full lg:flex-[1]" id={id}>
      {/* <Breadcrumb itemListElement={breadcrumb.itemListElement} /> */}
      {/* Code and name */}
      <div class="flex items-center lg:items-start justify-between md:mt-0 mt-8">
        {
          /* <div>
          {gtin && <span class="text-sm text-base-300">Cod. {gtin}</span>}
        </div> */
        }
        <h1 class="text-2xl uppercase text-[#3c3c3b]">
          {layout?.name === "concat"
            ? `${isVariantOf?.name} ${name}`
            : layout?.name === "productGroup"
            ? isVariantOf?.name
            : name}
        </h1>
        <div class="flex items-center justify-end gap-4">
          <ShareProductButton productName={name} />
          <button>
            <Icon id="Wishlist" strokeWidth={1} size={44} />
          </button>
        </div>
      </div>

      {/* Sku Selector */}
      <div class="md:mt-10 mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Prices */}
      <div class="mt-14 flex items-center justify-center gap-24 border-t border-[#B4B4B4] pt-6">
        <div class="flex flex-row gap-2 items-center w-full">
          {
            /* {(listPrice ?? 0) > price && (
            <span class="line-through text-base-300 text-xs">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )} */
          }
          <span class="text-4xl text-blackPrimary font-bold flex-[1] text-center">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
          {installmentsConfig?.showInstallments && !!installments &&
            !!installmentValue &&
            (
              <span class="text-[#8c8b8b] text-xl font-light flex-[1] text-center">
                {installments}x de {formatPrice(installmentValue)} sem juros
              </span>
            )}
        </div>
        {
          /* {installmentsConfig?.showInstallments && (
          <span class="text-[#8C8B8B] font-light text-xl">
            {`x sem juros`}
          </span>
        )} */
        }
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                  />
                  <WishlistButtonVtex
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "wake" && (
                <>
                  <AddToCartButtonWake
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                  />
                  <WishlistButtonWake
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  productGroupID={productGroupID}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "nuvemshop" && (
                <AddToCartButtonNuvemshop
                  productGroupID={productGroupID}
                  eventParams={{ items: [eventItem] }}
                  additionalProperty={additionalProperty}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[
              {
                id: Number(product.sku),
                quantity: 1,
                seller: seller,
              },
            ]}
          />
        )}
      </div>
      {/* Contact Us */}
      {cta &&
        (
          <div class="bg-[#F1F1F1] rounded-[20px] w-full text-center py-4">
            <p class="text-xl text-blackPrimary mb-2.5">
              {title ?? "não encontrou o tamanho desejado?"}
            </p>
            <a
              href={cta}
              class="bg-white rounded-full font-bold border border-[#B4B4B4] px-4 py-2"
            >
              {ctaText ?? "entre em contato conosco"}
            </a>
          </div>
        )}
      {/* Description card */}
      <div class="md:mt-8 mt-6 px-4 py-5 border-t border-b border-[#B4B4B4] font-bold text-blackPrimary text-[15px]">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="flex items-center justify-between cursor-pointer font-bold text-xl text-blackPrimary marker:content-[''] after:content-['+']">
                detalhes do produto
              </summary>
              <div
                class="ml-2 mt-2 font-normal"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
          )}
        </span>
      </div>
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
