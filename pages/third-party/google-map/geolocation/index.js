import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const GeoLocation = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/GeoLocation"));
export default AppPage(() => <GeoLocation/>);
