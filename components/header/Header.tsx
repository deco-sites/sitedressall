import { AppContext } from "../../apps/site.ts";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import CartButtonShopify from "../../islands/Header/Cart/shopify.tsx";
import Drawers from "../../islands/Header/Drawers.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import Icon from "../ui/Icon.tsx";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

export interface Props {
  alerts?: string[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: Logo;

  logoPosition?: "left" | "center";

  buttons?: Buttons;
  myarts: {
    url?: string;
    text?: string;
  };
}

function Header({
  alerts,
  searchbar,
  navItems = [
    {
      "@type": "SiteNavigationElement",
      name: "Feminino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Masculino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Sale",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Linktree",
      url: "/",
    },
  ],
  logo = {
    src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  logoPosition = "center",
  buttons,
  myarts = {
    url: "#",
    text: "EXPONHA SUA ARTE"
  },
  device,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers menu={{ items }} searchbar={searchbar} platform={platform}>
          <div class="bg-white fixed w-full z-50">
            {alerts && alerts.length > 0 && <Alert alerts={alerts} />}
            {device !== "mobile" && (
              <section class="flex items-center justify-end px-6 py-3 ">
                <ul class="flex items-center justify-end border-b w-full">
                  {myarts?.url && (
                    <li>
                      <a
                        href={myarts.url}
                        class="flex items-center text-xs text-blackPrimary"
                      >
                        <Icon id="Myarts" strokeWidth={1} size={44} />
                        {myarts.text}
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      class="flex items-center text-xs text-blackPrimary ml-[67px]"
                      href="/account"
                      aria-label="Account"
                    >
                      <Icon id="Myaccount" strokeWidth={1} size={44} />
                      MINHA CONTA
                    </a>
                  </li>
                  <li>
                    <a
                      class="flex items-center text-xs text-blackPrimary ml-[67px]"
                      href="/wishlist"
                      aria-label="Wishlist"
                    >
                      <button
                        class="flex items-center justify-center"
                        aria-label="Wishlist"
                      >
                        <Icon id="Wishlist" strokeWidth={1} size={44} />
                      </button>
                    </a>
                  </li>
                  <li>{platform === "shopify" && <CartButtonShopify />}</li>
                </ul>
              </section>
            )}
            <Navbar
              device={device}
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              logoPosition={logoPosition}
              buttons={buttons}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
