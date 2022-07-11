import styled from "styled-components";
import { COMPLETE_COLOR } from "../../constants/template";
import COLORS from "../../enumerations/colors";

const Wrapper = styled.header`
  height: 48px;

  background-color: ${COMPLETE_COLOR};

  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

interface HeaderProps {
  content: string;
}

const Header = ({ content }: HeaderProps) => {
  return (
    <Wrapper>
      <Title>{content}</Title>
    </Wrapper>
  );
};

export default Header;
