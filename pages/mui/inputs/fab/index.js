import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const FAB = asyncComponent(() => import("../../../../modules/muiComponents/inputs/FAB"));
export default AppPage(() => <FAB/>);
