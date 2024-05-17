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
    <div className="flex justify-between container py-12 items-center max-1024:flex-col max-1024:p-10 max-1024:items-start">
      <div className="max-w-[365px] flex flex-col gap-4">
        <h1 className="font-berthold text-3xl font-bold">{title}</h1>
        <p className="max-w-[654px] font-berthold text-base font-normal leading-6 text-left">
          {descriptionTitle}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="max-w-[654px] font-berthold text-base font-normal leading-6 text-left">
          {description}
        </p>
        {links && (
          <div className="flex flex-col gap-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className={`font-berthold font-bold text-2xl leading-6 text-center w-fit rounded-3xl py-3 px-8 ${
                  link.color ? "text-" + link.color : "text-white"
                } ${
                  link.backgroundColor
                    ? `bg-${link.backgroundColor} ${
                      link.backgroundColor === "white"
                        ? "border border-[#B4B4B4]"
                        : ""
                    }`
                    : "bg-orange-600"
                }`}
              >
                {link.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
