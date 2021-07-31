import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Line = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Line"));
export default AppPage(() => <Line/>);
