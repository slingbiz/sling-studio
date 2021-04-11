import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const StreetView = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/StreetView"));
export default AppPage(() => <StreetView/>);
