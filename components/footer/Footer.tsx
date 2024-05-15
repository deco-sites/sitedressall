import FooterItems from "../../components/footer/FooterItems.tsx";
import Logo from "../../components/footer/Logo.tsx";
import Newsletter from "../../islands/Newsletter.tsx";
import { clx } from "../../sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import CustomSocialMedia, { ICustomSocialMedia } from "./CustomSocialMedia.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  layout?: Layout;
  customSocialProps?: ICustomSocialMedia;
}

const LAYOUT = {
  Primary: "bg-primary text-primary-content",
  Secondary: "bg-secondary text-secondary-content",
  Accent: "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [
    {
      label: "Sobre",
      items: [
        {
          href: "/quem-somos",
          label: "Quem somos",
        },
        {
          href: "/termos-de-uso",
          label: "Termos de uso",
        },
        {
          href: "/trabalhe-conosco",
          label: "Trabalhe conosco",
        },
      ],
    },
    {
      label: "Atendimento",
      items: [
        {
          href: "/centraldeatendimento",
          label: "Central de atendimento",
        },
        {
          href: "/whatsapp",
          label: "Fale conosco pelo WhatsApp",
        },
        {
          href: "/trocaedevolucao",
          label: "Troca e devolução",
        },
      ],
    },
  ],

  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
    },
  },
  customSocialProps,
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5",
      }}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );

  return (
    <footer
      class={clx(
        "w-full flex flex-col pt-10 gap-10",
        LAYOUT[layout?.backgroundColor ?? "Primary"],
      )}
    >
      <div class="bg-gray-200">
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
              {_logo}
              {_sectionLinks}
              {_newsletter}
              {customSocialProps && (
                <CustomSocialMedia {...customSocialProps} />
              )}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 2" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_newsletter}
                {_sectionLinks}
                {customSocialProps && (
                  <CustomSocialMedia {...customSocialProps} />
                )}
              </div>
            </div>
          </div>
        )}
        {layout?.variation == "Variation 3" && (
          <div class="flex flex-col gap-10">
            {_logo}
            <div class="flex flex-col lg:flex-row gap-14">
              <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                {_newsletter}
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {customSocialProps && (
                    <CustomSocialMedia {...customSocialProps} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between px-12 container-newsletter relative sectionsocial pb-12">
              {_sectionLinks}
              {customSocialProps && (
                <CustomSocialMedia {...customSocialProps} />
              )}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 5" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {_logo}
            <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
              {_sectionLinks}
              {customSocialProps && (
                <CustomSocialMedia {...customSocialProps} />
              )}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
