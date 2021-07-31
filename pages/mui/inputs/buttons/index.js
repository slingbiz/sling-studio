import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Buttons = asyncComponent(() => import("../../../../modules/muiComponents/inputs/Buttons"));
export default AppPage(() => <Buttons/>);
