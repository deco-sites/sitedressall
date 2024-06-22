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
import Icon from "../ui/Icon.tsx";
import Modal from "../ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import Button from "../ui/Button.tsx";

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
  modal?: {
    active: boolean;
    image: ImageWidget;
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
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  logoPosition = "center",
  buttons,
  myarts = {
    url: "#",
    text: "EXPONHA SUA ARTE",
  },
  device,
  modal = {
    active: false,
    image: "https://via.placeholder.com/354x474?text=354x474",
  },
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];
  const open = useSignal(true);
  return (
    <>
      {modal?.active && (
        <Modal
          loading="lazy"
          open={open.value}
          onClose={() => (open.value = false)}
        >
          <div class="modal-box p-0 max-w-none w-fit bg-white flex items-center justify-center rounded-[20px]">
            <div class="p-8 max-w-[616px] w-full">
              <h2 class="font-bold text-blackPrimary text-5xl mb-8">
                quer ganhar 10% off?
              </h2>
              <p class="mb-8">
                cadastre-se para receber o cupom no e-mail e ficar por dentro
                das novidades e promoções.
              </p>
              <form class="flex flex-col gap-8">
                <input
                  type="email"
                  name="modal-email"
                  id="modal-email"
                  required
                  placeholder="Insira seu email"
                  class="w-full px-8 h-[43px] border rounded-full border-[#4F4F4F]"
                />
                <input
                  type="text"
                  name="modal-first-name"
                  id="modal-first-name"
                  required
                  placeholder="Insira seu primeiro nome"
                  class="w-full px-8 h-[43px] border rounded-full border-[#4F4F4F]"
                />
                <div class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="modal-need-help"
                    id="modal-need-help"
                    required
                  />
                  <label htmlFor="nl-need-help">
                    Preciso de ajuda para escolher e comprar
                  </label>
                </div>
                <button
                  type="submit"
                  disabled
                  class="text-[#D9D9D9] bg-[#B4B4B4] rounded-full w-full h-[43px]"
                >
                  enviar
                </button>
              </form>
            </div>
            <div class="h-full relative">
              <Button
                class="flex items-center justify-center absolute bg-white w-11 h-11 right-[17px] top-[17px] z-[99999999999999]"
                onClick={() => (open.value = false)}
              >
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
              <Image
                src={modal.image}
                width={354}
                height={451}
                class="rounded-r-[20px]"
                loading={"eager"}
              />
            </div>
          </div>
        </Modal>
      )}
      <header class="lg:h-[167px] h-[110px]">
        <Drawers menu={{ items }} searchbar={searchbar} platform={platform}>
          <div class="bg-white fixed w-full z-50">
            {alerts && alerts.length > 0 && <Alert alerts={alerts} />}
            {device !== "mobile" && (
              <section class="flex items-center justify-end px-6 py-3">
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
