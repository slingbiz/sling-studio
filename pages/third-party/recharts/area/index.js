import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Area = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Area"));
export default AppPage(() => <Area/>);
