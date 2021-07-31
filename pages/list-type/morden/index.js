import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Morden = asyncComponent(() => import("../../../modules/userList/Morden"));
export default AppPage(() => <Morden/>);
