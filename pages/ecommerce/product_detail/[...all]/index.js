import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const ProductDetail = asyncComponent(() => import("../../../../modules/ecommerce/ProductDetail"));
export default AppPage(() => <ProductDetail/>);
