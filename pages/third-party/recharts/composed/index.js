import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Composed = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Composed"));
export default AppPage(() => <Composed/>);
