import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Divider = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Divider"));
export default AppPage(() => <Divider/>);
