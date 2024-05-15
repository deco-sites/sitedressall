import { h } from 'preact';
import { useSignal } from '@preact/signals';

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

export default function ReusableSection({ title, description, linkText, linkUrl, tabs }: Props) {
  const activeTab = useSignal(0);

  function handleTabClick(index: number) {
    activeTab.value = index;
  }

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
          <div className="tab-buttons">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`tab-button ${index === activeTab.value ? "active" : ""}`}
                data-tab-index={index}
                onClick={() => handleTabClick(index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab-content ${index === activeTab.value ? "active" : ""}`}
              data-tab-index={index}
            >
              {tab.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
