import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const TransferList = asyncComponent(() => import("../../../../modules/muiComponents/inputs/TransferList"));
export default AppPage(() => <TransferList/>);
