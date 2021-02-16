const get = (url) => {
    return fetch(url).then(r => r.json()).catch(err => {
        console.error(err);
    });
}

// todo:
// const post = (url, body) => {
//     return fetch(url, {
//         method: 'POST',
//         body: body,
//     })
//     .then()...........
// }