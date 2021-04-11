import React from "react";
import AppPage from "../../@crema/hoc/AppPage";
import asyncComponent from "../../@crema/utility/asyncComponent";

const MenuLevel = asyncComponent(() => import("../../modules/menu/MenuLevel"));
export default AppPage(() => <MenuLevel/>);
