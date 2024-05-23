import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Style {
  /** @description In px */
  width?: number;
  textPosition?: "Top" | "Bottom";
  textAlignment?: "Center" | "Left";
}

/** @titleBy label */
export interface Props {
  image?: ImageWidget;
  label?: string;
  description?: string;
  tag?: string;
  href?: string;
  buttonText?: string;
  style?: Style;
}

function CardText({
  label,
  description,
  alignment,
}: {
  label?: string;
  description?: string;
  tag?: string;
  alignment?: "Center" | "Left";
}) {
  return (
    <div
      class={`flex flex-col ${
        !alignment || alignment === "Center" ? "items-center" : "items-start"
      }`}
    >
      {label && <h3 class="text-xl">{label}</h3>}
      {description && <div class="text-sm">{description}</div>}
    </div>
  );
}

function Card({
  href = "#",
  tag,
  label,
  description,
  buttonText = "Button",
  style,
  image =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
}: Props) {
  return (
    <div
      class="relative flex flex-col gap-4 justify-center items-center"
      style={{ width: style?.width || "auto" }}
    >
      {image && (
        <a href={href}>
          <figure>
            <Image
              class="card rounded-2xl"
              src={image}
              alt={description || label || tag || buttonText}
              width={160}
              height={195}
              loading="lazy"
            />
          </figure>
          {buttonText && (
            <a
              href={href}
              class="absolute px-4 py-2 rounded-full font-bold bg-white text-orangePrimary text-buttonText bottom-5"
            >
              {buttonText}
            </a>
          )}
          {tag ||
            label ||
            (description && (
              <CardText tag={tag} label={label} description={description} />
            ))}
        </a>
      )}
    </div>
  );
}

export default Card;
