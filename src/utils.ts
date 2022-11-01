export const horizontalSpacing = 300;
export const verticalSpacing = 100;

export const clickhouseId = "clickhouseId";
export const newSourceId = "newSourceId";
export const newDestinationId = "newDestinationId";

export const uuid = (): string =>
  new Date().getTime().toString(36) + Math.random().toString(36).slice(2);

const emojis = [
  "Remove PII",
  "Drop Specific Events",
  "Drop Properties",
  "Clearbit Enrichment",
  "Downsample",
];

export const randomLabel = (): string => {
  return emojis[~~(Math.random() * emojis.length)];
};
