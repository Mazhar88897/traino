import toast from "react-hot-toast";
import { handleError } from "../../hooks/globalFunction";
import { getAdmins, getUsers } from "../../services/companies";
import { deleteTeam, getMyTeams, sortTeam } from "../../services/myTeams";
import {
  paginateTeamList,
  sortTeamsList,
  updateTeamList,
  updateUserData,
} from "../../store/slice/user";

export const handleSort = async (
  newModel,
  user,
  access,
  setIsLoading,
  tableData,
  setSort,
  company_id,
  pageNo,
  dispatch,
  isuser,
  navigate
) => {
  setIsLoading(true);
  setSort(newModel);
  const sort = !!newModel?.length
    ? `${newModel[0].sort === "desc" ? "-" : ""}${newModel[0]?.field}`
    : "id";
  try {
    let link = pageNo;
    await sortTeam(
      dispatch,
      navigate,
      sort,
      access,
      user,
      company_id,
      link
    ).then((res) => {
      let results = { ...res };
      results.data.sort = !!newModel?.length;
      results?.data?.results?.map((item2) =>
        Object?.entries(item2)?.map((item) => {
          if (
            item[0] == "first_name" ||
            item[0] == "last_name" ||
            item[0] == "email"
          )
            return (item2[(user ? "members__" : "admin__") + item[0]] =
              item[1]);
        })
      );
      dispatch(
        sortTeamsList({
          role: isuser ? "user" : "admin",
          data: results?.data,
          pageNo: pageNo,
          sort,
          status: tableData?.status || [],
        })
      );
    });
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
  }
};

export const handleDeleteTeam = async (
  setCompany,
  access,
  dispatch,
  isItemSelected,
  setIsItemSelected,
  setLoading,
  setOpen,
  user,
  navigate,
) => {
  try {
    setLoading(true);
    await deleteTeam(
      dispatch,
      navigate,
      user ? `/bulk-users-delete/` : `/bulk-admins-delete/`,
      [...isItemSelected],
      access
    );
    setCompany((prev) => {
      let data = {
        ...prev,
        count: prev?.count - isItemSelected?.length,
        results: prev?.results?.filter(
          (val) => !isItemSelected?.includes(val?.id)
        ),
      };
      dispatch(updateUserData(user ? { user: data } : { admin: data }));
      return data;
    });
    toast.success(`${user ? "User" : "Admin"} has been successfully removed`);
    setLoading(false);
    setIsItemSelected([]);
    setOpen(false);
  } catch (err) {
    toast.error(handleError({ member_id: "id" }, err?.response?.data));
    setLoading(false);
    setOpen(false);
  }
};

export const handlePagination = async (
  navigate,
  pgVal,
  access,
  dispatch,
  setIsLoading,
  user,
  id,
  company_id,
  tableData,
  sortData,
  setPageNo
) => {
  setIsLoading(true);
  let pgNo = pgVal;
  setPageNo(pgNo);
  let page = tableData?.next?.split("&page=")[1];
  const sort = !!sortData?.length
    ? `${sortData[0].sort === "desc" ? "-" : ""}${sortData[0]?.field}`
    : "id";
  let link =
    pgNo + 1 == page
      ? tableData?.next?.split("&page=")[1]
      : !!sortData?.length && tableData?.previous?.split("&page=")[1];
  let tempData;
  let isSort;
  let pageInd = tableData?.status?.findIndex((item) => item?.pgNo == pgNo);
  let alreadySorted =
    pageInd != -1 &&
    !!tableData?.status?.length &&
    tableData?.status[pageInd]?.sort == sort;
  if ((link && !!tableData?.next) || !alreadySorted) {
    const { data } = user
      ? await getUsers(dispatch, navigate, id || company_id, access, link, sort)
      : await getAdmins(
          dispatch,
          navigate,
          company_id || id,
          access,
          link,
          sort
        );
    tempData = { ...data };
    tempData?.results?.map((item2) =>
      Object?.entries(item2)?.map((item) => {
        if (
          item[0] == "first_name" ||
          item[0] == "last_name" ||
          item[0] == "email"
        )
          return (item2[(user ? "members__" : "admin__") + item[0]] = item[1]);
      })
    );
    if (
      pageInd != -1 &&
      !!tableData?.status?.length &&
      tableData?.status[pageInd]?.sort == sort
    ) {
      tempData.results = tempData?.results;
      tempData.sort = false;
      isSort = false;
    } else if (!!sort) isSort = true;
  } else {
    tempData = {
      ...tableData,
      results: [],
    };
  }
  tempData.results = tempData?.results;
  dispatch(
    paginateTeamList({
      data: [...tempData?.results],
      role: user ? "user" : "admin",
      next: tempData?.next,
      previous: tempData?.previous,
      sort,
      pgNo: isSort && pgNo,
      pageNo: pgNo,
      status: tableData?.status || [],
    })
  );
  setIsLoading(false);
};

export const handleUserScroll = async (
  access,
  dispatch,
  setIsLoading,
  userData,
  user,
  navigate
) => {
  let nextPage =
    String(userData?.next)?.split("")?.reverse()?.join("")?.split("&page=") ||
    1;
  const { data } = await getMyTeams(
    dispatch,
    navigate,
    access,
    `?page=${nextPage}`
  );
  try {
    if (!!userData?.next) {
      const { results, ...others } = data;
      const allResults = [...userData?.results, ...results];
      dispatch(
        updateTeamList({
          role: user ? "user" : "admin",
          data: { results: allResults, ...others },
        })
      );
      setIsLoading(false);
    } else setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
  }
};
