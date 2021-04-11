import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Tables = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Tables"));
export default AppPage(() => <Tables/>);
