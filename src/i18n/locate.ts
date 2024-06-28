

export const Astro = {
    currentLocale: obtenerLocale(), // Establecer el valor del locale al obtenerlo
  };
  
  function obtenerLocale(): string {
    // Lógica para obtener el locale desde localStorage, cookies, u otra fuente
    return 'es'; // Por ejemplo, devolver 'es' como valor predeterminado
  }
  
  console.log("Current Locale:", Astro.currentLocale); // Para verificar que se establezca correctamente
  