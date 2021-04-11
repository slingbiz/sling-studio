import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const TrafficLayer = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/TrafficLayer"));
export default AppPage(() => <TrafficLayer/>);
