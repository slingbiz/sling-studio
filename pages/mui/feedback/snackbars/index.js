import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Snacksbars = asyncComponent(() => import("../../../../modules/muiComponents/feedback/Snacksbars"));
export default AppPage(() => <Snacksbars/>);
