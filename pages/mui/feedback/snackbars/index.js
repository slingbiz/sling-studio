import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Snacksbars = asyncComponent(() => import("../../../../modules/muiComponents/feedback/Snacksbars"));
export default AppPage(() => <Snacksbars/>);
