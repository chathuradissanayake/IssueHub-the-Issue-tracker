import Modal from "../common/Modal";
import type { Status } from "../../types/issue";

interface Props {
  isOpen: boolean;
  oldStatus: Status;
  newStatus: Status;
  onCancel: () => void;
  onConfirm: () => void;
}

const StatusUpdateConfirmationModal = ({
  isOpen,
  oldStatus,
  newStatus,
  onCancel,
  onConfirm,
}: Props) => {
  if (!isOpen) return null;

  return (
    <Modal isVisible={isOpen}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Confirm Status Change
        </h2>

        <p className="text-sm text-slate-600 mb-4">
          You are changing status from{" "}
          <span className="font-semibold">{oldStatus}</span> →{" "}
          <span className="font-semibold text-sky-600">{newStatus}</span>.
          <br />
          Do you want to continue?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg border hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-sky-600 text-white hover:bg-sky-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StatusUpdateConfirmationModal;