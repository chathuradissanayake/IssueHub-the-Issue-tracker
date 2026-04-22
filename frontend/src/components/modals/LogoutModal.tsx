// src/components/modals/LogoutModal.tsx
import Modal from "../common/Modal";

interface LogoutModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal = ({ isVisible, onClose, onLogout }: LogoutModalProps) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <p className="text-sm text-gray-700 mb-4">
        Are you sure you want to logout?
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm rounded bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={onLogout}
          className="px-3 py-1 text-sm rounded bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    </Modal>
  );
};

export default LogoutModal;