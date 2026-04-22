// src/components/common/Modal.tsx
import React, { useImperativeHandle, forwardRef, useState } from "react";
import { FaTimes } from "react-icons/fa";

export interface ModalRef {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  children: React.ReactNode;
  width?: string;
  isVisible?: boolean;
  onClose?: () => void;
}

const Modal = forwardRef<ModalRef, ModalProps>(
  ({ children, width = "w-96", isVisible: isVisibleProp, onClose }, ref) => {
    const [internalVisible, setInternalVisible] = useState(false);

    // Use controlled or uncontrolled visibility
    const isVisible =
      typeof isVisibleProp === "boolean" ? isVisibleProp : internalVisible;

    useImperativeHandle(ref, () => ({
      open: () => setInternalVisible(true),
      close: () => setInternalVisible(false),
    }));

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget) {
        if (onClose) onClose();
        else setInternalVisible(false);
      }
    };

    if (!isVisible) return null;

    return (
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50"
        onClick={handleClose}
      >
        <div className={`relative bg-white p-6 rounded-lg shadow-lg ${width}`}>
          <button
            className="absolute top-2 right-2 text-gray-400"
            onClick={onClose ? onClose : () => setInternalVisible(false)}
          >
            <FaTimes />
          </button>
          {children}
        </div>
      </div>
    );
  }
);

export default Modal;