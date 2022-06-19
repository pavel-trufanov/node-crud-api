

export const code_404 = (res, msg) => {
    res.writeHead(404);
    res.end(JSON.stringify({error:msg}));
}

export const code_400 = (res, msg) => {
    res.writeHead(400);
    res.end(JSON.stringify({error:msg}));
}

export const code_200_json = (res, data) => {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(data));
}

export const code_200 = (res, msg) => {
    res.writeHead(200);
    res.end(msg);
}

export const code_201 = (res) => {
    res.writeHead(201);
    res.end();
}

export const code_204 = (res) => {
    res.writeHead(204);
    res.end();
}

export const code_500 = (res, err) => {
    res.writeHead(500);
    res.end(JSON.stringify({error: err.toString()}));
}
