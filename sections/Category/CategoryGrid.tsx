import Header from "../../components/ui/SectionHeader.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "../../components/ui/Button.tsx";
import RichText from "../Content/RichText.tsx";

export interface CategoryGridProps {
  href?: string;
  image?: ImageWidget;
  // /** @description Alternative text */
  label?: string;
  text: string;
  buttonText?: string;
}

export interface Props {
  // header?: {
  //   /**
  //    * @default Explore Our Categories
  //    */
  //   title?: string;
  //   /**
  //    * @default Your description here
  //    */
  //   description?: string;
  // };
  list?: CategoryGridProps[];
  layout?: {
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

const DEFAULT_LIST = [
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    text: "teste",
    buttonText: "conheça o simulador",
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    text: "teste",
    buttonText: "conheça o simulador",
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    text: "teste",
    buttonText: "conheça o simulador",
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    text: "teste",
    buttonText: "conheça o simulador",
  },
];

function CategoryGrid(props: Props) {
  const id = useId();
  const {
    // header = {
    //   title: "Explore Our Categories",
    //   description: "Your description",
    // },
    list = DEFAULT_LIST,
    layout = {
      categoryCard: {
        textPosition: "bottom",
        textAlignment: "left",
      },
    },
  } = props;
  const listQTE = list?.length > 1;
  return (
    <div id={id} class="container mt-16">
      {
        /* <Header
        title={header.title}
        description={header.description || ""}
        alignment={layout.headerAlignment || "center"}
      /> */
      }

      <div
        class={`grid md:${
          listQTE ? "grid-cols-2" : "grid-cols-1"
        } grid-cols-1 mt-6 gap-x-8`}
      >
        {list.map(({ href, image, label, text, buttonText }) => (
          <div class="relative">
            <a
              href={href}
              class={`relative flex ${
                layout.categoryCard?.textAlignment === "left"
                  ? "justify-start"
                  : "justify-start items-center"
              } ${
                layout.categoryCard?.textPosition === "bottom"
                  ? "flex-col-reverse"
                  : "flex-col"
              }`}
            >
              {image && (
                <figure>
                  <Image
                    class="w-full rounded-3xl"
                    src={image}
                    alt={label}
                    width={720}
                    height={480}
                    loading="lazy"
                  />
                </figure>
              )}
              <div class={`absolute ${listQTE ? "m-6" : "ml-6 mb-[105px]"}`}>
                <RichText
                  text={text}
                  textStyle="text-white font-medium text-4xl"
                  containerWidth={490}
                />
                <Button
                  class="font-bold text-xl text-orangePrimary bg-white py-3 px-8 leading-none rounded-full mt-2.5 hover:bg-orangePrimary hover:text-white hover:underline"
                  aria-label={label}
                >
                  {buttonText}
                </Button>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;
