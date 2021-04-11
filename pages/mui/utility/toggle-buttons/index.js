import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const ToggleButtons = asyncComponent(() => import("../../../../modules/muiComponents/util/ToggleButtons"));
export default AppPage(() => <ToggleButtons/>);
