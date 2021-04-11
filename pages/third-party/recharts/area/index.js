import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Area = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Area"));
export default AppPage(() => <Area/>);
