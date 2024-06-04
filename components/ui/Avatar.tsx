/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "font-bold border-2 border-orangePrimary",
  disabled: "border-2 pointer-events-none cursor-no-drop",
  default: "border-2 border-[#DAD9DD]",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class={`${variants[variant]} px-4 py-2`}>
      <span class="text-sm text-blackPrimary">
        {content.substring(0, 2)}
      </span>
    </div>
  );
}

export default Avatar;
