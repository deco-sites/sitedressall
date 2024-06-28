import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery/ImageSlider.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import { Returns } from "../../loaders/ParcelamentoConfig.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  /** @title Imagem Modal de Tamanhos para Desktop */
  imageModalDesk?: ImageWidget;
  /** @title Imagem Modal de Tamanhos para Mobile */
  imageModalMob?: ImageWidget;
  /** @title Configuração de parcelamento (somente exibição na loja) */
  installments?: Returns;
  /** @title Título - Entre em contato */
  title?: string;
  /** @title Texto - Entre em contato */
  ctaText?: string;
  /** @title Link - Entre em contato */
  cta?: string;
}

export default function ProductDetails(
  { page, cta, ctaText, title, installments, imageModalDesk, imageModalMob }:
    Props,
) {
  if (!page?.seo) {
    return <NotFound />;
  }
  const { breadcrumbList } = page;
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement,
    numberOfItems: breadcrumbList.numberOfItems,
  };

  return (
    <div class="w-full max-w-[1440px] mx-auto py-8 flex flex-col gap-6 lg:pb-10 lg:px-8">
      <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      <div class="flex flex-col lg:flex-row lg:justify-between">
        <ImageGallerySlider page={page} />
        <ProductInfo
          page={page}
          installmentsConfig={installments}
          cta={cta}
          ctaText={ctaText}
          title={title}
          imageModalDesk={imageModalDesk}
          imageModalMob={imageModalMob}
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
