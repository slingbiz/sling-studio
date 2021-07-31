import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const ResetPassword = asyncComponent(() => import("../../../modules/userPages/UserPages/ResetPassword"));
export default AppPage(() => <ResetPassword/>);
