import React from "react";
import AppPage from "../../@sling/hoc/AppPage";
import asyncComponent from "../../@sling/utility/asyncComponent";

const MenuLevel = asyncComponent(() => import("../../modules/menu/MenuLevel"));
export default AppPage(() => <MenuLevel/>);
