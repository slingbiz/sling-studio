import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Tooltip = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Tooltip"));
export default AppPage(() => <Tooltip/>);
