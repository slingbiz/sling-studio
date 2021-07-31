import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const AppBar = asyncComponent(() => import("../../../../modules/muiComponents/surfaces/AppBar"));
export default AppPage(() => <AppBar/>);
