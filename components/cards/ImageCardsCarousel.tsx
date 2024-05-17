import Card, { Props as CardProps } from "../../components/cards/ImageCard.tsx";
import Carousel, { Props as CarouselProps } from "../layout/Carousel.tsx";

export interface Props {
  placeholderItems?: number;
  items?: CardProps[];
  slider?: CarouselProps;
  sliderTitle?: string;
}

export default function Section({
  placeholderItems,
  items,
  sliderTitle,
  slider,
}: Props) {
  const ITEMS: CardProps[] = new Array(placeholderItems || 10).fill({});
  const allItems = !items || items?.length === 0 ? ITEMS : items;

  return (
    <div class="py-6">
      {sliderTitle && <h2>{sliderTitle}</h2>}
      <Carousel
        layout={{ itemWidth: 200 }}
        {...slider}
        children={allItems.map((item) => (
          <Card {...item} />
        ))}
      />
    </div>
  );
}
