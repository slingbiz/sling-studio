import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const MapOverlay = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/MapOverlay"));
export default AppPage(() => <MapOverlay/>);
