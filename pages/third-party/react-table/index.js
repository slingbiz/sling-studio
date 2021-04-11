import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const ReactTable = asyncComponent(() => import("../../../modules/thirdParty/reactTable"));
export default AppPage(() => <ReactTable/>);
