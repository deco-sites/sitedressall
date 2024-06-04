import Avatar from "../../components/ui/Avatar.tsx";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  return (
    <ul class="flex flex-col gap-8">
      {Object.keys(possibilities).map((name, i) => (
        <li class="flex flex-col gap-2">
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
