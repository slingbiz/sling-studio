import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Alerts = asyncComponent(() => import("../../../../modules/muiComponents/util/Alerts"));
export default AppPage(() => <Alerts/>);
