import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery/ImageSlider.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  if (!page?.seo) {
    return <NotFound />;
  }
  const { breadcrumbList } = page;
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };
  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:pb-10 md:mt-10">
      <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      <div class="flex flex-col gap-6 lg:flex-row lg:justify-center">
        <ImageGallerySlider
          page={page}
        />
        <ProductInfo
          page={page}
        />
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
