import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const ResetPassword = asyncComponent(() => import("../../../modules/userPages/StyledUserPages/ResetPassword"));
export default AppPage(() => <ResetPassword/>);
