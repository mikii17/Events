import { useEffect, useRef } from "react";
import useDeleteEvent from "../hooks/useDeleteEvent";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteModal = ({
  open,
  close,
  id,
}: {
  open: boolean;
  close: () => void;
  id: string;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { deleteEvent, isError, isPending, isSuccess } = useDeleteEvent(id);
  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const closeOnBackdropClicked = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogDimensions = dialogRef.current!.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      close();
    }
  };

  const handleDelete = () => {
    deleteEvent();
  };

  if (isSuccess) {
    toast.success("Event deleted successfully!");
    close();
    return <Navigate to="/" replace />;
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={closeOnBackdropClicked}
      className="rounded shadow-md min-w-[300px]"
      style={{
        top: "50%",
        transform: "translate(-50%, -50%)",
        left: "50%",
        minWidth: "300px",
      }}
    >
      
      <div className="bg-primary px-6 py-8 shadow-md flex flex-col gap-10 items-center ">
        {isError && <p className="text-red-500">Something went wrong!</p>}
        <p className="text-xl text-center text-primary">
          Are you sure you want to delete this?
        </p>
        <div
          className="flex justify-evenly items-center"
          style={{ width: "75%", justifyContent: "space-around" }}
        >
          <button
            className="bg-accent p-2 px-5 rounded-lg text-white"
            onClick={handleDelete}
            disabled={isPending}
          >
            Yes
          </button>
          <button
            className="bg-accent p-2 px-5 rounded-lg text-white"
            onClick={close}
          >
            No
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default DeleteModal;
