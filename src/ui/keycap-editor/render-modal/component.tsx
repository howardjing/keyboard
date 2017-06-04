import * as React from 'react';
import styled from 'styled-components';
import RaytracedKeyboard from './raytraced-keyboard';
import Keyboard from '../../../domains/keycap-editor/keyboard';

interface PropTypes {
  isOpen: boolean,
  keyboard: Keyboard,
  handleClose: () => any,
};

const RenderModal: React.SFC<PropTypes> = ({
  isOpen,
  keyboard,
  handleClose,
}) => {
  if (!isOpen) { return null; }

  return (
    <Modal>
      <div onClick={handleClose}>x</div>
      <RaytracedKeyboard
        keyboard={keyboard}
      />
    </Modal>
  )
}

const Modal = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid black;
  width: 80%;
  height: 80%;
  top: 5%;
  left: 50%;
  margin-left: -40%;
`;

export default RenderModal;
