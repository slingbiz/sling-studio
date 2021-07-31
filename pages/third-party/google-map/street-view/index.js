import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const StreetView = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/StreetView"));
export default AppPage(() => <StreetView/>);
