import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Divider = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Divider"));
export default AppPage(() => <Divider/>);
