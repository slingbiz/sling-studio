import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Accordion = asyncComponent(() => import("../../../../modules/muiComponents/surfaces/Accordion"));
export default AppPage(() => <Accordion/>);
