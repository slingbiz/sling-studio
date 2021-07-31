import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Sliders = asyncComponent(() => import("../../../../modules/muiComponents/inputs/Sliders"));
export default AppPage(() => <Sliders/>);
