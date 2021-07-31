import React from "react";
import AppPage from "../../@sling/hoc/AppPage";
import asyncComponent from "../../@sling/utility/asyncComponent";

const Academy = asyncComponent(() => import("../../modules/dashboard/Academy"));
export default AppPage(() => <Academy/>);
