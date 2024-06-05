import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { HTMLWidget } from "apps/admin/widgets.ts";

interface Props {
  /** @title Imagem Desktop */
  imgDesktop: ImageWidget;
  /** @title Imagem Mobile */
  imgMob: ImageWidget;
  /** @title Título */
  title: HTMLWidget;
  /** @title Subtítulo */
  /** * @format textarea */
  subtitle?: string;
  /** @title Texto do Botão */
  ctaName?: string;
  /** @title Url do Botão */
  ctaUrl?: string;
}

const Banner = (
  { ctaName, imgDesktop, imgMob, subtitle, title, ctaUrl }: Props,
) => {
  return (
    <div class="relative md:max-w-98vw mx-auto max-w-[90vw]">
      <Picture>
        <Source src={imgDesktop} width={2600} media="(min-width: 500px)">
        </Source>
        <img class="w-full" src={imgMob} alt="" />
      </Picture>
      <div class="absolute bottom-8 left-4 md:bottom-4 lg:bottom-8 lg:left-8">
        <div
          class="text-white text-[40px] leading-[48px] mb-4 lg:text-[64px] lg:leading-[75px]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p class="text-sm text-white mb-5">{subtitle}</p>
        {ctaName && ctaUrl &&
          (
            <a
              class="w-fit block px-4 py-2 bg-white text-[#FE8330] rounded-2xl text-sm lg:text-xl lg:rounded-[30px] lg:px-[32px] lg:py-[12px]"
              href={ctaUrl}
            >
              {ctaName}
            </a>
          )}
      </div>
    </div>
  );
};

export default Banner;
