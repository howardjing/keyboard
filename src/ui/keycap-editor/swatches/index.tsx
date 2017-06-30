import * as React from 'react';
import styled from 'styled-components';
import Swatch from './swatch';

const gmk = {
  'CR': '#171718',
  'N9': '#393b3b',
  'CC': '#67635b',
  '2B': '#727474',
  'BJ': '#91867a',
  'CB': '#9b9284',
  'U9': '#aca693',
  'L9': '#d8d2c3',
  'T9': '#c3c3ba',
  '3K': '#ccc6c0',
  '2M': '#c6c9c7',
  'GR1': '#c5c7ca',
  'CP': '#e1dbd1',
  'WS1': '#f7f2ea',
  'BR1': '#653c25',
  'N7': '#00773a',
  'AE': '#689b34',
  '3B': '#768e72',
  '3A': '#7fa580',
  'V4': '#00589f',
  'N5': '#0084c2',
  'TU1': '#00627a',
  'TU2': '#00a4a9',
  'DY': '#5d437e',
  'RO1': '#8d242f',
  'P3': '#bc251e',
  'V1': '#d02f1c',
  'RO2': '#dd1126',
  '3C': '#c87e74',
  'MG1': '#cb3d6e',
  'V2': '#ee6d00',
  'N6': '#e5a100',
  'CV': '#f8c200',
  'GE1': '#ebd400',
};

const gmkKeys = Object.keys(gmk);

interface PropTypes {
  onClick: (color: string) => any,
}

const Swatches: React.SFC<PropTypes> = ({
  onClick,
}) => (
  <div>
    <div>
      GMK
        <List>
          {gmkKeys.map((key) => {
            const color = gmk[key];
            return (
              <Li
                key={key}
              >
                <Swatch color={color} onClick={onClick} />
                {key}
              </Li>
            )
          })}
        </List>
    </div>
  </div>
);

const List = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  margin-right: 5px;
`;

export default Swatches;
