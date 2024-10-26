declare module '@pagefind/default-ui' {
  export class PagefindUI {
    constructor(options: {
      element: string;
      showImages?: boolean;
      bundlePath?: string;
      baseUrl?: string;
    });
  }
}
