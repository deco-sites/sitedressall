import { usePartialSection } from "deco/hooks/usePartialSection.ts";

interface Props {
  activeIndex: number;
}

export default function TabSection({ activeIndex }: Props) {
  const tabsData = [
    { label: "Aba 1", index: 0 },
    { label: "Aba 2", index: 1 },
    { label: "Aba 3", index: 2 },
    { label: "Aba 4", index: 3 },
    { label: "Aba 5", index: 4 },
  ];

  return (
    <div>
      {tabsData.map((tab) => (
        <button
          key={tab.index}
          className={activeIndex === tab.index ? "active" : ""}
          {...usePartialSection<typeof TabSection>({
            props: { activeIndex: tab.index },
          })}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
