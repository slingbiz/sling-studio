import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const KmLayer = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/KmLayer"));
export default AppPage(() => <KmLayer/>);
