import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface SocialIconItem {
  image: ImageWidget;
  alt?: string;
  socialUrl: string;
}

export interface ICustomSocialMedia {
  socialIcons: SocialIconItem[];
}

export default function CustomSocialMedia(props: ICustomSocialMedia) {
  return (
    <div class="flex flex-col gap-4 socialmedia">
      {props?.socialIcons?.map((icon) => (
        <a href={icon.socialUrl}>
          <Image
            loading="lazy"
            src={icon.image}
            alt={icon.alt || ""}
            width={40}
            height={40}
          />
        </a>
      ))}
    </div>
  );
}
