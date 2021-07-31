import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const BreadCrumbs = asyncComponent(() => import("../../../../modules/muiComponents/navigation/BreadCrumbs"));
export default AppPage(() => <BreadCrumbs/>);
