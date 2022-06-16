import {controllerMapping} from "../contoller/controller-mapping.js";
import {code_404, code_500} from "../common/response-utils.js";

const apiRoot = '/api';

export const route = async (req, res) => {
    const url = req.url;
    if (url.startsWith(apiRoot)) {
        const urlParts = url.split('/');
        const path = urlParts[2];
        const param = urlParts[3];
        const controller = controllerMapping[path];
        if (controller) {
            try {
                await controller(req, res, param);
            } catch (err) {
                code_500(res, err);
            }
        } else {
            code_404(res, "Resource not found");
        }
    } else {
        code_404(res, "Resource not found");
    }
}
