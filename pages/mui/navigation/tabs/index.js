import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Tabs = asyncComponent(() => import("../../../../modules/muiComponents/navigation/Tabs"));
export default AppPage(() => <Tabs/>);
