import { useState } from "react";
import "./App.css";
import Header from "./components/shared/Header";
import { Schedule, Task } from "./models/schedules";
import Weekly from "./components/weekly/Weekly";
import {
  getLocalStorageItem,
  LOCAL_STORAGE_KEY,
  setLocalStorageItem,
} from "./utils/localStorage";
import { getAWeekSchedules } from "./service/computedServices";
import styled from "styled-components";

type User = {
  id: number;
  name: string;
};

const Main = styled.main`
  position: relative;
`;

function App() {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "Sunny",
  });
  const localSchedules =
    getLocalStorageItem<Schedule[]>(LOCAL_STORAGE_KEY.SCHEDULES)?.map(
      (schedule) => ({ ...schedule, date: new Date(schedule.date) })
    ) || [];

  const [schedules, setSchedules] = useState<Schedule[]>(
    localSchedules.length > 0 ? localSchedules : getAWeekSchedules()
  );

  const addTask = (id: number, task: Task) => {
    const targetDay = schedules.findIndex((schedule) => schedule.id === id);

    if (targetDay === -1) {
      console.warn("해당하는 날짜가 없습니다.");
      return;
    }

    const newSchedule = {
      ...schedules[targetDay],
      tasks: [...schedules[targetDay].tasks, task],
    };

    const newSchedules = [
      ...schedules.slice(0, targetDay),
      newSchedule,
      ...schedules.slice(targetDay + 1),
    ];

    setSchedules(newSchedules);
    setLocalStorageItem(LOCAL_STORAGE_KEY.SCHEDULES, newSchedules);
  };

  const toggleCheckbox = (id: number, taskId: number) => {
    const targetDayIndex = schedules.findIndex(
      (schedule) => schedule.id === id
    );
    const targetDay = schedules[targetDayIndex];
    const targetTaskIndex = targetDay.tasks.findIndex(
      (task) => task.id === taskId
    );

    if (targetDayIndex === -1 || targetTaskIndex === -1) {
      console.warn("해당하는 항목이 없습니다.");
      return;
    }

    const newSchedule = {
      ...targetDay,
      tasks: [
        ...targetDay.tasks.slice(0, targetTaskIndex),
        {
          ...targetDay.tasks[targetTaskIndex],
          isChecked: !targetDay.tasks[targetTaskIndex].isChecked,
        },
        ...targetDay.tasks.slice(targetTaskIndex + 1),
      ],
    };

    const newSchedules = [
      ...schedules.slice(0, targetDayIndex),
      newSchedule,
      ...schedules.slice(targetDayIndex + 1),
    ];

    setSchedules(newSchedules);
    setLocalStorageItem(LOCAL_STORAGE_KEY.SCHEDULES, newSchedules);
  };

  const deleteTask = (id: number, taskId: number) => {
    const targetDayIndex = schedules.findIndex(
      (schedule) => schedule.id === id
    );
    const targetDay = schedules[targetDayIndex];
    const targetTaskIndex = targetDay.tasks.findIndex(
      (task) => task.id === taskId
    );

    if (targetDayIndex === -1 || targetTaskIndex === -1) {
      console.warn("해당하는 항목이 없습니다.");
      return;
    }

    const newSchedule = {
      ...targetDay,
      tasks: [
        ...targetDay.tasks.slice(0, targetTaskIndex),
        ...targetDay.tasks.slice(targetTaskIndex + 1),
      ],
    };

    const newSchedules = [
      ...schedules.slice(0, targetDayIndex),
      newSchedule,
      ...schedules.slice(targetDayIndex + 1),
    ];

    setSchedules(newSchedules);
    setLocalStorageItem(LOCAL_STORAGE_KEY.SCHEDULES, newSchedules);
  };

  const updateTask = (id: number, taskId: number, text: string) => {
    const targetDayIndex = schedules.findIndex(
      (schedule) => schedule.id === id
    );
    const targetDay = schedules[targetDayIndex];
    const targetTaskIndex = targetDay.tasks.findIndex(
      (task) => task.id === taskId
    );

    if (targetDayIndex === -1 || targetTaskIndex === -1) {
      console.warn("해당하는 항목이 없습니다.");
      return;
    }

    const newSchedule = {
      ...targetDay,
      tasks: [
        ...targetDay.tasks.slice(0, targetTaskIndex),
        {
          ...targetDay.tasks[targetTaskIndex],
          text,
        },
        ...targetDay.tasks.slice(targetTaskIndex + 1),
      ],
    };

    const newSchedules = [
      ...schedules.slice(0, targetDayIndex),
      newSchedule,
      ...schedules.slice(targetDayIndex + 1),
    ];

    setSchedules(newSchedules);
    setLocalStorageItem(LOCAL_STORAGE_KEY.SCHEDULES, newSchedules);
  };

  const updateTaskColorIndex = (
    id: number,
    taskId: number,
    colorIndex: string
  ) => {
    const targetDayIndex = schedules.findIndex(
      (schedule) => schedule.id === id
    );
    const targetDay = schedules[targetDayIndex];
    const targetTaskIndex = targetDay.tasks.findIndex(
      (task) => task.id === taskId
    );

    if (targetDayIndex === -1 || targetTaskIndex === -1) {
      console.warn("해당하는 항목이 없습니다.");
      return;
    }

    const newSchedule = {
      ...targetDay,
      tasks: [
        ...targetDay.tasks.slice(0, targetTaskIndex),
        {
          ...targetDay.tasks[targetTaskIndex],
          colorIndex,
        },
        ...targetDay.tasks.slice(targetTaskIndex + 1),
      ],
    };

    const newSchedules = [
      ...schedules.slice(0, targetDayIndex),
      newSchedule,
      ...schedules.slice(targetDayIndex + 1),
    ];

    setSchedules(newSchedules);
    setLocalStorageItem(LOCAL_STORAGE_KEY.SCHEDULES, newSchedules);
  };

  return (
    <div className="App">
      <Header content={`${user.name}'s Weekly`} />
      <Main>
        <Weekly
          schedules={schedules}
          addTask={addTask}
          toggleCheckbox={toggleCheckbox}
          deleteTask={deleteTask}
          updateTask={updateTask}
          updateTaskColorIndex={updateTaskColorIndex}
        />
      </Main>
      <footer></footer>
    </div>
  );
}

export default App;
