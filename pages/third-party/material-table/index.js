import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const MaterialTable = asyncComponent(() => import("../../../modules/thirdParty/materialTable"));
export default AppPage(() => <MaterialTable/>);
