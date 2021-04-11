import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Switches = asyncComponent(() => import("../../../../modules/muiComponents/inputs/Switches"));
export default AppPage(() => <Switches/>);
