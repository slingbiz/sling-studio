import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Tables = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Tables"));
export default AppPage(() => <Tables/>);
