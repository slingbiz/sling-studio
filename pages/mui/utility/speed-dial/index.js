import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const SpeedDial = asyncComponent(() => import("../../../../modules/muiComponents/util/SpeedDial"));
export default AppPage(() => <SpeedDial/>);
