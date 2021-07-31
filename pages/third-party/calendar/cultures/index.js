import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Cultures = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Cultures"));
export default AppPage(() => <Cultures/>);
