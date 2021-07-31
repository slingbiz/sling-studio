import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const ToggleButtons = asyncComponent(() => import("../../../../modules/muiComponents/util/ToggleButtons"));
export default AppPage(() => <ToggleButtons/>);
