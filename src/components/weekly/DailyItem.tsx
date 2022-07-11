import { useState } from "react";
import styled, { css } from "styled-components";
import { DAILY_ITEM_WIDTH } from "../../constants/template";
import COLORS from "../../enumerations/colors";
import DailyItemForm from "./DailyItemForm";

const DeleteButton = styled.button`
  width: 22px;
  height: 22px;

  background-color: #ffb2b2;
  border: 0;
  border-radius: 50%;

  font-size: 10px;
  color: ${COLORS.WHITE};
  line-height: 0;
`;

const Wrapper = styled.li`
  width: ${DAILY_ITEM_WIDTH};
  min-height: 48px;
  padding-left: 10px;

  background-color: ${COLORS.WHITE};

  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-column-gap: 4px;
  justify-items: center;
  align-items: center;

  position: relative;

  ${DeleteButton} {
    opacity: 0;

    :focus {
      opacity: 1;
    }
  }

  :hover ${DeleteButton} {
    opacity: 1;
  }
`;

const Checkbox = styled.label<{ isChecked: boolean; color?: string }>`
  width: 22px;
  height: 22px;

  border: 1px solid #d4d4d4;
  border-radius: 4px;

  cursor: pointer;

  transition: background-color 80ms ease-in-out;

  /* TODO: 추후 아이콘으로 변경  */
  ${({ isChecked, color }) =>
    isChecked
      ? css`
          background-color: ${color ? color : "#cecece"};

          position: relative;

          ::after {
            content: "V";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            color: ${color ? "black" : COLORS.WHITE};
          }
        `
      : css`
          background-color: ${color ? color : "transparent"};
        `}

  input {
    width: 0;
    height: 0;
  }
`;

const Text = styled.p<{ isChecked: boolean }>`
  width: 100%;
  color: #363636;

  ${({ isChecked }) =>
    isChecked &&
    css`
      text-decoration: line-through;
    `}
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const TextInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 10px;

  border: 0;
  outline: 0;

  ::placeholder {
    color: #d5d5d5;
  }

  :focus {
    background-color: #e5e5e5;
  }
`;

const ColorIndex = styled.button<{ color: string }>`
  width: 8px;
  height: 100%;

  background-color: ${({ color }) => color};
  border: 0;

  position: absolute;
  top: 0;
  left: 0;
`;

const ColorSelectPopup = styled.div`
  width: 200px;

  padding: 5px;

  background-color: ${COLORS.WHITE};
  border-radius: 4px;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);

  display: flex;
  column-gap: 2px;

  position: absolute;
  top: 80%;
  left: 8px;

  z-index: 2;
`;

const colorIndexes = [
  { color: "#ff7b7b", name: "red" },
  { color: "#ffbc48", name: "orange" },
  { color: "#fffd82", name: "yellow" },
  { color: "#7bd18e", name: "green" },
  { color: "#97e4f0", name: "skyblue" },
  { color: "#4050ff", name: "blue" },
  { color: "#c265fc", name: "purple" },
  { color: "#ffffff", name: "white" },
];
interface DailyItemProps {
  text: string;
  isChecked: boolean;
  colorIndex: string; // #ffffff
  onDelete: () => void;
  toggleCheckbox: () => void;
  updateTask: (text: string) => void;
  updateTaskColorIndex: (colorIndex: string) => void;
}

const DailyItem = ({
  text,
  isChecked,
  colorIndex,
  onDelete,
  toggleCheckbox,
  updateTask,
  updateTaskColorIndex,
}: DailyItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(text);

  const [isColorSelectPopupOpen, setIsColorSelectPopupOpen] = useState(false);

  return (
    <Wrapper>
      <ColorIndex
        color={
          colorIndexes.find((index) => index.name === colorIndex)?.color ??
          COLORS.WHITE
        }
        onClick={() => setIsColorSelectPopupOpen(true)}
      />
      {isColorSelectPopupOpen && (
        <ColorSelectPopup>
          {colorIndexes.map((item) => (
            <Checkbox
              key={item.name}
              isChecked={colorIndex === item.name}
              color={item.color}
            >
              <input
                type="checkbox"
                onChange={() => {
                  updateTaskColorIndex(item.name);
                  setIsColorSelectPopupOpen(false);
                }}
              />
            </Checkbox>
          ))}
        </ColorSelectPopup>
      )}
      <Checkbox isChecked={isChecked} tabIndex={0}>
        <input type="checkbox" onChange={toggleCheckbox} />
      </Checkbox>
      {isEditing ? (
        <Form
          onSubmit={(event) => {
            event.preventDefault();

            updateTask(inputText);
            setIsEditing(false);
          }}
        >
          <TextInput
            autoFocus
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onBlur={() => {
              updateTask(inputText);
              setIsEditing(false);
            }}
            placeholder="할 일을 입력하세요"
          />
        </Form>
      ) : (
        <Text isChecked={isChecked} onClick={() => setIsEditing(true)}>
          {text}
        </Text>
      )}

      <DeleteButton type="button" onClick={onDelete}>
        X
      </DeleteButton>
    </Wrapper>
  );
};

export default DailyItem;
