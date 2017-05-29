import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Keycap
} from '../../../../domains/keycap-editor/keyboard';
import {
  setActiveKeycap,
  addActiveKeycap,
} from '../../../../domains/keycap-editor/actions';
import Component from './component';

const mapDispatchToProps = (dispatch, { keycap }) => bindActionCreators({
   handleClick: (e: React.MouseEvent<any>) => {
     if (e.shiftKey) {
       return addActiveKeycap({ keycap });
     } else {
       return setActiveKeycap({ keycap });
     }
   },
}, dispatch);

const Container: React.SFC<{
  keycap: Keycap,
  isActive: boolean,
  handleClick: (e: React.MouseEvent<any>) => any,
}> = ({
  keycap,
  isActive,
  handleClick,
}) => (
  <Component
    keycap={keycap}
    isActive={isActive}
    handleClick={handleClick}
  />
);

export default connect(undefined, mapDispatchToProps)(Container);
