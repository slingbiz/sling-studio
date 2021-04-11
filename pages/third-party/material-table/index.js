import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const MaterialTable = asyncComponent(() => import("../../../modules/thirdParty/materialTable"));
export default AppPage(() => <MaterialTable/>);
