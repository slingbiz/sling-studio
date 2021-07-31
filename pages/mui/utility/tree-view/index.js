import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const TreeView = asyncComponent(() => import("../../../../modules/muiComponents/util/TreeView"));
export default AppPage(() => <TreeView/>);
