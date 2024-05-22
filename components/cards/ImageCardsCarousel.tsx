import { ImageWidget } from "apps/admin/widgets.ts";
import Card, { Props as CardProps } from "../../components/cards/ImageCard.tsx";
import Carousel, { Props as CarouselProps } from "../layout/Carousel.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  placeholderItems?: number;
  items?: CardProps[];
  slider?: CarouselProps;
  sliderTitle?: string;

  sliderReadMore?: {
    url?: string;
    text?: string;
    icon?: ImageWidget;
  };
}

export default function Section({
  placeholderItems,
  items,
  sliderTitle,
  sliderReadMore,
  slider,
}: Props) {
  const ITEMS: CardProps[] = new Array(placeholderItems || 10).fill({});
  const allItems = !items || items?.length === 0 ? ITEMS : items;

  return (
    <div class="py-6">
      <div class="max-w-deskContainer m-auto flex items-center justify-between">
        {sliderTitle && (
          <h2 class="font-bold text-[32px] text-blackPrimary">{sliderTitle}</h2>
        )}
        {sliderReadMore?.text && (
          <div class="flex items-center justify-end gap-2">
            <a
              href={sliderReadMore.url || "#"}
              class="text-blackPrimary text-base underline"
            >
              {sliderReadMore.text}
            </a>
            {sliderReadMore?.icon && (
              <Image
                src={sliderReadMore.icon}
                width={12}
                height={7}
                alt="icone ver mais"
              />
            )}
          </div>
        )}
      </div>
      <Carousel
        layout={{ itemWidth: 200 }}
        {...slider}
        children={allItems.map((item) => <Card {...item} />)}
      />
    </div>
  );
}
