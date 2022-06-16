import {create, findAll, findById, remove, update} from "../service/user-service.js";
import {validate} from 'uuid';
import {getValidator} from "../validator/user-validator.js";
import {code_200_json, code_404, code_400, code_201, code_200, code_204} from "../common/response-utils.js";

export const handleRequest = async (req, res, id) => {
    switch (req.method) {
        case 'GET': await handleGet(req, res, id);
            break;
        case 'POST': await handlePost(req, res);
            break;
        case 'PUT': await handlePut(req, res, id);
            break;
        case 'DELETE': await handleDelete(req, res, id);
            break;
        default: code_400(res, 'unsupported operation');

    }
}

const handleGet = async (req, res, id) => {
    if (!id) {
        code_200_json(res, await findAll())
        return res;
    } else {
        if (validate(id)) {
            const user = await findById(id);
            if (user.length !== 0) {
                code_200_json(res, user);
            } else {
                code_404(res, `user with id=${id} not found`)
            }
        } else {
            code_400(res, 'uuid format for the user id is not recognized');
        }
    }
}

const handlePost = async (req, res) => {
    req.on('data', async (data) => {
        const user = JSON.parse(data);
        const validator = getValidator(user);
        if (validator.valid) {
            await create(user);
            code_201(res)
        } else {
            code_400(res, `missing required fields: ${validator.errors.join(',')}`);
        }
    });
}

const handlePut = async (req, res, id) => {
    if (validate(id)) {
        req.on('data', async (data) => {
            const user = JSON.parse(data);
            const success = await update(user, id);
            if (success) {
                code_200(res, 'success');
            } else {
                code_404(res, `user not found id = ${id}`)
            }
        });
    } else {
        code_400(res, 'uuid format for the user id is not recognized');
    }
}

const handleDelete = async (req, res, id) => {
    if (validate(id)) {
        const success = await remove(id);
        if (success) {
            code_204(res);
        } else {
            code_404(res, `user with id=${id} not found`)
        }
    } else {
        code_400(res, 'uuid format for the user id is not recognized');
    }
}
