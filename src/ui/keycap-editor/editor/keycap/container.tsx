import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Keycap
} from '../../../../domains/keycap-editor/keyboard';
import {
  setActiveKeycap as _setActiveKeycap,
  addActiveKeycap as _addActiveKeycap,
  setMouseDown as _setMouseDown,
} from '../../../../domains/keycap-editor/actions';
import { getEditor } from '../../../../domains/keycap-editor/selectors';
import Component from './component';

const mapStateToProps = (state) => {
  const keyboard = getEditor(state);
  return {
    isMouseDown: keyboard.isMouseDown(),
  };
}

const mapDispatchToProps = (dispatch, { keycap }) => bindActionCreators({
   addActiveKeycap: () => _addActiveKeycap({ keycap }),
   setActiveKeycap: () => _setActiveKeycap({ keycap }),
   setMouseDown: (mouseDown: boolean) => _setMouseDown({ mouseDown }),
}, dispatch);

const Container = class extends React.Component<{
  keycap: Keycap,
  isMouseDown: boolean,
  isActive: boolean,
  addActiveKeycap: () => any,
  setActiveKeycap: () => any,
  setMouseDown: (mouseDown: boolean) => any,
}, {}> {
  componentWillUnmount() {
    this.cleanup();
  }

  cleanup = () => {
    document.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('blur', this.handleMouseUp);
  };

  handleMouseUp = () => {
    const { setMouseDown } = this.props;
    setMouseDown(false);
    this.cleanup();
  };

  handleMouseDown = (e: React.MouseEvent<any>) => {
    const {
      setMouseDown,
      addActiveKeycap,
      setActiveKeycap,
    } = this.props;
    setMouseDown(true);

    if (e.shiftKey) {
      addActiveKeycap();
    } else {
      setActiveKeycap();
    }

    document.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('blur', this.handleMouseUp);
  };

  handleMouseEnter = (e: React.MouseEvent<any>) => {
    const {
      isMouseDown,
      addActiveKeycap,
    } = this.props;

    if (isMouseDown) {
      addActiveKeycap();
    }
  };

  render() {
    const {
      keycap,
      isActive,
    } = this.props;

    return (
      <Component
        keycap={keycap}
        isActive={isActive}
        handleMouseDown={this.handleMouseDown}
        handleMouseEnter={this.handleMouseEnter}
      />
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
