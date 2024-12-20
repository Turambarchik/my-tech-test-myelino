import React from "react";
import styled from "styled-components/native";


type BulletPointProps = {
  color: string;
};

export const BulletPoint: React.FC<BulletPointProps> = ({ color }) => {
  return (
    <OuterCircle>
      <InnerCircle color={color} />
    </OuterCircle>
  );
};

const OuterCircle = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  border-width: 2px;
  border-color: #c6cbcb;
  align-items: center;
  justify-content: center;
`;

const InnerCircle = styled.View<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`;
