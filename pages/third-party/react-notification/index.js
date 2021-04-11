import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const ReactNotification = asyncComponent(() => import("../../../modules/thirdParty/reactNotification"));
export default AppPage(() => <ReactNotification/>);
