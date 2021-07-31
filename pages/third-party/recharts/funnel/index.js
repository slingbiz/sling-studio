import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Funnel = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Funnel"));
export default AppPage(() => <Funnel/>);
