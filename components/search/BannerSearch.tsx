// deno-lint-ignore-file no-explicit-any
import { Picture, Source } from "apps/website/components/Picture.tsx";

function BannerSearch(props: any) {
  const { banner } = props;

  if (!banner) {
    return null;
  }

  const { title, subtitle, image } = banner;

  return (
    <div class="flex flex-col lg:flex-row mx-auto">
      <Picture preload class="w-full lg:w-[40%]">
        <Source
          src={image.mobile}
          width={767}
          // height={120}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1440}
          // height={200}
          media="(min-width: 767px)"
        />
        <img class="" src={image.desktop} alt={image.alt ?? title} />
      </Picture>

      <div class="flex flex-col justify-center px-4 py-4 lg:px-8 lg:py-0 w-full lg:w-[60%]">
        <div class="max-w-[670px]">
          <h1 class="lg:text-[32px] text-xl font-bold mb-4">
            {title}
          </h1>
          {subtitle &&
            <div dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
}

export default BannerSearch;
