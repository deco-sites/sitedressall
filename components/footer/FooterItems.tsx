import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-10 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span class="font-bold text-3xl leading-9">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        <a href={item.href} class="block py-1 link link-hover">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden gap-4">
            {sections.map((section) => (
              <li>
                <div class="collapse collapse-arrow ">
                  <input
                    id={section.label}
                    type="checkbox"
                    class="min-h-[0] "
                  />
                  <label
                    htmlFor={section.label}
                    class="collapse-title min-h-[0] !p-0 flex gap-2 text-2xl font-bold collapse-arrow collapse-title:after"
                  >
                    <span>{section.label}</span>
                  </label>
                  <div class="collapse-content p-0">
                    <ul
                      class={`flex flex-col gap-1 `}
                    >
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block py-1 link link-hover font-normal text-sm"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
