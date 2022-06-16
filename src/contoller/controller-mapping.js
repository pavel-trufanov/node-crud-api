import {handleRequest as handleUsersRequest} from "./user-controller.js"

export const controllerMapping = {
    'users': handleUsersRequest
}
