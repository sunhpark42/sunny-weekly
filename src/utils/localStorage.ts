export const LOCAL_STORAGE_KEY = {
  SCHEDULES: "SCHEDULES",
  TASKS_LAST_INDEX: "TASKS_LAST_INDEX",
  DAILY_LAST_INDEX: "DAILY_LAST_INDEX",
} as const;

export const getLocalStorageItem = <T>(
  key: keyof typeof LOCAL_STORAGE_KEY
): T | null => {
  const item = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  try {
    const json = JSON.parse(item);
    return json;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const setLocalStorageItem = (
  key: keyof typeof LOCAL_STORAGE_KEY,
  item: any
) => {
  try {
    const stringifyJson = JSON.stringify(item);
    localStorage.setItem(key, stringifyJson);
  } catch (error) {
    console.log(error);
  }
};
