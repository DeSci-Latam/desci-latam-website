import React, { useEffect, useRef, useState } from "react";
import "@pagefind/default-ui/css/ui.css";
import { IoSearch } from "react-icons/io5";

// Tipos para evitar errores de TypeScript
interface PagefindUIOptions {
  element: string;
  showImages: boolean;
  bundlePath: string;
  baseUrl?: string;
}

declare class PagefindUI {
  constructor(options: PagefindUIOptions);
}

interface Props {
  className?: string;
}

const Search: React.FC<Props> = ({ className = "" }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [searchUI, setSearchUI] = useState<PagefindUI | null>(null);

  // Inicialización de PagefindUI
  const initializeSearch = async () => {
    if (searchUI || import.meta.env.DEV) return;

    try {
      const { PagefindUI } = await import("@pagefind/default-ui");
      const container = document.querySelector("#pagefind-search");
      if (!container) return;

      const loadingEl = container.querySelector(".search-loading");
      if (loadingEl) loadingEl.classList.remove("hidden");

      const newSearchUI = new PagefindUI({
        element: "#pagefind-search",
        showImages: false,
        bundlePath: "/_pagefind/",
        baseUrl: import.meta.env.BASE_URL,
      });

      setSearchUI(newSearchUI);

      if (loadingEl) loadingEl.classList.add("hidden");
    } catch (error) {
      console.error("Error initializing PagefindUI:", error);
      const container = document.querySelector("#pagefind-search");
      if (container) {
        container.innerHTML =
          '<div class="error-message">Error loading search. Please try again.</div>';
      }
    }
  };

  // Abrir diálogo
  const openDialog = async () => {
    setIsDialogOpen(true);
    await initializeSearch();
    if (dialogRef.current) dialogRef.current.showModal();
    document.body.classList.add("overflow-hidden");
  };

  // Cerrar diálogo
  const closeDialog = () => {
    setIsDialogOpen(false);
    if (dialogRef.current) {
      dialogRef.current.classList.add("opacity-0");
      setTimeout(() => {
        dialogRef.current?.close();
        document.body.classList.remove("overflow-hidden");
      }, 200);
    }
  };

  // Efectos de eventos globales
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDialogOpen) {
        closeDialog();
      } else if ((e.key === "/" || (e.ctrlKey && e.key === "k")) && !isDialogOpen) {
        e.preventDefault();
        openDialog();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDialogOpen]);

  return (
    <div id="search-container" className={`ms-auto ${className}`}>
      {/* Botón de búsqueda */}
      <button
        onClick={openDialog}
        className="search-button flex items-center justify-center rounded-md gap-1 pr-4 p-0 hover:scale-125 transition-transform duration-200"
        aria-label="Buscar"
      >
        <IoSearch className="w-5 h-5" />
      </button>

      {/* Diálogo */}
      <dialog
        ref={dialogRef}
        id="search-dialog"
        className="search-dialog fixed h-full max-h-full w-full max-w-full border border-zinc-400 bg-white dark:bg-[#0a0910ec] shadow backdrop:backdrop-blur sm:mx-auto sm:mb-auto sm:mt-16 sm:h-max sm:max-h-[calc(100%-8rem)] sm:min-h-[15rem] sm:w-5/6 sm:rounded-md opacity-0 z-50"
      >
        <div className="dialog-frame flex flex-col gap-4 p-6 pt-12 sm:pt-6">
          <button
            onClick={closeDialog}
            className="ms-auto cursor-pointer rounded-full bg-black text-white px-4 py-2 dark:bg-white dark:text-black hover:opacity-90 transition-opacity duration-200"
          >
            Close
          </button>

          {import.meta.env.DEV ? (
            <div className="mx-auto text-center dark:text-white">
              <p>
                Search is only available in production builds. <br />
                Try building and previewing the site to test it out locally.
              </p>
            </div>
          ) : (
            <div id="pagefind-search" className="pagefind-ui">
              <div className="search-loading hidden">Loading search...</div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default Search;
