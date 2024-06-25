import { s as createAstro, t as createComponent, u as renderTemplate, C as renderComponent, v as maybeRenderHead, w as addAttribute, E as renderSlot } from './astro/server_Dluq3R61.mjs';
import { $ as $$Header, M as MainNavigationMenu, S as SheetMobileNav, n as navMenuConfig, a as $$Footer } from './sheet-mobile-nav_ddfps_DF.mjs';
import { s as siteConfig, $ as $$Icon, T as ThemeToggle, a as cn, d as $$BaseLayout } from './base-layout_CTLW2O-Y.mjs';

const $$Astro = createAstro("https://desci-latam-website-git-header-descilatam.vercel.app");
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title, description, mainClass } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "className": "border-b" }, { "left-header": ($$result3) => renderTemplate`${renderComponent($$result3, "MainNavigationMenu", MainNavigationMenu, { "slot": "left-header", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/main-navigation-menu", "client:component-export": "MainNavigationMenu" })}`, "mobile-nav-header": ($$result3) => renderTemplate`${renderComponent($$result3, "SheetMobileNav", SheetMobileNav, { "mainNavItems": [...navMenuConfig.links], "sidebarNavItems": [
    ...navMenuConfig.pagesNav,
    ...navMenuConfig.examplesNav
  ], "slot": "mobile-nav-header", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/layout/sheet-mobile-nav", "client:component-export": "SheetMobileNav" })}`, "right-header": ($$result3) => renderTemplate`${maybeRenderHead()}<div class="flex items-center gap-x-4"> <a${addAttribute(siteConfig.links.github, "href")} target="_blank" rel="noreferrer" aria-label="github"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "github", "class": "size-[22px]" })} </a> ${renderComponent($$result3, "ThemeToggle", ThemeToggle, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/theme-toggle", "client:component-export": "ThemeToggle" })} </div>` })} <main${addAttribute(cn(mainClass), "class")}> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/home/nahue/Documents/Repositories/desci-latam-website/src/layouts/main-layout.astro", void 0);

export { $$MainLayout as $ };
