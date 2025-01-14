import {
  Activate,
  AdminDashboard,
  Companies,
  ForgetPassword,
  ResetPassword,
  Settings,
  SignIn,
  Training,
  UserDashboard,
} from "../screens";
import AddCompany from "../screens/companies/add";
import CreateUser from "../screens/companies/createUser";
import CompanySummary from "../screens/companies/summary";
import SuperAdminDashboard from "../screens/dashboard/SuperAdmin";
import Leaderboard from "../screens/leaderboard";
import TrainingDepartments from "../screens/training/Departments";
import TrainingDocuments from "../screens/training/Documents";
import DocumentSummary from "../screens/training/DocumentsSummary";
import { IMAGES } from "../theme";

export const appRoutes = (isAdmin, isSuperAdmin, isUser, role, Navigate) => {
  // const role = undefined; // Force role to be undefined
  console.log("Role:", role);
  console.log("isAdmin:", isAdmin);
  console.log("isSuperAdmin:", isSuperAdmin);
  console.log("isUser:", isUser);

  return [
    //

    //
    // general routes
    ...(!role ? unAuthenticatedRoutes : []),
    // auth common routes
    ...(isSuperAdmin || isAdmin || isUser
      ? authenticatedRoutes(isAdmin, isSuperAdmin, isUser)
      : []),
    // user routes
    ...(isUser ? userRoutes : []),
    // admin routes
    ...(isAdmin ? adminRoutes(isAdmin) : []),
    // super admin routes
    ...(isSuperAdmin ? superAdminRoutes(isAdmin) : []),

    {
      path: "*",
      element: <Navigate to={`${!role ? "/signin" : "/dashboard"}`} replace />,
    },
  ];
};
export const userSideOptions = (isAdmin, isSuperAdmin, isUser) => {
  return [
    // {
    //   title: "Dashboard",
    //   icon: IMAGES.dashboard2,
    //   successIcon: IMAGES.dashboard1,
    //   slug: "dashboard",
    //   path: "/dashboard",
    // },
    isAdmin && {
      title: "My Teams",
      icon: IMAGES.companies2,
      successIcon: IMAGES.companies1,
      slug: "teams",
      path: "/my-teams",
    },
   
    isUser && {
      title: "My Trainings",
      icon: IMAGES.training2,
      successIcon: IMAGES.training1,
      slug: "learning",
      path: "/my-learning",
    },
    isSuperAdmin && {
      title: "Companies",
      icon: IMAGES.companies2,
      successIcon: IMAGES.companies1,
      slug: "companies",
      path: "/companies",
    },
    (isSuperAdmin || isAdmin) && {
      title: "Trainings",
      icon: IMAGES.training2,
      successIcon: IMAGES.training1,
      slug: "training",
      path: "/trainings",
    },
  ];
};

const unAuthenticatedRoutes = [
  { path: "/signin", element: <SignIn /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  {
    path: "/password/reset/confirm/:uid/:token",
    element: <ResetPassword />,
  },
  { path: "/activate/:uid/:token", element: <Activate /> },
];

const authenticatedRoutes = (isAdmin, isSuperAdmin, isUser) => {
  return [
    {
      path: "/dashboard",
      element: isAdmin ? (
        <AdminDashboard />
      ) : isSuperAdmin ? (
        <SuperAdminDashboard />
      ) : (
        <UserDashboard />
      ),
    },
    {
      path: "/settings",
      element: <Settings />,
    },
  ];
};

const userRoutes = [
  {
    path: "/my-learning",
    element: <TrainingDocuments />,
  },
  {
    path: "/my-learning/document/:docId/:section",
    element: <DocumentSummary />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
];

const commonRoutes = (isAdmin) => {
  return [
    {
      path: "/trainings",
      element: isAdmin ? <TrainingDocuments /> : <Training />,
    },
  ];
};

const adminRoutes = (isAdmin) => [
  { path: "/my-teams", element: <CompanySummary /> },
  { path: "/my-teams/create/user", element: <CreateUser /> },
  { path: "/my-teams/create/admin", element: <CreateUser /> },
  { path: "/my-teams/update/user/:user_id", element: <CreateUser /> },
  { path: "/my-teams/update/admin/:user_id", element: <CreateUser /> },
  { path: "/trainings/document/:docId/:section", element: <DocumentSummary /> },
  ...commonRoutes(isAdmin),
];

const superAdminRoutes = (isAdmin) => [
  ...commonRoutes(isAdmin),
  { path: "/companies", element: <Companies /> },
  { path: "/companies/add", element: <AddCompany /> },
  { path: "/company/update/:id", element: <AddCompany /> },
  { path: "/company/:id", element: <CompanySummary /> },
  {
    path: "/company/:id/create/user",
    element: <CreateUser />,
  },
  {
    path: "/company/:id/create/admin",
    element: <CreateUser />,
  },
  {
    path: "/company/:id/update/user/:user_id",
    element: <CreateUser />,
  },
  {
    path: "/company/:id/create/admin",
    element: <CreateUser />,
  },
  {
    path: "/company/:id/update/admin/:user_id",
    element: <CreateUser />,
  },
  {
    path: "/trainings/company/:id/document/:docId/:section",
    element: <DocumentSummary />,
  },
  {
    path: "/trainings/company/:id/",
    element: <TrainingDocuments />,
  },
  // {
  //   path: "/trainings/company/:paramsId",
  //   element: <TrainingDepartments />,
  // },
];
