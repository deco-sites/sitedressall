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
    readMore?: { text: string; icon: ImageWidget; url: string };
  };
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "inside" | "bottom";
      textAlignment?: "center" | "left";
    };
    arrows?: boolean;
  };
}

function CardText({
  tag,
  label,
  description,
  alignment,
  textPosition,
}: {
  tag?: string;
  label?: string;
  description?: string;
  alignment?: "center" | "left";
  textPosition?: "inside" | "bottom";
}) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      {tag && <div class="text-sm text-blackPrimary">{tag}</div>}
      {label && (
        <h3
          class={`${
            textPosition === "inside"
              ? "text-white font-bold text-sectionTitle"
              : "text-blackPrimary font-medium text-sectionTitle"
          }`}
        >
          {label}
        </h3>
      )}
      {description && (
        <div class="text-base text-blackPrimary ">{description}</div>
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
        textPosition: "inside",
        textAlignment: "center",
      },
      arrows: true,
    },
  } = props;

  return (
    <div
      id={id}
      class="py-8 flex flex-col gap-8 lg:gap-10 text-base-content lg:py-10 max-w-deskContainer m-auto"
    >
      <div class="flex items-center justify-between">
        <Header
          title={header.title}
          description={header.description || ""}
          alignment={layout.headerAlignment || "center"}
        />
        {header.readMore?.text && (
          <div class="flex items-center justify-end gap-2">
            <a
              href={header.readMore?.url || "#"}
              class="text-blackPrimary text-base underline"
            >
              {header.readMore?.text}
            </a>
            {header.readMore?.icon && (
              <Image
                src={header.readMore?.icon}
                width={12}
                height={7}
                alt="icone ver mais"
              />
            )}
          </div>
        )}
      </div>
      <div class="relative">
        <Slider class="relative carousel carousel-start gap-4 lg:gap-8 max-w-deskContainer w-full">
          {list.map(
            ({ tag, label, description, href, image, buttonText }, index) => (
              <Slider.Item
                index={index}
                class="flex flex-col gap-4 carousel-item first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0 w-1/4"
              >
                <div href={href} class="flex flex-col gap-4 w-full lg:h-auto">
                  {image && (
                    <div class="relative">
                      <a href={href}>
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
                      </a>
                      {layout.categoryCard?.textPosition === "inside" && (
                        <div class="absolute bottom-8 left-3">
                          <CardText
                            tag={tag}
                            label={label}
                            description={description}
                            alignment={layout?.categoryCard?.textAlignment}
                            textPosition={layout?.categoryCard?.textPosition}
                          />
                          {buttonText && (
                            <a
                              href={href}
                              class="w-fit text-buttonText font-bold bg-white text-orangePrimary rounded-full py-2 px-4 flex items-center justify-center mt-2.5"
                            >
                              {buttonText}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {layout.categoryCard?.textPosition === "bottom" && (
                    <>
                      <CardText
                        tag={tag}
                        label={label}
                        description={description}
                        alignment={layout?.categoryCard?.textAlignment}
                        textPosition={layout?.categoryCard?.textPosition}
                      />
                      {buttonText && (
                        <a
                          href={href}
                          class="w-fit bg-transparent border border-[#B4B4B4] rounded-full py-2 px-4 text-blackPrimary font-bold text-buttonText flex items-center justify-center"
                        >
                          {buttonText}
                        </a>
                      )}
                    </>
                  )}
                </div>
              </Slider.Item>
            ),
          )}
        </Slider>

        {layout?.arrows && (
          <>
            <Slider.PrevButton
              class={clx(
                "absolute left-0 w-11 h-11 text-blackPrimary border-blackPrimary border rounded-full flex items-center justify-center bg-white",
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
                "absolute right-0 w-11 h-11 text-blackPrimary border-blackPrimary border rounded-full flex items-center justify-center bg-white",
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
