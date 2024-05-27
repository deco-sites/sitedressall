import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import ImageCardsCarousel, {
  Props as CarouselProps,
} from "./Cards/IconCardsCarouselWithImage.tsx";
import SimpleImage, {
  Props as SimpleImageProps,
} from "../components/ui/ImageGallery.tsx";
import { clx } from "../sdk/clx.ts";
import { flex } from "../constants.tsx";
import { SlideProps } from "./Miscellaneous/Slide.tsx";

export interface Props {
  items?: Item[];
  /**
   * @hide
   * @readonly
   */
  indexActive?: number;
  titleDiv?: string;
  carousel?: CarouselProps;
  image?: SimpleImageProps;
}

/**
 * @titleBy title
 */
interface Item {
  title?: string;
  /**
   * @format textarea
   */
  slider?: SlideProps;
}

export default function TabSectionSlider({
  items,
  indexActive,
  titleDiv,
  carousel,
  image = {
    width: "30%",
  },
}: Props) {
  const titles: string[] = [];
  const sliders = items.map((item) => (
    <div
      key={item.title}
      className={clx(
        "flex flex-col lg:flex-row items-center gap-8",
        image?.position ? flex.position[image.position] : flex.position["Left"],
      )}
    >
      <SimpleImage width={image.width || "30%"} {...image} />
      <div className="flex-auto">
        <ImageCardsCarousel {...carousel} />
      </div>
    </div>
  ));

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
    <div className="w-full flex flex-col container my-0 mx-auto justify-between items-center max-1024:flex-col max-1024:items-start max-1024:p-4">
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
        {sliderRender}
      </div>
    </div>
  );
}
