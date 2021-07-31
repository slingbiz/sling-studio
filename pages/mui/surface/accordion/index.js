import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Accordion = asyncComponent(() => import("../../../../modules/muiComponents/surfaces/Accordion"));
export default AppPage(() => <Accordion/>);
