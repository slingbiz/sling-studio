import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Popover = asyncComponent(() => import("../../../../modules/muiComponents/util/Popover"));
export default AppPage(() => <Popover/>);
