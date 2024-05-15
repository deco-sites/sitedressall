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

export default function ReusableSection(
  { title, description, linkText, linkUrl, tabs }: Props,
) {
  function handleTabClick(event: Event) {
    const button = event.currentTarget as HTMLElement;
    const tabIndex = button.getAttribute("data-tab-index");
    if (tabIndex !== null) {
      const index = parseInt(tabIndex, 10);
      const tabButtons = document.querySelectorAll(".tab-button");
      const tabContents = document.querySelectorAll(".tab-content");

      tabButtons.forEach((btn, idx) => {
        if (idx === index) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      tabContents.forEach((content, idx) => {
        if (idx === index) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      });
    }
  }

  // Adiciona ouvintes de eventos após o componente ser montado
  setTimeout(() => {
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach((button) => {
      button.addEventListener("click", handleTabClick);
    });
  }, 0);

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
                className={`tab-button ${index === 0 ? "active" : ""}`}
                data-tab-index={index}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab-content ${index === 0 ? "active" : ""}`}
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
