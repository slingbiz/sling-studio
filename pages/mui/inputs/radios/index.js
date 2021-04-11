import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const RadiosButton = asyncComponent(() => import("../../../../modules/muiComponents/inputs/RadiosButton"));
export default AppPage(() => <RadiosButton/>);
