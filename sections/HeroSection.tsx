interface Tab {
  label: string;
  content: string;
}

interface Props {
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  tabs?: Tab[];
}

export default function HeaderSection(
  { title, description, linkText, linkUrl, tabs }: Props,
) {
  return (
    <div className="header-section">
      <h1>{title}</h1>
      <p>{description}</p>
      {linkText && linkUrl && (
        <a href={linkUrl} className="link">
          {linkText}
        </a>
      )}
      {tabs && tabs.length > 0 && (
        <div className="tab-list">
          {tabs.map((tab, index) => (
            <div key={index} className="tab">
              <button>{tab.label}</button>
              <div className="tab-content">{tab.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
