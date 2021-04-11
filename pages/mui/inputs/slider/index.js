import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Sliders = asyncComponent(() => import("../../../../modules/muiComponents/inputs/Sliders"));
export default AppPage(() => <Sliders/>);
