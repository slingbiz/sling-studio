import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Treemap = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Treemap"));
export default AppPage(() => <Treemap/>);
