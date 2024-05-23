import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Category {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  image?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
    hide: {
      controls: boolean;
    };
  };
}

function CardText({
  tag,
  label,
  description,
  alignment,
}: {
  tag?: string;
  label?: string;
  description?: string;
  alignment?: "center" | "left";
}) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      {tag && <div class="text-sm text-blackPrimary">{tag}</div>}
      {label && <h3 class="text-lg text-blackPrimary">{label}</h3>}
      {description && (
        <div class="text-sm text-blackPrimary">{description}</div>
      )}
    </div>
  );
}

const DEFAULT_LIST = [
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
];
const percentage = 50;
const offset = 42;
const topValue = `calc(${percentage}% - ${offset}px)`;

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = DEFAULT_LIST,
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
      hide: {
        controls: false,
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="container py-8 flex flex-col gap-8 lg:gap-10 text-base-content  lg:py-10"
    >
      <Header
        title={header.title}
        description={header.description || ""}
        alignment={layout.headerAlignment || "center"}
      />
      <div class="relative">
        <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5">
          {list.map(
            ({ tag, label, description, href, image, buttonText }, index) => (
              <Slider.Item
                index={index}
                class="flex flex-col gap-4 carousel-item first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
              >
                <a
                  href={href}
                  class="flex flex-col gap-4 lg:w-[280px] w-40 lg:h-auto"
                >
                  {layout.categoryCard?.textPosition === "top" && (
                    <CardText
                      tag={tag}
                      label={label}
                      description={description}
                      alignment={layout?.categoryCard?.textAlignment}
                    />
                  )}
                  {image && (
                    <figure>
                      <Image
                        class="card w-full"
                        src={image}
                        alt={description || label || tag}
                        width={160}
                        height={195}
                        loading="lazy"
                      />
                    </figure>
                  )}
                  {layout.categoryCard?.textPosition === "bottom" && (
                    <CardText
                      tag={tag}
                      label={label}
                      description={description}
                      alignment={layout?.categoryCard?.textAlignment}
                    />
                  )}
                </a>
                {buttonText && (
                  <a href={href} class="btn">
                    {buttonText}
                  </a>
                )}
              </Slider.Item>
            )
          )}
        </Slider>

        {layout?.hide?.controls && (
          <>
            <Slider.PrevButton
              class={clx(
                "absolute left-0 w-11 h-11 text-blackPrimary border-blackPrimary border rounded-full flex items-center justify-center bg-white"
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
                "absolute right-0 w-11 h-11 text-blackPrimary border-blackPrimary border rounded-full flex items-center justify-center bg-white"
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
      </div>
      <Slider.JS rootId={id} />
    </div>
  );
}

export default CategoryList;
