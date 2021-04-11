import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Treemap = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Treemap"));
export default AppPage(() => <Treemap/>);
