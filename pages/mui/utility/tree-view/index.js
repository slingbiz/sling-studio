import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const TreeView = asyncComponent(() => import("../../../../modules/muiComponents/util/TreeView"));
export default AppPage(() => <TreeView/>);
