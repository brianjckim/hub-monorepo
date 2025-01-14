import { StoreType } from "./protobufs";

// Default link store limit should be 2500. Pick a date in the future to update the limit so hubs will
// stay in sync between versions
const LINKS_LIMIT_FIX_DATE = new Date("2023-09-20").getTime();

const CASTS_SIZE_LIMIT_DEFAULT = 5_000;
const LINKS_SIZE_LIMIT_DEFAULT = 1_250;
const REACTIONS_SIZE_LIMIT_DEFAULT = 2_500;
const USER_DATA_SIZE_LIMIT_DEFAULT = 50;
const USERNAME_PROOFS_SIZE_LIMIT_DEFAULT = 5;
const VERIFICATIONS_SIZE_LIMIT_DEFAULT = 25;

export const getStoreLimits = (units: number) => [
  {
    storeType: StoreType.CASTS,
    limit: getDefaultStoreLimit(StoreType.CASTS) * units,
  },
  {
    storeType: StoreType.LINKS,
    limit: getDefaultStoreLimit(StoreType.LINKS) * units,
  },
  {
    storeType: StoreType.REACTIONS,
    limit: getDefaultStoreLimit(StoreType.REACTIONS) * units,
  },
  {
    storeType: StoreType.USER_DATA,
    limit: getDefaultStoreLimit(StoreType.USER_DATA) * units,
  },
  {
    storeType: StoreType.USERNAME_PROOFS,
    limit: getDefaultStoreLimit(StoreType.USERNAME_PROOFS) * units,
  },
  {
    storeType: StoreType.VERIFICATIONS,
    limit: getDefaultStoreLimit(StoreType.VERIFICATIONS) * units,
  },
];
export const getDefaultStoreLimit = (storeType: StoreType) => {
  switch (storeType) {
    case StoreType.CASTS:
      return CASTS_SIZE_LIMIT_DEFAULT;
    case StoreType.LINKS:
      return Date.now() > LINKS_LIMIT_FIX_DATE ? LINKS_SIZE_LIMIT_DEFAULT * 2 : LINKS_SIZE_LIMIT_DEFAULT;
    case StoreType.REACTIONS:
      return REACTIONS_SIZE_LIMIT_DEFAULT;
    case StoreType.USER_DATA:
      return USER_DATA_SIZE_LIMIT_DEFAULT;
    case StoreType.USERNAME_PROOFS:
      return USERNAME_PROOFS_SIZE_LIMIT_DEFAULT;
    case StoreType.VERIFICATIONS:
      return VERIFICATIONS_SIZE_LIMIT_DEFAULT;
    default:
      throw new Error(`Unknown store type: ${storeType}`);
  }
};
