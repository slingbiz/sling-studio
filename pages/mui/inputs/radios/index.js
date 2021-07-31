import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const RadiosButton = asyncComponent(() => import("../../../../modules/muiComponents/inputs/RadiosButton"));
export default AppPage(() => <RadiosButton/>);
