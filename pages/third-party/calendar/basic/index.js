import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Basic = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Basic"));
export default AppPage(() => <Basic/>);
