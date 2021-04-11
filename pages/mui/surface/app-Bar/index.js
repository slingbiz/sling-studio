import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const AppBar = asyncComponent(() => import("../../../../modules/muiComponents/surfaces/AppBar"));
export default AppPage(() => <AppBar/>);
