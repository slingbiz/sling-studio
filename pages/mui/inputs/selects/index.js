import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Selects = asyncComponent(() => import("../../../../modules/muiComponents/inputs/Selects"));
export default AppPage(() => <Selects/>);
