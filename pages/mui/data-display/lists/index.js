import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Lists = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Lists"));
export default AppPage(() => <Lists/>);
