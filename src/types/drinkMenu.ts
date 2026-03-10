export type DrinkMenuItem = {
  id: string;
  name: string;
  price: string;
  isVisible: boolean;
  openBottleProductId?: string | null;
};

export type DrinkMenuSection = {
  id: string;
  sectionCode: string;
  title: string;
  isVisible: boolean;
  items: DrinkMenuItem[];
};

export type SiteSettings = {
  drink_menu_sections: DrinkMenuSection[];
  open_bottles: Record<string, unknown> | null;
  promo_open_bottle_product_id: string | null;
};