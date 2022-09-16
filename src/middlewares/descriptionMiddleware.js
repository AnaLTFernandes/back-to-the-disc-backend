import { STATUS_CODE } from "../enums/statusCode";

function hasProductIdMiddleware (req, res, next) {
    const { productId } = req.params;

    if (!productId) return res.sendStatus(STATUS_CODE.BAD_REQUEST);

    console.log(productId)

    next();
}

export default hasProductIdMiddleware;