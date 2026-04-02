export const LOYALTY_APP_URL = "https://spaarkaart.cozy-moments.be/";
export const CONTACT_EMAIL = "info@cozy-moments.be";
export const CONTACT_PHONE = "050 73 16 16";
export const CONTACT_PHONE_CLEAN = "050731616";
export const ADDRESS_LINE_1 = "Grote Markt 2/0002";
export const ADDRESS_LINE_2 = "8370 Blankenberge, Belgium";
export const MAP_EMBED_SRC = "https://www.google.com/maps?q=Sixtines%2C%20Blankenberge&z=18&output=embed";
export const PROMO_ROTATION_INTERVAL_MS = 10_000;

/** Single source of truth for opening hours.
 *  Ordered Monday → Sunday (index 0 = Monday).
 *  `hours: null` means the location is closed that day.
 */
export type OpeningHour = { label: string; hours: string | null };
export const OPENING_HOURS: OpeningHour[] = [
  { label: 'Maandag',   hours: null },
  { label: 'Dinsdag',   hours: null },
  { label: 'Woensdag',  hours: null },
  { label: 'Donderdag', hours: '10:30 – 18:00' },
  { label: 'Vrijdag',   hours: '10:30 – 18:00' },
  { label: 'Zaterdag',  hours: '10:30 – 18:00' },
  { label: 'Zondag',    hours: '10:30 – 18:00' },
];
export const OPENING_HOURS_NOTE = 'Openingsuren kunnen variëren op feest- en schoolvakantiesdagen.';
