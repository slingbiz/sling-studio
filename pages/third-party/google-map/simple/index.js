import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Simple = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/Simple"));
export default AppPage(() => <Simple/>);
