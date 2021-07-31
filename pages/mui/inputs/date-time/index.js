import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const DataTime = asyncComponent(() => import("../../../../modules/muiComponents/inputs/DataTime"));
export default AppPage(() => <DataTime/>);
