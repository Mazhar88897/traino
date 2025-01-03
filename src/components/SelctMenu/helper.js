import { getDepartments } from "../../services/departments";
import { updateDepartmentList } from "../../store/slice/user";

export const onScroll = async (
  navigate,
  departments,
  access,
  dispatch,
  setLoading,
  company_id,
  setDepartmentData,
  departmentData
) => {
  let nextPage = departments?.next?.split("/api/")?.[1];
  try {
    if (!!nextPage) {
      const department = await getDepartments(
        dispatch,
        navigate,
        access,
        company_id,
        nextPage
      );
      dispatch(updateDepartmentList(department?.data));
      setDepartmentData((prev) => [...prev, ...department?.data?.results]);
    } else setLoading(false);
  } catch (err) {
    setLoading(false);
  }
};
