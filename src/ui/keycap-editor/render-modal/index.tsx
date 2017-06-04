import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Keyboard from '../../../domains/keycap-editor/keyboard';
import { getEditor } from '../../../domains/keycap-editor/selectors';
import { showRenderModal } from '../../../domains/keycap-editor/actions';

import Component from './component';

interface PropTypes {
  // from container
  isOpen: boolean,
  handleClose: () => any,

  // from parent
  keyboard: Keyboard,
};

const mapStateToProps = (state) => ({
  isOpen: getEditor(state).shouldShowRenderModal(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  handleClose: () => showRenderModal({ show: false }),
}, dispatch);

const RenderModal: React.SFC<PropTypes> = ({
  isOpen,
  keyboard,
  handleClose,
}) => (
  <Component
    isOpen={isOpen}
    handleClose={handleClose}
    keyboard={keyboard}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(RenderModal);
