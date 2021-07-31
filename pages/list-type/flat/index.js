import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Flat = asyncComponent(() => import("../../../modules/userList/Flat"));
export default AppPage(() => <Flat/>);
