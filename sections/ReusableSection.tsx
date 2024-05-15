interface Tab {
  label: string;
  content: string;
}

interface Props {
  title: string;
  descriptionTitle: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
}

export default function ReusableSection(
  { title, descriptionTitle, description, linkText, linkUrl }: Props,
) {
  return (
    <div className="header-section flex justify-between container py-12 items-center">
      <div className="max-w-[350px]">
        <h1 className="font-berthold text-3xl font-bold pb-4">{title}</h1>
        <p className="max-w-[654px] font-berthold text-base font-normal leading-6 text-left">{descriptionTitle}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className=" max-w-[654px] font-berthold text-base font-normal leading-6 text-left">{description}</p>
        {linkText && linkUrl && (
          <a href={linkUrl} className="font-berthold font-bold text-2xl leading-6 text-center w-fit rounded-3xl bg-orange-600 h-12 text-white py-3 px-8"> 
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
}
