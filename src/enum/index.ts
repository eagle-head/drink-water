/* istanbul ignore file */

const VOLUME_UNIT = {
  ML: "mL",
  FL: "fl oz",
} as const;

export type VolumeUnit = ObjectValues<typeof VOLUME_UNIT>;

export const ROUTES = {
  HOME: "Home",
  HISTORY: "History",
  SETTINGS: "Settings",
} as const;
