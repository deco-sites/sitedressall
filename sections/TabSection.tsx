import { usePartialSection } from "deco/hooks/usePartialSection.ts";

interface Tab {
  label: string;
  content: string;
}

interface Props {
  tabs?: Tab[];
  tabIndex?: number;
}

export default function TabSection({ tabs, tabIndex }: Props) {
  const ti = typeof tabIndex === "number" && tabs
    ? Math.min(Math.max(tabIndex, 0), tabs.length)
    : 0;

  return (
    <div>
      <div>
        {tabs?.map((tab, index) => (
          <button
            class={`tab tab-lg ${index === ti ? "tab-active" : ""}`}
            {...usePartialSection({ props: { tabIndex: index } })}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs?.map((tab) => <div>{tab.content}</div>)}
      </div>
    </div>
  );
}
