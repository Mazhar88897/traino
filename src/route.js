import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Loader } from "./components";
import { appRoutes } from "./helper/navigationHelper";
import {
  Logout,
  checkTimeoutValidity,
  getAllData,
  refreshAccessToken,
} from "./hooks/globalFunction";
import { Style } from "./screens/activate/style";
import { selectUser } from "./store/slice/user";

const AppRoutes = () => {
  const path = useLocation()?.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin, isUser, role, access, refresh } =
    useSelector(selectUser);
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const handleRefresh = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!!refresh) {
      await getAllData(navigate, refresh, setLoading, dispatch, user);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Logout user after 23 hours of login
    if (refresh) {
      const refreshTime = localStorage.getItem("refreshTime");
      const refreshTokenExpirationTime = 23 * 60 * 60 * 1000;
      const { status, timeoutTime } = checkTimeoutValidity(
        refreshTime,
        refreshTokenExpirationTime
      );
      if (status) {
        const refreshTokenTimer = setTimeout(
          () => Logout(dispatch, navigate),
          timeoutTime
        );
        return () => clearTimeout(refreshTokenTimer);
      }
    }
  }, [refresh]);

  useEffect(() => {
    // call access token after 50 minutes of login
    if (access) {
      const accessTokenExpirationTime = 50 * 60 * 1000;
      const accessTime = localStorage.getItem("accessTime");
      const { status, timeoutTime } = checkTimeoutValidity(
        accessTime,
        accessTokenExpirationTime
      );
      const refresh = localStorage.getItem("refresh");
      if (!!refresh & (refresh != null)) {
        const accessTokenTimer = setTimeout(
          () => refreshAccessToken(dispatch, navigate),
          timeoutTime > 0 ? timeoutTime : 0
        );
        return () => clearTimeout(accessTokenTimer);
      }
    }
  }, [access, path]);

  useEffect(() => {
    handleRefresh();
  }, []);

  if (loading) {
    return (
      <Box sx={Style.loaderContainer}>
        <Loader />
      </Box>
    );
  }

  return (
    <Routes>
      {appRoutes(isAdmin, isSuperAdmin, isUser, role, Navigate).map(
        (val, index) => (
          <Route key={index} exact path={val?.path} element={val?.element} />
        )
      )}
    </Routes>
  );
};

export default AppRoutes;
