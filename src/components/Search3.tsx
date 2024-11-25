import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";

interface SearchProps {
  className?: string;
}

export default function Search({ className }: SearchProps) {
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null);

  useEffect(() => {
    // Establecer el diálogo inicial
    const dialogElement = document.getElementById('search-dialog') as HTMLDialogElement;
    if (dialogElement) {
      setDialog(dialogElement);
    }

    // Volver a buscar el diálogo después de la navegación
    const handlePageLoad = () => {
      const newDialog = document.getElementById('search-dialog') as HTMLDialogElement;
      if (newDialog) {
        setDialog(newDialog);
      }
    };

    document.addEventListener('astro:page-load', handlePageLoad);
    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

  const handleClick = () => {
    console.log('Search button clicked');
    if (dialog) {
      console.log('Dialog found, opening...');
      dialog.showModal();
      requestAnimationFrame(() => {
        dialog.classList.remove('opacity-0');
      });
      document.body.classList.add('overflow-hidden');
    } else {
      console.error('Dialog not found');
      // Intentar encontrar el diálogo de nuevo
      const dialogElement = document.getElementById('search-dialog') as HTMLDialogElement;
      if (dialogElement) {
        setDialog(dialogElement);
        dialogElement.showModal();
        requestAnimationFrame(() => {
          dialogElement.classList.remove('opacity-0');
        });
        document.body.classList.add('overflow-hidden');
      }
    }
  };

  return (
    <div id="search-container" className={`ms-auto ${className}`}>
      <button
        onClick={handleClick}
        className="search-button flex items-center justify-center rounded-md gap-1 pr-4 p-0 text-muted-foreground hover:scale-125 dark:hover:text-primary transition-transform duration-200"
        aria-label="Buscar"
      >
        <IoSearch className="w-5 h-5" />
      </button>
    </div>
  );
}