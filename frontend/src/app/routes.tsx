import { createBrowserRouter } from "react-router";
import { OwnerDashboard } from "./components/OwnerDashboard";
import { TenantPortal } from "./components/TenantPortal";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/owner",
    Component: OwnerDashboard,
  },
  {
    path: "/tenant/:tenantId",
    Component: TenantPortal,
  },
]);
