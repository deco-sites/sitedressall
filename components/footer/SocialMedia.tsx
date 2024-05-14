import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  footerSocialMedia?: {
    image: ImageWidget;
    alt: string;
  };
}

export default function SocialMedia({ footerSocialMedia }: Props) {
  return (
    <div className="flex flex-col gap-4 socialmedia">
      {footerSocialMedia?.image && (
        <Image
          loading="lazy"
          src={footerSocialMedia?.image}
          alt={footerSocialMedia?.alt}
          width={100}
        />
        
        
      )}
      {footerSocialMedia?.image && (
        <Image
          loading="lazy"
          src={footerSocialMedia?.image}
          alt={footerSocialMedia?.alt}
          width={100}
        />
        
      )}
    </div>
  );
}
