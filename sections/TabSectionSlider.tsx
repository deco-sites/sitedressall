import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import ImageCardsCarousel, {
  Props as CarouselProps,
} from "./Cards/ImageCardsCarousel.tsx";

export interface Props {
  items?: Item[];
  /**
   * @hide
   * @readonly
   */
  indexActive?: number;
  titleDiv?: string;
  carousel?: CarouselProps;
}

/**
 * @titleBy title
 */
interface Item {
  title?: string;
  /**
   * @format textarea
   */
  slider?: string;
}

export default function TabSectionSlider({
  items,
  indexActive,
  titleDiv,
  carousel,
}: Props) {
  const titles: string[] = [];
  const sliders: string[] = [];

  function getTitles() {
    items?.map((element) => {
      titles.push(element.title);
    });
  }

  function getsliders() {
    items?.map((element) => {
      sliders.push(element.slider);
    });
  }

  getTitles();
  getsliders();

  const indexToRender = typeof indexActive === "number"
    ? Math.min(Math.max(indexActive, 0), titles.length)
    : 0;
  const sliderRender = sliders[indexToRender];

  return (
    <div className="w-full flex container my-0 mx-auto justify-between items-center max-1024:flex-col max-1024:items-start max-1024:p-4">
      <div className="font-berthold text-3xl font-bold max-w-[355px] max-1024:mb-4">
        {titleDiv}
      </div>
      <div className="flex flex-col">
        <ul className="flex gap-4 pb-4 flex-wrap">
          {titles.map((title, index) => (
            <button
              className={`tab tab-lg text-base font-medium text-center p-0 uppercase ${
                index === indexToRender ? "tab-active" : ""
              }`}
              {...usePartialSection({ props: { indexActive: index } })}
            >
              {title}
            </button>
          ))}
        </ul>

        {sliderRender &&
          <ImageCardsCarousel {...carousel} />}
      </div>
    </div>
  );
}
