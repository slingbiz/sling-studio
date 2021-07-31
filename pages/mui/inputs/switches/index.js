import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Switches = asyncComponent(() => import("../../../../modules/muiComponents/inputs/Switches"));
export default AppPage(() => <Switches/>);
