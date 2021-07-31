import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Paper = asyncComponent(() => import("../../../../modules/muiComponents/surfaces/Paper"));
export default AppPage(() => <Paper/>);
