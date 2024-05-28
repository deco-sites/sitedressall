import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import ImageCardsCarousel, {
  Props as CarouselProps,
} from "../components/cards/ImageCardsCarousel.tsx";

export interface Props {
  items?: Item[];
  /**
   * @hide
   * @readonly
   */
  indexActive?: number;
  titleDiv?: string;
}

/**
 * @titleBy title
 */
interface Item {
  title?: string;
  carousel?: CarouselProps;
}

export default function TabSectionSlider({
  items,
  indexActive,
  titleDiv,
}: Props) {
  const titles: Item[] = items || [];

  const indexToRender = typeof indexActive === "number"
    ? Math.min(Math.max(indexActive, 0), titles.length - 1)
    : 0;

  return (
    <div className="w-full flex flex-col items-start container my-0 mx-auto justify-between items-center max-1024:flex-col max-1024:items-start max-1024:p-4">
      <div className="font-berthold text-3xl font-bold max-w-[355px] max-1024:mb-4">
        {titleDiv}
      </div>
      <div className="flex flex-col ">
        <ul className="flex gap-4 pb-4 flex-wrap">
          {titles.map((el, index: number) => (
            <li key={index}>
              <button
                className={`tab tab-lg text-base font-medium text-center p-0 uppercase ${
                  index === indexToRender ? "tab-active" : ""
                }`}
                {...usePartialSection({ props: { indexActive: index } })}
              >
                {el.title}
              </button>
            </li>
          ))}
        </ul>
        <div>
          {titles[indexToRender]?.carousel && (
            <ImageCardsCarousel {...titles[indexToRender].carousel} />
          )}
        </div>
      </div>
    </div>
  );
}
