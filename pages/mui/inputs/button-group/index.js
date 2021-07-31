import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const ButtonGroup = asyncComponent(() => import("../../../../modules/muiComponents/inputs/ButtonGroup"));
export default AppPage(() => <ButtonGroup/>);
