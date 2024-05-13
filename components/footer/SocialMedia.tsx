import type { ImageWidget } from "apps/admin/widgets.ts";

export interface FooterSocialMedia {
  src: ImageWidget;
  alt: string;
}

interface SocialMediaProps {
  FooterSocialMedia?: FooterSocialMedia;
}

export default function SocialMedia({ FooterSocialMedia }: SocialMediaProps) {
  if (!FooterSocialMedia) {
    return null;
  }

  return (
    <div class="flex flex-col gap-4 socialmedia">
      <a href="/instagram">
        <img src={FooterSocialMedia.src} alt={FooterSocialMedia.alt} />
      </a>
      <a href="/whatsapp">
        <img src={FooterSocialMedia.src} alt={FooterSocialMedia.alt} />
      </a>
    </div>
  );
}
