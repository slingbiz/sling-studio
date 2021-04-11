import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const MapClustering = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/MapClustering"));
export default AppPage(() => <MapClustering/>);
