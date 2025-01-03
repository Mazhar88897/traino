import ReuseModal from "../ReuseModal";

const DiscardChangesModal = ({ open, setOpen, onConfirm }) => {
  return (
    <ReuseModal open={open} setOpen={setOpen} onConfirm={onConfirm} title={"Are you sure you want to discard changes?"} loader={false} />
  );
};
export default DiscardChangesModal;
