import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Tooltip = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Tooltip"));
export default AppPage(() => <Tooltip/>);
