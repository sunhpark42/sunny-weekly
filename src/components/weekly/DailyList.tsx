import { useState } from "react";
import styled, { css } from "styled-components";
import { COMPLETE_COLOR } from "../../constants/template";
import COLORS from "../../enumerations/colors";
import { Task } from "../../models/schedules";
import { idGenerator } from "../../utils/idGenerator";
import DailyItem from "./DailyItem";
import DailyItemForm from "./DailyItemForm";

const Wrapper = styled.ul`
  > *:not(:last-child) {
    margin-bottom: 1px;
  }
`;

const AddButton = styled.button<{ isAdding: boolean }>`
  width: 28px;
  height: 28px;
  margin: 10px 0;

  background-color: ${COLORS.WHITE};
  border: 0;
  border-radius: 50%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  font-size: 20px;

  :hover {
    background-color: #d5d5d5;
  }

  transition: transform 300ms ease-in-out;
  ${({ isAdding }) =>
    isAdding &&
    css`
      transform: rotate(45deg);
    `}
`;

const Tools = styled.div`
  position: relative;
`;

const Counter = styled.div<{ isComplete: boolean }>`
  padding: 8px 10px;
  margin-right: 1px;

  background-color: #dddddd;

  font-size: 16x;

  ${({ isComplete }) =>
    isComplete &&
    css`
      background-color: ${COMPLETE_COLOR};
    `}
`;

interface DailyListProps {
  addTask: (task: Task) => void;
  toggleCheckbox: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  updateTask: (taskId: number, text: string) => void;
  tasks: Task[];
}

const DailyList = ({
  tasks,
  addTask,
  toggleCheckbox,
  deleteTask,
  updateTask,
}: DailyListProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const completeTasksCount = tasks.reduce(
    (prev, curr) => prev + (curr.isChecked ? 1 : 0),
    0
  );

  return (
    <Wrapper>
      {tasks.map(({ id, text, isChecked }) => (
        <DailyItem
          key={id}
          text={text}
          isChecked={isChecked}
          toggleCheckbox={() => {
            toggleCheckbox(id);
          }}
          onDelete={() => {
            deleteTask(id);
          }}
          updateTask={(text) => {
            updateTask(id, text);
          }}
        />
      ))}
      <li>
        <DailyItemForm
          isOpen={isAdding}
          onSubmit={(text) => {
            if (text.length > 0) {
              addTask({
                id: idGenerator.getId({ type: "TASK" }),
                text,
                isChecked: false,
              });
            }
            setIsAdding(false);
          }}
          onExit={() => {
            setIsAdding(false);
          }}
        />
      </li>
      <Tools>
        <Counter
          isComplete={tasks.length > 0 && completeTasksCount === tasks.length}
        >
          Total: {completeTasksCount} / {tasks.length}
        </Counter>
        <AddButton
          type="button"
          isAdding={isAdding}
          onClick={() => setIsAdding((prev) => !prev)}
        >
          +
        </AddButton>
      </Tools>
    </Wrapper>
  );
};

export default DailyList;
