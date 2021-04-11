import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const ReactPhotoGallery = asyncComponent(() => import("../../../modules/thirdParty/reactPhotoGallery"));
export default AppPage(() => <ReactPhotoGallery/>);
