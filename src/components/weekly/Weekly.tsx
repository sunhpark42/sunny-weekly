import styled from "styled-components";
import { Schedule, Task } from "../../models/schedules";
import DailyHeader from "./DailyHeader";
import DailyList from "./DailyList";

const Wrapper = styled.ul`
  display: flex;
`;

interface WeeklyProps {
  schedules: Schedule[];
  addTask: (id: number, task: Task) => void;
  toggleCheckbox: (id: number, taskId: number) => void;
  deleteTask: (id: number, taskId: number) => void;
  updateTask: (id: number, taskId: number, text: string) => void;
  updateTaskColorIndex: (
    id: number,
    taskId: number,
    colorIndex: string
  ) => void;
}

const Weekly = ({
  schedules,
  addTask,
  toggleCheckbox,
  deleteTask,
  updateTask,
  updateTaskColorIndex,
}: WeeklyProps) => {
  return (
    <Wrapper>
      {schedules.map(({ id, day, date, tasks }) => (
        <li key={id}>
          <DailyHeader day={day} date={date} />
          <DailyList
            tasks={tasks}
            addTask={(task) => addTask(id, task)}
            toggleCheckbox={(taskId) => toggleCheckbox(id, taskId)}
            deleteTask={(taskId) => deleteTask(id, taskId)}
            updateTask={(taskId, text) => updateTask(id, taskId, text)}
            updateTaskColorIndex={(taskId, colorIndex) =>
              updateTaskColorIndex(id, taskId, colorIndex)
            }
          />
        </li>
      ))}
    </Wrapper>
  );
};

export default Weekly;
