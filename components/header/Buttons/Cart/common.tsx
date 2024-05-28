import { AnalyticsItem } from "apps/commerce/types.ts";
import Button from "../../../../components/ui/Button.tsx";
import Icon from "../../../../components/ui/Icon.tsx";
import { sendEvent } from "../../../../sdk/analytics.tsx";
import { useUI } from "../../../../sdk/useUI.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <div class="relative flex items-center justify-center">
      {!loading && (
        <span
          class={`font-light text-sm pointer-events-none right-0 top-1 flex items-center justify-center rounded-full absolute w-5 h-5 bg-orangePrimary text-white`}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}

      <Button
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <Icon id="Minicart" size={44} strokeWidth={1} />
      </Button>
    </div>
  );
}

export default CartButton;
