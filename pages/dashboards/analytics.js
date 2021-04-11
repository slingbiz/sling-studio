import React from "react";
import AppPage from "../../@crema/hoc/AppPage";
import asyncComponent from "../../@crema/utility/asyncComponent";

const Analytics = asyncComponent(() => import("../../modules/dashboard/Analytics"));
export default AppPage(() => <Analytics/>);
