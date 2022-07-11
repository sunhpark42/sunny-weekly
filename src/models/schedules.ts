import Day from "../enumerations/day";

export type Task = {
  id: number;
  text: string;
  colorIndex: string;
  isChecked: boolean;
};

export type Schedule = {
  id: number;
  date: Date;
  day: Day;
  tasks: Task[];
};
