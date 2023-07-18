import {currentUrl} from "../consts/consts";

export const Auth = async (login, password) => {

    let data = JSON.stringify({
        "personal_phone": login,
        "password": password
    });
    // console.log(data);

    try {
        const resp = await fetch(currentUrl + '/api/auth/login', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: data
        })

        // console.log(resp.json())

        return await resp.json();

    } catch (e) {
        console.log(e)}

}

export const LogOut = async (token) => {
    console.log(token)
    try {
        const resp = await fetch(currentUrl + '/api/logout', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
        console.log(await resp.json())

        return await resp.json();

    } catch (e) {
        console.log(e.message)}
}


