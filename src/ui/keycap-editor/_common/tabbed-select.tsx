import * as React from 'react';
import styled from 'styled-components';

const TabbedSelect = ({
  value,
  onSelect,
  children,
}: {
  value: string,
  onSelect: (value: string) => any,
  children: any,
}) => {
  const clones = React.Children.map(children, (child) => {
    const childValue = (child as any).props.value;
    return (
      React.cloneElement(child as any, {
        selected: childValue === value,
        onClick: onSelect,
      })
    );
  });

  return (
    <Tabs>
      {clones}
    </Tabs>
  );
};

class Tab extends React.PureComponent<{
  children: any,
  value: string,
  onClick?: any,
  disabled?: boolean,
  selected?: boolean,
}, {}> {
  handleClick = () => {
    const { onClick, value } = this.props;
    if (onClick) {
      onClick(value);
    }
  }

  render() {
    const {
      children,
      disabled,
      selected,
    } = this.props;

    if (selected) {
      return (
        <SelectedTab>
          {children}
        </SelectedTab>
      );
    } else if (disabled) {
      return (
        <DisabledTab>
          {children}
        </DisabledTab>
      );
    }

    return (
      <UnselectedTab onClick={this.handleClick}>
        {children}
      </UnselectedTab>
    );
  }
}

const Tabs = styled.div`
  display: flex;
`;

const UnselectedTab = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 1px solid #aaa;
`;

const DisabledTab = UnselectedTab.extend`
  cursor: not-allowed;
	color: gray;
`;

const SelectedTab = UnselectedTab.extend`
  cursor: default;
  border-bottom: none;
  border-top: 1px solid #aaa;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;
`;

export {
  TabbedSelect,
  Tab,
}
