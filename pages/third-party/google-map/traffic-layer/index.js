import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const TrafficLayer = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/TrafficLayer"));
export default AppPage(() => <TrafficLayer/>);
