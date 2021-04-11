import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const ForgetPassword = asyncComponent(() => import("../../../modules/userPages/UserPages/ForgetPassword"));
export default AppPage(() => <ForgetPassword/>);
