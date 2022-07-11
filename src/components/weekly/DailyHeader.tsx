import React from "react";
import styled from "styled-components";
import { DAILY_ITEM_WIDTH } from "../../constants/template";
import COLORS from "../../enumerations/colors";
import Day from "../../enumerations/day";

const Wrapper = styled.div`
  width: ${DAILY_ITEM_WIDTH};
  padding: 10px 0;
  margin-right: 1px;
  margin-bottom: 1px;

  position: sticky;
  top: 0;

  background-color: ${COLORS.WHITE};
`;

const DayArea = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const DateArea = styled.h3`
  font-size: 14px;
  color: #aeaeae;
  line-height: 1.25;
`;

interface DailyHeaderProps {
  day: Day;
  date: Date;
}

const DailyHeader = ({ day, date }: DailyHeaderProps) => {
  return (
    <Wrapper>
      <DayArea>{day}</DayArea>
      <DateArea>{date.toLocaleDateString()}</DateArea>
    </Wrapper>
  );
};

export default DailyHeader;
