import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Basic = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Basic"));
export default AppPage(() => <Basic/>);
