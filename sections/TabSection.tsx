import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  items?: Item[];
  /**
   * @hide
   * @readonly
   */
  indexActive?: number;
}

/**
 * @titleBy title
 */
interface Item {
  title?: string;
  titleTab?: string;
  /**
   * @format textarea
   */
  info?: string;
}

export default function TabSection({
  items,
  indexActive,
}: Props) {
  const titles: string[] = [];
  const infos: string[] = [];

  function getTitles() {
    items?.map((element) => {
      titles.push(element.titleTab);
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
    <div className="w-full flex">
      <div className="font-berthold text-3xl font-bold">
        {title}
      </div>
      <ul className="flex gap-4 pb-4">
        {titles.map((titleTab, index) => (
          <button
            className={`tab tab-lg text-base font-medium text-center p-0 ${
              index === indexToRender ? "tab-active" : ""
            }`}
            {...usePartialSection({ props: { indexActive: index } })}
          >
            {titleTab}
          </button>
        ))}
      </ul>
      <li>
        <p className="text-base text-left font-normal">
          {infoRender}
        </p>
      </li>
    </div>
  );
}
