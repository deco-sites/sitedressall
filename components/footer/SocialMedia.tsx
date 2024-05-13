import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface FooterSocialMedia {
  src: ImageWidget;
  alt: string;
}

interface SocialMediaProps {
  FooterSocialMedia?: FooterSocialMedia[];
}

export default function SocialMedia({ FooterSocialMedia }: SocialMediaProps) {
  return (
    <div className="flex flex-col gap-4 socialmedia">
      {FooterSocialMedia?.map((option, index) => (
        <a key={index} href={option.src ? `/link-${index}` : "#"}>
          <Image
            loading="lazy"
            src={option.src}
            alt={option.alt}
            width={200}
            height={200}
          />
        </a>
      ))}
    </div>
  );
}
