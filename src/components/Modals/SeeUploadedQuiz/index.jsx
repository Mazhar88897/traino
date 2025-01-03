import ReuseModal from "../ReuseModal";

const SeeUploadedQuizModal = ({ open, setOpen, setCurrComponent }) => {
  const onConfirm = () => {
    setOpen(false);
    setCurrComponent("quiz");
  }
  return (
    <ReuseModal open={open} setOpen={setOpen} onConfirm={onConfirm} title={"Do you want to see the uploaded Quiz ?"} loader={false} />
  );
};
export default SeeUploadedQuizModal;
