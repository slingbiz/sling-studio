import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const ForgetPassword = asyncComponent(() => import("../../../modules/userPages/StyledUserPages/ForgetPassword"));
export default AppPage(() => <ForgetPassword/>);
