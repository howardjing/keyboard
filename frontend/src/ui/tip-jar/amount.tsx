import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import toDollars from './to-dollars';

type PropTypes = {
  active: boolean,
  onClick: () => any,
  children: any,
};

const Amount: React.SFC<PropTypes> = ({
  children,
  active,
  onClick,
}) => {
  return (
    <Wrapper onClick={onClick} active={active}>
      {children}
    </Wrapper>
  );
};

const GREEN = '#88ee88';
const DARK_GREEN = darken(0.4, GREEN);

const Wrapper = styled.div`
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  margin: 10px 10px 10px 0;
  background-color: ${({ active }: { active: boolean }) =>
    active ? DARK_GREEN : GREEN};
  text-align: center;
  padding: 10px;
  border-radius: 2px;
  min-width: 50px;
  height: 40px;
`;

export default Amount;
