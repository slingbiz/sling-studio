import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Line = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Line"));
export default AppPage(() => <Line/>);
