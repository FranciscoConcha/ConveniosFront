import React from 'react';
import './Modal.css'; // Asegúrate de crear este archivo CSS

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, isLoading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isLoading && <div className="spinner"></div>}
        {children}
        {onClose && (
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;