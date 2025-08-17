import { useState, useRef, useEffect } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("all");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const options = [
    { value: "all", label: "All" },
    { value: "sources", label: "Sources" },
    { value: "forks", label: "Forks" },
    { value: "archived", label: "Archived" },
    { value: "sponsored", label: "Can be sponsored" },
    { value: "mirrors", label: "Mirrors" },
    { value: "templates", label: "Templates" },
  ];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="filter">
      <button
        ref={buttonRef}
        className="filter-button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((o) => !o)}
      >
        <span>Type</span>
        <svg
          className="caret"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M4.427 6.427a.75.75 0 0 1 1.06 0L8 8.94l2.513-2.513a.75.75 0 1 1 1.06 1.06L8.53 10.53a.75.75 0 0 1-1.06 0L4.427 7.487a.75.75 0 0 1 0-1.06Z"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="menu"
          role="menu"
          aria-labelledby="filterBtn"
        >
          <div className="menu-title">Select type</div>

          {options.map((opt) => (
            <button
              key={opt.value}
              className="menuitem"
              role="menuitemradio"
              aria-checked={selected === opt.value}
              onClick={() => {
                setSelected(opt.value);
                setIsOpen(false);
              }}
            >
              <span className="check" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path
                    fill="currentColor"
                    d="M6.173 11.6 2.8 8.227l1.13-1.13 2.243 2.244 5.897-5.897 1.13 1.13z"
                  />
                </svg>
              </span>
              <span className="label">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
