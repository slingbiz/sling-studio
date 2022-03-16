import React from "react";
import AppPage from "../../@sling/hoc/AppPage";
import asyncComponent from "../../@sling/utility/asyncComponent";

const Analytics = asyncComponent(() => import("../../modules/dashboard/Analytics"));
export default AppPage(() => <Analytics/>);
