import express from "express";
import images from "./api/images";
const routes = express.Router();

routes.get("/", (req: any, res: any) => {
});

routes.use('/images', images)
export default routes;
