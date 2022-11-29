import { STATUS_CODE } from "../enums/statusCode.js";

function hasPageMiddleware (req, res, next) {
    const page = Number(req.query.page) || null;

    if (!page || page < 1) return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);

    next();
}

export default hasPageMiddleware;
