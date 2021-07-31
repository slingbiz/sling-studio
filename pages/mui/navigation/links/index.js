import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Links = asyncComponent(() => import("../../../../modules/muiComponents/navigation/Links"));
export default AppPage(() => <Links/>);
