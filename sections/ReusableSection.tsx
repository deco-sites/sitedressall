interface Tab {
  label: string;
  content: string;
}

interface Link {
  text: string;
  url: string;
  color?: string;
  backgroundColor?: string;
}

interface Props {
  title: string;
  descriptionTitle: string;
  description: string;
  links?: Link[];
}

export default function ReusableSection({
  title,
  descriptionTitle,
  description,
  links,
}: Props) {
  return (
    <div className="header-section flex justify-between container py-12 items-center divReusableSectionMobile">
      <div className="max-w-[365px] flex flex-col gap-4">
        <h1 className="font-berthold text-3xl font-bold">{title}</h1>
        <p className="max-w-[654px] font-berthold text-base font-normal leading-6 text-left">
          {descriptionTitle}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {/* <div role="tablist" className="tabs tabs-bordered">
          <input
            checked
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Tab 1"
          />
          <div role="tabpanel" className="tab-content p-10">
            <p className="max-w-[654px] font-berthold text-base font-normal leading-6 text-left">
              {description}
            </p>
            {links && (
              <div>
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className={`font-berthold font-bold text-2xl leading-6 text-center w-fit rounded-3xl py-3 px-8 ${
                      link.color ? "text-" + link.color : "text-white"
                    } ${
                      link.backgroundColor
                        ? "bg-" + link.backgroundColor
                        : "bg-orange-600"
                    }`}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div> */}
        <div role="tablist" className="tabs tabs-bordered">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Tab 1"
          />
          <div role="tabpanel" className="tab-content p-10">
            Tab content 10
          </div>
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Tab 2"
            checked
          />
          <div role="tabpanel" className="tab-content p-10">
            Tab content 2
          </div>
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Tab 3"
          />
          <div role="tabpanel" className="tab-content p-10">
            Tab content 3
          </div>
        </div>
      </div>
    </div>
  );
}
