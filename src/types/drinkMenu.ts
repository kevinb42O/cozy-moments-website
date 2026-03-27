export type DrinkMenuItem = {
  id: string;
  name: string;
  price: string;
  isVisible: boolean;
  openBottleProductId?: string | null;
};

export type DrinkMenuGroup = {
  id: string;
  title: string;
  itemIds: string[];
};

export type DrinkMenuSection = {
  id: string;
  sectionCode: string;
  title: string;
  isVisible: boolean;
  items: DrinkMenuItem[];
  groups?: DrinkMenuGroup[];
};

export type ActivePromo = {
  productId: string;
  promoMessage: string;
  drinkMenuItemIds: string[];
};

export type SiteSettings = {
  drink_menu_sections: DrinkMenuSection[];
  open_bottles: Record<string, unknown> | null;
  promo_open_bottle_product_id: string | null;
  promo_drink_menu_item_ids: string[];
  active_promos: ActivePromo[];
};