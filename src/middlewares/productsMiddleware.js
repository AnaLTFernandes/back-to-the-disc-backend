import { STATUS_CODE } from "../enums/statusCode.js";

function hasPageMiddleware (req, res, next) {
    const { page } = req.query;

    if (!page || isNaN(page) || page < 1) return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);

    next();
}

export default hasPageMiddleware;
