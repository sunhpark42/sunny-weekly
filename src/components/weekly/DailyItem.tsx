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

  background-color: ${COLORS.WHITE};

  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-column-gap: 4px;
  justify-items: center;
  align-items: center;

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

const Checkbox = styled.label<{ isChecked: boolean }>`
  width: 22px;
  height: 22px;

  border: 1px solid #d4d4d4;
  border-radius: 4px;

  cursor: pointer;

  transition: background-color 80ms ease-in-out;

  /* TODO: 추후 아이콘으로 변경  */
  ${({ isChecked }) =>
    isChecked
      ? css`
          background-color: #cecece;

          position: relative;

          ::after {
            content: "V";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            color: ${COLORS.WHITE};
          }
        `
      : css`
          background-color: transparent;
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

interface DailyItemProps {
  text: string;
  isChecked: boolean;
  onDelete: () => void;
  toggleCheckbox: () => void;
  updateTask: (text: string) => void;
}

const DailyItem = ({
  text,
  isChecked,
  onDelete,
  toggleCheckbox,
  updateTask,
}: DailyItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(text);

  return (
    <Wrapper>
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
