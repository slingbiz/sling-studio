import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const ReactNotification = asyncComponent(() => import("../../../modules/thirdParty/reactNotification"));
export default AppPage(() => <ReactNotification/>);
