import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Buttons = asyncComponent(() => import("../../../../modules/muiComponents/inputs/Buttons"));
export default AppPage(() => <Buttons/>);
