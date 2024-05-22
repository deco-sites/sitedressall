import type { Section } from "deco/blocks/section.ts";
import { ComponentChildren, toChildArray } from "preact";
import { useId } from "preact/hooks";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { ButtonColor, grid } from "../../constants.tsx";
import { clx } from "../../sdk/clx.ts";

interface Layout {
  /** @description For desktop in px. */
  itemWidth?: number;
  gap?: {
    /** @default 2 */
    mobile?: "1" | "2" | "4" | "8" | "12" | "16";
    /** @default auto */
    desktop?: "1" | "2" | "4" | "8" | "12" | "16";
  };
  hide?: {
    controls?: boolean;
    indicators?: boolean;
  };
}

/**
 * @title Carousel
 */
export interface Props {
  children?: ComponentChildren;
  /** @description For automatic sliding in seconds. */
  interval?: number;
  layout?: Layout;
  style?: {
    controlsColor?: ButtonColor;
    controlsOutline?: boolean;
  };
}

const percentage = 50;
const offset = 42;
const topValue = `calc(${percentage}% - ${offset}px)`;

function Section({ interval = 0, layout, children }: Props) {
  const id = useId();
  const items = toChildArray(children);

  if (!items.length) {
    return null;
  }

  return (
    <>
      <div id={id} class="relative max-w-deskContainer m-auto">
        <Slider
          class={clx(
            "relative carousel carousel-center",
            layout?.gap?.mobile
              ? grid.gap.mobile[layout.gap.mobile]
              : grid.gap.mobile[2],
            layout?.gap?.desktop
              ? grid.gap.desktop[layout.gap.desktop]
              : grid.gap.mobile[4],
          )}
        >
          {items?.map((item, index) => (
            <Slider.Item index={index} class={clx("carousel-item")}>
              {item}
            </Slider.Item>
          ))}
        </Slider>

        {!layout?.hide?.controls && (
          <>
            <Slider.PrevButton
              class={clx(
                "absolute left-0 w-11 h-11 text-blackPrimary border-blackPrimary border rounded-full flex items-center justify-center bg-white top-[slideArrow]",
              )}
              style={{ top: topValue }}
            >
              <Icon
                class="text-blackPrimary"
                size={12}
                id="ChevronLeft"
                strokeWidth={2}
              />
            </Slider.PrevButton>

            <Slider.NextButton
              class={clx(
                "absolute right-0 w-11 h-11 text-blackPrimary border-blackPrimary border rounded-full flex items-center justify-center bg-white top-[slideArrow]",
              )}
              style={{ top: topValue }}
            >
              <Icon
                class="rotate-180 text-blackPrimary"
                size={12}
                id="ChevronLeft"
                strokeWidth={2}
              />
            </Slider.NextButton>
          </>
        )}

        {!layout?.hide?.indicators && (
          <ul class="carousel items-end justify-center col-span-full gap-4 z-10 row-start-4">
            {items?.map((_, index) => (
              <li class="carousel-item">
                <Slider.Dot index={index}>
                  <div class="w-4 h-4 rounded-full group-disabled:bg-primary bg-transparent border-[1px] border-primary" />
                </Slider.Dot>
              </li>
            ))}
          </ul>
        )}

        <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </>
  );
}

export default Section;
