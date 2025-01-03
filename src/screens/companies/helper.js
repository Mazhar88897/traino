import { getCompanies } from "../../services/companies";
import { updateUserData } from "../../store/slice/user";

export const onScroll = async (
  navigate,
  companies,
  access,
  dispatch,
  setCompanies
) => {
  let nextPage = companies?.next?.split("/api/")?.[1];
  try {
    if (!!nextPage) {
      const company = await getCompanies(dispatch, navigate, access, nextPage);
      setCompanies((prev) => {
        let data = {
          prev,
          results: [...prev?.results, ...company?.data?.results],
        };
        dispatch(updateUserData({ company: data }));
        return data;
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};
