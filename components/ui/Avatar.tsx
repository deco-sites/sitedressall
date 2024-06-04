/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  // Color variants - only applied when no color as content is passed
  active: "text-sm font-bold text-blackPrimary border-2 border-orangePrimary",
  disabled:
    "text-sm font-bold text-blackPrimary border-2 line-through pointer-events-none cursor-no-drop",
  default: "text-sm font-bold text-blackPrimary border-2 border-[#DAD9DD]",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "text-sm font-bold text-blackPrimary border-2 border-orangePrimary",
  disabled:
    "text-sm font-bold text-blackPrimary border-2 pointer-events-none cursor-no-drop",
  default: "text-sm font-bold text-blackPrimary border-2 border-[#DAD9DD]",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div
      class={`${colors[content] ?? colors[variant]} ${
        variants[variant]
      } px-4 py-2`}
    >
      <span class="uppercase">
        {colors[content] ? "" : content.substring(0, 2)}
      </span>
    </div>
  );
}

export default Avatar;
