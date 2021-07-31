import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Alerts = asyncComponent(() => import("../../../../modules/muiComponents/util/Alerts"));
export default AppPage(() => <Alerts/>);
