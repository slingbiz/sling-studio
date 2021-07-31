import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const KmLayer = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/KmLayer"));
export default AppPage(() => <KmLayer/>);
