import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
// import Icon from "../../../components/ui/Icon.tsx";
import Slider from "../../../components/ui/Slider.tsx";
// import ProductImageZoom from "../../../islands/ProductImageZoom.tsx";
import { useId } from "../../../sdk/useId.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout?: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout,
  } = props;

  const { width, height } = layout || { width: 300, height: 370 };

  // const aspectRatio = `${width} / ${height}`;

  return (
    <div
      id={id}
      class="flex lg:flex-[1] lg:max-w-[585px] px-4 lg:p-0 flex-row lg:flex-row-reverse lg:justify-end relative border-y lg:border-none border-[#8c8b8b] py-4 lg:py-0 shadow-[0_0_10px_0px_#00000040] lg:shadow-none"
    >
      {/* Image Slider */}
      <div class="lg:max-w-[470px] max-w-[600px] w-full h-fit sticky top-40">
        <Slider class="carousel carousel-center gap-6 w-full">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full"
            >
              <Image
                class="w-full"
                sizes="(max-width: 640px) 100vw, 40vw"
                // style={{ aspectRatio }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      {/* Dots */}
      <ul class="carousel carousel-center gap-1 p-0 ml-4 lg:mr-4 lg:ml-0 lg:max-w-[83px] h-fit sticky top-40">
        {images.map((img, index) => (
          <li class="carousel-item w-full">
            <Slider.Dot index={index}>
              <Image
                // style={{ aspectRatio }}
                class="group-disabled:border-base-300 border rounded "
                width={100}
                height={123}
                src={img.url!}
                alt={img.alternateName}
              />
            </Slider.Dot>
          </li>
        ))}
      </ul>

      <Slider.JS rootId={id} />
    </div>
  );
}
