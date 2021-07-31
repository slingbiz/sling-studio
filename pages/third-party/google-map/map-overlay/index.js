import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const MapOverlay = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/MapOverlay"));
export default AppPage(() => <MapOverlay/>);
