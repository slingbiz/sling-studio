import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Bar = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Bar"));
export default AppPage(() => <Bar/>);
