import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const TransferList = asyncComponent(() => import("../../../../modules/muiComponents/inputs/TransferList"));
export default AppPage(() => <TransferList/>);
