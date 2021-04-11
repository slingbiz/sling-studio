import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Cultures = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Cultures"));
export default AppPage(() => <Cultures/>);
