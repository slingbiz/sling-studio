import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Popover = asyncComponent(() => import("../../../../modules/muiComponents/util/Popover"));
export default AppPage(() => <Popover/>);
