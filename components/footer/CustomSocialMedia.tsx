import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  footerSocialMedia?: {
    image: ImageWidget;
    alt: string;
  };
}

const defaultProps = {
  image:
    "https://placehold.co/100x100",
  alt: "teste",
};

export default function CustomSocialMedia({
  footerSocialMedia = defaultProps,
}: Props) {
  return (
    <div className="flex flex-col gap-4 socialmedia">
      {footerSocialMedia?.image && (
        <Image
          loading="lazy"
          src={footerSocialMedia?.image}
          alt={footerSocialMedia?.alt}
          width={100}
          height={100}
        />
      )}
      {footerSocialMedia?.image && (
        <Image
          loading="lazy"
          src={footerSocialMedia?.image}
          alt={footerSocialMedia?.alt}
          width={100}
          height={100}
        />
      )}
    </div>
  );
}
