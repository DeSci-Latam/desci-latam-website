import { s as createAstro, t as createComponent, u as renderTemplate, w as addAttribute } from './astro/server_Dluq3R61.mjs';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro("https://desci-latam-website-git-header-descilatam.vercel.app");
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/home/nahue/Documents/Repositories/desci-latam-website/node_modules/.pnpm/astro@4.11.0_typescript@5.5.2/node_modules/astro/components/ViewTransitions.astro", void 0);

export { $$ViewTransitions as $ };
