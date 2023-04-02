import { FC } from 'react';
import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modalContent" overlayClassName="customModalOverlay">
      <div>
        <h2>Your password was successfully changed</h2>
        <button className="backButton" onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default SuccessModal;