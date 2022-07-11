import {
  getLocalStorageItem,
  LOCAL_STORAGE_KEY,
  setLocalStorageItem,
} from "./localStorage";

export const idGenerator = (() => {
  let taskId =
    getLocalStorageItem<number>(LOCAL_STORAGE_KEY.TASKS_LAST_INDEX) ?? 0;

  let dailyId =
    getLocalStorageItem<number>(LOCAL_STORAGE_KEY.DAILY_LAST_INDEX) ?? 0;

  const getId = ({ type }: { type: "TASK" | "DAILY" }) => {
    if (type === "TASK") {
      taskId++;
      setLocalStorageItem(LOCAL_STORAGE_KEY.TASKS_LAST_INDEX, taskId);

      return taskId;
    } else {
      dailyId++;
      console.log(dailyId);
      setLocalStorageItem(LOCAL_STORAGE_KEY.DAILY_LAST_INDEX, dailyId);

      return dailyId;
    }
  };

  return { getId };
})();
