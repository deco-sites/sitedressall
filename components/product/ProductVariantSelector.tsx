import Avatar from "../../components/ui/Avatar.tsx";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";
import Button from "../ui/Button.tsx";
import { useSignal } from "@preact/signals";
import Modal from "../ui/Modal.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  product: Product;
  imageModalDesk?: ImageWidget;
  imageModalMob?: ImageWidget;
}

function VariantSelector({ product, imageModalDesk, imageModalMob }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  const openModalSize = useSignal(false);

  return (
    <ul class="flex flex-col gap-8">
      {Object.keys(possibilities).map((name, i) => (
        <li class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <div class="flex mb-4 items-center gap-4">
              <span class="flex items-center justify-center bg-[#F1F1F1] font-bold text-sectionTitle w-16 h-10 leading-none">
                {i + 1}
              </span>
              <span
                class={`flex items-center gap-4 text-xl font-bold text-blackPrimary`}
              >
                {name}
              </span>
            </div>
            {name.toLowerCase() === "tamanho" && imageModalDesk &&
              imageModalMob &&
              (
                <Button
                  class="text-xs font-light text-black underline"
                  onClick={() => openModalSize.value = true}
                >
                  vizualize o tamanho ideal
                </Button>
              )}
          </div>
          {imageModalDesk && imageModalMob &&
            (
              <Modal
                loading="lazy"
                open={openModalSize.value}
                onClose={() => openModalSize.value = false}
              >
                <div class="modal-box w-fit max-w-[1020px] relative p-2 lg:p-4 rounded-[20px]">
                  <button
                    onClick={() => openModalSize.value = false}
                    class="absolute top-0 right-0"
                  >
                    <svg
                      class="pointer-events-none"
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0H25C36.0457 0 45 8.95431 45 20V45H20C8.9543 45 0 36.0457 0 25V0Z"
                        fill="white"
                      />
                      <path
                        d="M35 10L11 34"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11 10L35 34"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <div class="hidden lg:block overflow-hidden rounded-[20px]">
                    <Image
                      src={imageModalDesk ??
                        "https://placehold.co/987x754/000000/FFFFFF/png"}
                      width={987}
                    />
                  </div>
                  <div class="block lg:hidden overflow-hidden rounded-[20px]">
                    <Image
                      src={imageModalMob ??
                        "https://placehold.co/324x298/000000/FFFFFF/png"}
                      width={324}
                    />
                  </div>
                </div>
              </Modal>
            )}
          <ul class="ml-[80px] flex flex-row gap-3">
            {Object.entries(possibilities[name]).map(([value, link]) => {
              const relativeUrl = relative(url);
              const relativeLink = relative(link);
              return (
                <li>
                  <button f-partial={relativeLink} f-client-nav>
                    <Avatar
                      content={value}
                      variant={relativeLink === relativeUrl
                        ? "active"
                        : relativeLink
                        ? "default"
                        : "disabled"}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
