import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const Flat = asyncComponent(() => import("../../../modules/userList/Flat"));
export default AppPage(() => <Flat/>);
