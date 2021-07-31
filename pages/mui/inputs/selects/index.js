import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Selects = asyncComponent(() => import("../../../../modules/muiComponents/inputs/Selects"));
export default AppPage(() => <Selects/>);
