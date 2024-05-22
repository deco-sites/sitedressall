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
  title: string;
  /**
   * @format textarea
   */
  info: string;
}

export default function TabSection({
  items,
  indexActive,
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
    <div class="w-full">
      <ul>
        {titles.map((title, index) => (
          <button
            class={`tab tab-lg`}
            {...usePartialSection({ props: { indexActive: index } })}
          >
            {title}
          </button>
        ))}
      </ul>

      {infoRender}
    </div>
  );
}