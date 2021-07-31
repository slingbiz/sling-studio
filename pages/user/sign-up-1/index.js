import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Signup = asyncComponent(() => import("../../../modules/userPages/UserPages/Signup"));
export default AppPage(() => <Signup/>);
