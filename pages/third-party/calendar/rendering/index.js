import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Rendering = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Rendering"));
export default AppPage(() => <Rendering/>);
