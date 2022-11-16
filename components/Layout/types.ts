export type HeaderItem = {
  label: string;
  handle?: string;
  imageSrc?: string;
}

export type FooterItems = {
  footer_social_media_links: string[];
  footer_site_description: string;
  footer_copyright_text: string;
  footer_menu_items: FooterMenuItem[];
}

export type FooterMenuItem = {
  name: string;
  child: FooterMenuItemChild[];
}

export type FooterMenuItemChild = {
  label: string;
  handle: string | string[];
}
