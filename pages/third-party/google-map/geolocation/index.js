import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const GeoLocation = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/GeoLocation"));
export default AppPage(() => <GeoLocation/>);
