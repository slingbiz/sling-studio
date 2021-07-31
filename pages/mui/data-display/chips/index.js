import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Chips = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Chips"));
export default AppPage(() => <Chips/>);
