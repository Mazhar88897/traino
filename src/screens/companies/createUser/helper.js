import toast from "react-hot-toast";
import { handleError } from "../../../hooks/globalFunction";
import { createAccount, updateTeam } from "../../../services/myTeams";

export const createUser = async (
  companyId,
  valuesData,
  access,
  dispatch,
  navigate
) => {
  try {
    const company = companyId;
    const { data } = await createAccount(
      dispatch,
      navigate,
      { ...valuesData, company },
      access
    );
    toast.success(`${data?.role == "Admin" ? "Admin" : "User"} created successfully`);
    return data;
  } catch (err) {
    toast.error(handleError(valuesData, err?.response?.data));
  }
};

export const updateUser = async (
  valuesData,
  access,
  id,
  dispatch,
  navigate,
  isUser
) => {
  try {
    const { data } = await updateTeam(
      dispatch,
      navigate,
      valuesData,
      id,
      access
    );
    toast.success(`${isUser ? "User" : "Admin"} has been updated successfully`);

    return data;
  } catch (err) {
    toast.error(handleError(valuesData, err?.response?.data));
  }
};
