interface Tab {
  label: string;
  content: string;
}

interface Link {
  text: string;
  url: string;
  isWhite?: boolean;
}

interface Props {
  title: string;
  descriptionTitle?: string;
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
    <div className="flex justify-between container py-12 max-w-deskContainer mx-auto items-center max-1024:flex-col max-1024:items-start lg:w-90vw sm:w-95vw px-4 md:px-0">
      <div className="max-w-[365px] flex flex-col gap-4">
        <h1 className="font-berthold text-3xl font-bold max-1024:text-2xl">
          {title}
        </h1>
        {descriptionTitle && (
          <p className="max-w-[654px] font-berthold lg:text-base text-sm font-normal leading-6 text-left">
            {descriptionTitle}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <p className="max-w-[654px] font-berthold lg:text-base text-sm font-normal leading-6 text-left mt-4">
          {description}
        </p>
        {links && (
          <div className="flex flex-col gap-4 lg:flex-row">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className={`font-berthold font-bold lg:text-2xl leading-6 text-center w-fit rounded-3xl py-3 px-8 text-[15px]
                  ${
                  link.isWhite
                    ? "text-[#FE8330] bg-white border border-[#B4B4B4]"
                    : "text-white bg-orange-600"
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
