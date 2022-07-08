import { Router } from "express";
import ApiR from "./ApiR";

type routeAndPrefixType = { prefix: string; router: Router }[];

const Routes: routeAndPrefixType = [
    { prefix: "/api/v1", router: ApiR },
];

export default Routes;
