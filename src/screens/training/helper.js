import { IMAGES } from "../../theme";

export const tabsArray = ({
  id,
  departId,
  docId,
  navigate,
  isSuperAdmin,
  isAdmin,
  state
}) => {
  return [
    {
      src: IMAGES.summaryLogo,
      tabName: "Summary",
      func: () => {
        navigate(
          (isSuperAdmin ? `/trainings/company/${id}/document/${docId}/summary` :
            isAdmin ? `/trainings/document/${docId}/summary` : `/my-learning/document/${docId}/summary`),
          { state }
        );
      },
      handleBack: () => {
        navigate(
          (isSuperAdmin ?
            `/trainings/company/${id}/` :
            isAdmin ?
              `/trainings`
              : `/my-learning/`),
          { state }
        );
      }
    },
    {
      src: IMAGES.keyPointsLogo,
      tabName: "Key Points",
      func: () => {
        navigate(
          (isSuperAdmin ? `/trainings/company/${id}/document/${docId}/keyPoints` :
            isAdmin ? `/trainings/document/${docId}/keyPoints` : `/my-learning/document/${docId}/keyPoints`),
          { state }
        );
      },
      handleBack: () => {
        navigate(
          (isSuperAdmin ?
            `/trainings/company/${id}/` :
            isAdmin ?
              `/trainings`
              : `/my-learning/`),
          { state }
        );
      }
    },
    {
      src: IMAGES.quizzesLogo,
      tabName: "Quiz",
      func: () => {
        navigate(
          (isSuperAdmin ?
            `/trainings/company/${id}/document/${docId}/quizzes` :
            isAdmin ?
              `/trainings/document/${docId}/quizzes`
              : `/my-learning/document/${docId}/quizzes`),
          { state }
        );
      },
      handleBack: () => {
        navigate(
          (isSuperAdmin ?
            `/trainings/company/${id}/` :
            isAdmin ?
              `/trainings`
              : `/my-learning/`),
          { state }
        );
      }
    },
  ];
};
