import { FC } from 'react';
import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  modalMessage: string;
}

const SuccessModal: FC<Props> = ({ isOpen, onClose, modalMessage }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modalContent" overlayClassName="customModalOverlay">
      <div>
        <h2 className="modalMessage">{modalMessage}</h2>
        <button className="backButton" onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default SuccessModal;