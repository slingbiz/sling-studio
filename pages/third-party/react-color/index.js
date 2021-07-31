import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const ReactColor = asyncComponent(() => import("../../../modules/thirdParty/reactColor"));
export default AppPage(() => <ReactColor/>);
