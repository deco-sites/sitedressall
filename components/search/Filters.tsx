import Avatar from "../../components/ui/Avatar.tsx";
import { formatPrice } from "../../sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
  SortOption
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Sort from "../../components/search/Sort.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  sortOptions?: SortOption[]
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters, sortOptions }: Props) {
  return (
    <ul class="flex flex-col gap-6 p-4">
      {sortOptions && sortOptions?.length > 0 && <li class="flex flex-col gap-4"><Sort sortOptions={sortOptions} /></li>}
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="flex flex-col gap-4">
            <span class="font-bold text-base text-[#3c3c3b] uppercase">
              {filter.label}
            </span>
            <FilterValues {...filter} />
          </li>
        ))}
    </ul>
  );
}

export default Filters;
