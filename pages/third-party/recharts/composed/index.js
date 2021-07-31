import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Composed = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Composed"));
export default AppPage(() => <Composed/>);
