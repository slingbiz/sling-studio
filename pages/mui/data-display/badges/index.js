import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Badges = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Badges"));
export default AppPage(() => <Badges/>);
