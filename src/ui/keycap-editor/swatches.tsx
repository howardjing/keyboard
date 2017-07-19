import * as React from 'react';
import * as Color from 'color';
import styled from 'styled-components';
import Swatch from './swatch';

const gmk = {
  'CR': Color('#171718'),
  'N9': Color('#393b3b'),
  'CC': Color('#67635b'),
  '2B': Color('#727474'),
  'BJ': Color('#91867a'),
  'CB': Color('#9b9284'),
  'U9': Color('#aca693'),
  'L9': Color('#d8d2c3'),
  'T9': Color('#c3c3ba'),
  '3K': Color('#ccc6c0'),
  '2M': Color('#c6c9c7'),
  'GR1': Color('#c5c7ca'),
  'CP': Color('#e1dbd1'),
  'WS1': Color('#f7f2ea'),
  'BR1': Color('#653c25'),
  'N7': Color('#00773a'),
  'AE': Color('#689b34'),
  '3B': Color('#768e72'),
  '3A': Color('#7fa580'),
  'V4': Color('#00589f'),
  'N5': Color('#0084c2'),
  'TU1': Color('#00627a'),
  'TU2': Color('#00a4a9'),
  'DY': Color('#5d437e'),
  'RO1': Color('#8d242f'),
  'P3': Color('#bc251e'),
  'V1': Color('#d02f1c'),
  'RO2': Color('#dd1126'),
  '3C': Color('#c87e74'),
  'MG1': Color('#cb3d6e'),
  'V2': Color('#ee6d00'),
  'N6': Color('#e5a100'),
  'CV': Color('#f8c200'),
  'GE1': Color('#ebd400'),
};

const gmkKeys = Object.keys(gmk);

interface PropTypes {
  onClick: (color: Color.Color) => any,
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
                onClick={() => onClick(color)}
              >
                <Swatch color={color} />
                {key}
              </Li>
            )
          })}
        </List>
    </div>
  </div>
);

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const Li = styled.li`
  display: inline;
  margin-right: 5px;
`;

export default Swatches;
