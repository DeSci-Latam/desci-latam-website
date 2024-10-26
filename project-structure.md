# Estructura del Proyecto DeSci Latam

```
├── src/                      # Código fuente principal
│   ├── content/             # Contenido del sitio
│   │   ├── blog/           # Posts del blog
│   │   ├── docs/           # Documentación
│   │   ├── funding/        # Contenido sobre financiamiento
│   │   └── config.ts       # Configuración del contenido
│   │
│   ├── pages/              # Rutas y páginas del sitio
│   │   └── [lang]/         # Páginas por idioma
│   │
│   ├── components/         # Componentes reutilizables
│   │   ├── ui/            # Componentes de UI básicos
│   │   ├── layout/        # Componentes de estructura
│   │   └── sections/      # Secciones de página
│   │
│   ├── layouts/           # Plantillas de página
│   │   ├── Base.astro     # Layout base
│   │   └── blog-post.astro # Layout para posts
│   │
│   ├── i18n/              # Internacionalización
│   │   ├── locate.ts      # Lógica de localización
│   │   └── ui.ts          # Traducciones de UI
│   │
│   └── assets/            # Recursos estáticos del código
│       ├── icons/         # Iconos
│       └── images/        # Imágenes
│
├── public/                 # Archivos públicos estáticos
│   ├── images/            # Imágenes públicas
│   └── fonts/             # Fuentes tipográficas
│
└── backup/                # Respaldos de contenido
    ├── en/               # Contenido en inglés
    ├── es/               # Contenido en español
    └── pt/               # Contenido en portugués

Archivos de Configuración Principales:
- astro.config.mjs        # Configuración de Astro
- tailwind.config.js      # Configuración de Tailwind CSS
- tsconfig.json           # Configuración de TypeScript
- package.json            # Dependencias y scripts
```

## Puntos Clave

1. **Multilenguaje**: El sitio maneja contenido en inglés (en), español (es) y portugués (pt)
2. **Arquitectura**: Usa Astro como framework principal con TypeScript
3. **Contenido**: Organizado en diferentes secciones (blog, docs, funding)
4. **Estilos**: Utiliza Tailwind CSS para el diseño
5. **Componentes**: Estructura modular con componentes reutilizables
