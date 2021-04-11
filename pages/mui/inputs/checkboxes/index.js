import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Checkboxes = asyncComponent(() => import("../../../../modules/muiComponents/inputs/Checkboxes"));
export default AppPage(() => <Checkboxes/>);
