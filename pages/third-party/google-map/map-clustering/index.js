import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const MapClustering = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/MapClustering"));
export default AppPage(() => <MapClustering/>);
