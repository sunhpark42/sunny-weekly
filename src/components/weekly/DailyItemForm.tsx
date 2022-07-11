import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { DAILY_ITEM_WIDTH } from "../../constants/template";
import COLORS from "../../enumerations/colors";

const Wrapper = styled.form<{ isOpen: boolean }>`
  width: ${DAILY_ITEM_WIDTH};
  overflow: hidden;

  background-color: ${COLORS.WHITE};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  ${({ isOpen }) =>
    isOpen
      ? css`
          height: 48px;
        `
      : css`
          height: 0px;
        `}

  transition: height 100ms ease-in-out;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 10px;

  border: 0;
  outline: 0;

  color: #363636;

  ::placeholder {
    color: #d5d5d5;
  }

  :focus {
    background-color: #e5e5e5;
  }
`;

interface DailyItemFormProps {
  isOpen: boolean;
  onSubmit: (text: string) => void;
  onExit?: () => void;
}

const DailyItemForm = ({ isOpen, onSubmit, onExit }: DailyItemFormProps) => {
  const [inputText, setInputText] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Wrapper
      isOpen={isOpen}
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit(inputText);
        setInputText("");
      }}
    >
      <Input
        ref={inputRef}
        placeholder="할 일을 입력하세요"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setInputText("");
            onExit?.();
          }
        }}
      />
    </Wrapper>
  );
};

export default DailyItemForm;
