import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Checkboxes = asyncComponent(() => import("../../../../modules/muiComponents/inputs/Checkboxes"));
export default AppPage(() => <Checkboxes/>);
