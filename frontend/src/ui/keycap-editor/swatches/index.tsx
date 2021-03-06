import * as React from 'react';
import * as Color from 'color';
import styled from 'styled-components';
import * as ReactTooltip from 'react-tooltip';
import { TabbedSelect, Tab } from '../_common/tabbed-select';
import Swatch from '../swatch';
import {
  GMK_COLOR_NAMES,
  GMK_COLORS,
  SP_ABS_COLOR_NAMES,
  SP_ABS_COLORS,
  SP_PBT_COLOR_NAMES,
  SP_PBT_COLORS,
} from './preset-colors';

interface PropTypes {
  onClick: (color: Color.Color) => any,
  className?: string,
};

type Producer = 'GMK' | 'SP_ABS' | 'SP_PBT';

class Swatches extends React.PureComponent<PropTypes, {
  tab: Producer,
}> {

  state = {
    tab: 'GMK' as Producer,
  };

  handleTabChange = (tab: Producer) => {
    this.setState(() => ({
      tab,
    }));
  };

  renderPane = (colorNames: string[], colors: { [name: string]: Color.Color }) => {
    const { onClick } = this.props;

    return (
      colorNames.map((name) => {
        const color = colors[name];
        return (
          <Li
            key={name}
            data-tip={name}
            data-for={name}
            onClick={() => onClick(color)}
          >
            <Swatch
              color={color}
              width={15}
              height={15}
            />
            <ReactTooltip id={name} effect="solid" />
          </Li>
        )
      })
    );
  };

  renderActivePane = (pane: Producer) => {
    if (pane === 'GMK') {
      return this.renderPane(GMK_COLOR_NAMES, GMK_COLORS);
    } else if (pane === 'SP_ABS') {
      return this.renderPane(SP_ABS_COLOR_NAMES, SP_ABS_COLORS);
    } else {
      return this.renderPane(SP_PBT_COLOR_NAMES, SP_PBT_COLORS);
    }
  };

  render() {
    const { onClick, className } = this.props;
    const { tab } = this.state;

    return (
      <div className={className}>
        <TabbedSelect
          value={tab}
          onSelect={this.handleTabChange}
        >
          <StyledTab value="GMK">GMK</StyledTab>
          <StyledTab value="SP_ABS">SP (ABS)</StyledTab>
          <StyledTab value="SP_PBT">SP (PBT)</StyledTab>
        </TabbedSelect>
        <List>{this.renderActivePane(tab as Producer)}</List>
      </div>
    );
  }
}

const StyledTab = styled(Tab)`
  margin: 10px 0;
`;

const List = styled.ul`
  min-width: 300px;
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
