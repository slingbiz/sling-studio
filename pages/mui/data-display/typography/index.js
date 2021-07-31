import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Typography = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Typography"));
export default AppPage(() => <Typography/>);
