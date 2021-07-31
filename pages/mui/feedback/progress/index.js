import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Progress = asyncComponent(() => import("../../../../modules/muiComponents/feedback/Progress"));
export default AppPage(() => <Progress/>);
