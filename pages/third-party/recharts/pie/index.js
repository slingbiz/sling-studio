import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Pie = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Pie"));
export default AppPage(() => <Pie/>);
