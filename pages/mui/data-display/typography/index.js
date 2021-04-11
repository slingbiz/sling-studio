import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Typography = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Typography"));
export default AppPage(() => <Typography/>);
