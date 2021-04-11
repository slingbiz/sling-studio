import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Progress = asyncComponent(() => import("../../../../modules/muiComponents/feedback/Progress"));
export default AppPage(() => <Progress/>);
