import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface FooterSocialMedia {
  image: ImageWidget;
  alt: string;
}

interface Props {
  footerSocialMedia?: FooterSocialMedia[];
}

export default function SocialMedia({ footerSocialMedia }: Props) {
  return (
    <div className="flex flex-col gap-4 socialmedia">
      {footerSocialMedia && footerSocialMedia.map((item, index) => (
        <Image
          key={index}
          loading="lazy"
          src={item.image}
          alt={item.alt}
          width={100}
        />
      ))}
    </div>
  );
}
