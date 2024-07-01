import { usePartialSection } from "deco/hooks/usePartialSection.ts";

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
  /**
   * @format textarea
   */
  info?: string;
}

export default function TabSection({
  items,
  indexActive,
  titleDiv,
}: Props) {
  const titles: string[] = [];
  const infos: string[] = [];

  function getTitles() {
    items?.map((element) => {
      titles.push(element.title);
    });
  }

  function getInfos() {
    items?.map((element) => {
      infos.push(element.info);
    });
  }

  getTitles();
  getInfos();

  const indexToRender = typeof indexActive === "number"
    ? Math.min(Math.max(indexActive, 0), titles.length)
    : 0;
  const infoRender = infos[indexToRender];

  return (
    <div className="w-full flex container my-0 max-w-deskContainer mx-auto justify-between items-center max-1024:flex-col max-1024:items-start lg:w-90vw sm:w-95vw px-4 md:px-0">
      <div className="font-berthold text-3xl font-bold max-w-[355px] max-1024:mb-4 max-1024:text-2xl">
        {titleDiv}
      </div>
      <div className="flex flex-col">
        <ul className="flex gap-4 pb-4 max-425:overflow-y-auto max-425:max-w-[340px]">
          {titles.map((title, index) => (
            <button
              className={`tab tab-lg text-sm lg:text-base font-medium text-center p-0 uppercase text-nowrap ${
                index === indexToRender ? "tab-active" : ""
              }`}
              {...usePartialSection({ props: { indexActive: index } })}
            >
              {title}
            </button>
          ))}
        </ul>

        <p className="text-sm lg:text-base text-left font-normal max-w-[680px]">
          {infoRender}
        </p>
      </div>
    </div>
  );
}
