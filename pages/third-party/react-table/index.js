import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const ReactTable = asyncComponent(() => import("../../../modules/thirdParty/reactTable"));
export default AppPage(() => <ReactTable/>);
