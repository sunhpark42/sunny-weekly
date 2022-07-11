import Day from "../enumerations/day";
import { Schedule } from "../models/schedules";
import { idGenerator } from "../utils/idGenerator";

const aDay = 1000 * 3600 * 24;

export const getAWeekSchedules = (startDate = new Date()): Schedule[] => {
  return Array.from({ length: 7 }).map((_, index) => {
    const currDay = new Date(startDate.valueOf() + aDay * index);
    const dayIndex = currDay.getDay();

    return {
      id: idGenerator.getId({ type: "DAILY" }),
      date: currDay,
      colorIndex: "white",
      day: Day[dayIndex] as unknown as Day,
      tasks: [],
    };
  });
};
