import ReuseModal from "../ReuseModal";

const AttemptQuizModal = ({ open, setOpen, onConfirm }) => {
  return (
    <ReuseModal open={open} setOpen={setOpen} onConfirm={onConfirm} title={"Do you want to attempt the Quiz?"} loader={false} />
  );
};
export default AttemptQuizModal;
