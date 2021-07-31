import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Drawers = asyncComponent(() => import("../../../../modules/muiComponents/navigation/Drawers"));
export default AppPage(() => <Drawers/>);
