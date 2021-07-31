import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Skeleton = asyncComponent(() => import("../../../../modules/muiComponents/util/Skeleton"));
export default AppPage(() => <Skeleton/>);
