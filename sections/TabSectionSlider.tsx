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
    <div className="w-full flex flex-col items-start container pt-8 my-0 max-w-deskContainer m-auto justify-between max-1024:flex-col max-1024:items-start lg:w-90vw sm:w-95vw px-4 md:px-0">
      <div className="font-berthold text-2xl lg:text-3xl font-bold pb-4 max-w-[390px] max-1024:text-2xl">
        {titleDiv}
      </div>
      <div className="flex flex-col ">
        <ul className="flex gap-4 pb-4 max-425:overflow-y-auto max-425:max-w-[340px]">
          {titles.map((el, index: number) => (
            <li key={index}>
              <button
                className={`tab tab-lg text-sm lg:text-base font-medium text-center p-0 uppercase ${
                  index === indexToRender ? "tab-active" : ""
                }`}
                {...usePartialSection({ props: { indexActive: index } })}
              >
                {el.title}
              </button>
            </li>
          ))}
        </ul>

        {titles[indexToRender]?.carousel && (
          <ImageCardsCarousel {...titles[indexToRender].carousel} />
        )}
      </div>
    </div>
  );
}
