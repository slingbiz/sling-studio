import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Popup = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Popup"));
export default AppPage(() => <Popup/>);
