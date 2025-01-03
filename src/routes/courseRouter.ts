import { Request, Response, NextFunction, Router } from "express";

import { getCourses } from "../controllers/courses";

const router: Router = Router({ mergeParams: true });

router.route("/").get(getCourses);

export default router;
