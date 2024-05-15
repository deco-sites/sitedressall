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
    <div className="header-section">
      <h1>{title}</h1>
      <p>{descriptionTitle}</p>
      <div>
        <p>{description}</p>
        {linkText && linkUrl && (
          <a href={linkUrl} className="link">
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
}
