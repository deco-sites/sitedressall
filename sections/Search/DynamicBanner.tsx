import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { SectionProps } from "deco/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy search
 */
export interface Banner {
  /** @title Busca */
  /** @description Texto da busca, ex: Caso queira que o banner exiba quando for busca 'masculino' digite masculino neste campo e toda busca onde houver esse mesmo texto o banner aparecerá. Caso não hovuer nenhum texto esse banner exibirá em toda busca  */
  search?: string;
  /** @title Título */
  /** @description Título a ser exibido ao lado do banner */
  title?: string;
  /** @title Subtítulo / Paragrafo */
  /** @description Texto a ser exibido ao lado do banner */
  /** @format rich-text*/
  subtitle?: string;
  image: {
    /** @description Imagem para Desktop */
    desktop: ImageWidget;
    /** @description Imagem para Mobile */
    mobile: ImageWidget;
    /** @description Texto alternativo da imagem */
    alt?: string;
  };
}

const DEFAULT_PROPS = {
  banners: [
    {
      image: {
        mobile:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        alt: "a",
      },
      title: "Woman",
      search: "",
      subtitle: "As",
    },
  ],
};

function DynamicBannerSearch(props: SectionProps<ReturnType<typeof loader>>) {
  const { banner } = props;

  if (!banner) {
    return null;
  }

  const { title, subtitle, image } = banner;

  return (
    <div class="flex flex-col lg:flex-row max-w-[1440px] mx-auto">
      <Picture preload class="lg:max-w-[586px]">
        <Source
          src={image.mobile}
          width={767}
          // height={120}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1440}
          height={200}
          media="(min-width: 767px)"
        />
        <img class="" src={image.desktop} alt={image.alt ?? title} />
      </Picture>

      <div class="max-w-[670px] flex flex-col justify-center p-4 lg:px-8 lg:py-0">
        <h1 class="lg:text-[32px] text-xl font-bold mb-4">
          {title}
        </h1>
        {subtitle &&
          <div dangerouslySetInnerHTML={{ __html: subtitle }} />}
      </div>
    </div>
  );
}

export interface Props {
  banners?: Banner[];
}

export const loader = (props: Props, req: Request) => {
  const { banners } = { ...DEFAULT_PROPS, ...props };

  const banner = banners.find(({ search }) => {
    if (!search) return true;

    return req.url.includes(`/s?q=${search}`);
  });

  return { banner };
};

export default DynamicBannerSearch;
