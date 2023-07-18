

import { currentUrl } from '../consts/consts';

import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PreSync = async (token) => {
    try {
        const resp = await fetch(currentUrl + '/api/pre-sync', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        })
        return await resp.json()
    } catch (e) {
        return {
            'status': 'got error'
        }
    }

}

export const GetUserInfo = async(token) => {
    try {
        const resp = await fetch(currentUrl + '/api/user-info', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        })
        // console.log(await resp.json())
        return await resp.json()
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        return {
            'status': 'got error'
        }
    }
}


export const GetCourseInfo = async(token) => {
    try {
        const resp = await fetch(currentUrl + '/api/courses', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        })
        // console.log(await resp.json())
        return await resp.json()
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        return {
            'status': 'got error'
        }
    }
}













export const GetNomenclatures = async (token) => {
    console.log(currentUrl)
    console.log(token)
  const resp = await fetch(currentUrl + '/api/nomenclature/list', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then((response) => {
            //console.log(response.json())
            return response.json();
        })
        .catch((error) => {return {
            'status': 'got error'
        }});
    return resp;
}

export const GetClients = async (token) => {
    console.log(token)
    resp = await fetch(currentUrl + '/api/clients/list', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then((response) => {
            //console.log(response.json())
            return response.json();
        })
        .catch((error) => {return {
            'status': 'got error'
        }});
    return resp;
}

export const GetSuppliers = async (token) => {
    resp = await fetch(currentUrl + '/api/nomenclature/suppliers-list', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then((response) => {
            //console.log(response.json())
            return response.json();
        })
        .catch((error) => {return {
            'status': 'got error'
        }});
    return resp;
}

export const GetCategories = async (token) => {
    resp = await fetch(currentUrl + '/api/nomenclature/categories-list', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then((response) => {
            //console.log(response.json())
            return response.json();
        })
        .catch((error) => {return {
            'status': 'got error'
        }});
    return resp;
}
export const GetRequests = async (token) => {
    resp = await fetch(currentUrl + '/api/orders/list', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then((response) => {
            //console.log(response.json())
            return response.json();
        })
        .catch((error) => {return {
            'status': 'got error'
        }});
    return resp;
}
export const GetReturns = async (token) => {
    resp = await fetch(currentUrl + '/api/returns/list ', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then((response) => {
            //console.log(response)
            return response.json();
        })
        .catch((error) => {return {
            'status': 'got error'
        }});
    return resp;
}
export const GetTypesOfReturns = async (token) => {
    resp = await fetch(currentUrl + '/api/returns/types/list', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then((response) => {
            //console.log(response.json())
            return response.json();
        })
        .catch((error) => {return {
            'status': 'got error'
        }});
    return resp;
}
export const GetCashOrders = async (token) => {
    resp = await fetch(currentUrl + '/api/cash-order/list', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then((response) => {
            //console.log(response.json())
            return response.json();
        })
        .catch((error) => {return {
            'status': 'got error'
        }});
    return resp;
}

export const SendNewRequest = async (token, data) => {
    /* console.log(token);
    console.log(data); */
    resp = await fetch(currentUrl + '/api/order/new', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            console.log('---------')
            console.log('response:')
            console.log(response)
            console.log('---------')
            const res = response.json()
            return res;
        })
        .catch(async(error) => {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            const login = await AsyncStorage.getItem('@login');
            var err = {
                "email": login,
                "breakpoint": 'After order. Token: ' + token,
                "name": error.name,
                "message": error.message
            }
            console.log(err);
            const resp = await SendLogError(err);
            console.log(resp);
            if (resp)
                if (resp.status)
                    if (resp.status == 'ok')
                        Toast.show('Ошибка отправлена на сервер');
            console.log(resp);
            return {
                'status': 'got error'
            }
        });
    return resp;
}
export const SendNewReturn = async (token, data) => {
    /* console.log(token);
    console.log(data); */
    resp = await fetch(currentUrl + '/api/returns/new', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .catch((error) => {return {
            'status': 'got error'
        }});
    return resp;
}
export const SendNewCashOrder = async (token, data) => {
    /* console.log(token);
    console.log(data); */
    resp = await fetch(currentUrl + '/api/cash-order/new', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .catch((error) => {return {
            'status': 'got error'
        }});
    return resp;
}
export const SendLogError = async (data) => {
    /* console.log(token);
    console.log(data); */
    resp = await fetch(currentUrl + '/api/log/error', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            console.log(response)
            response.json();
        })
        .catch((error) => {return {
            'status': 'got error'
        }});
    return resp;
}

export const GetBalance = async (token) => {
    /* console.log(token);
    console.log(data); */
    resp = await fetch(currentUrl + '/api/balance/list', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then((response) => {
            const res = response.json()
            return res;
        })
        .catch(async(error) => {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            const login = await AsyncStorage.getItem('@login');
            var err = {
                "email": login,
                "breakpoint": 'Trying to get balance',
                "name": error.name,
                "message": error.message
            }
            console.log(err);
            const resp = await SendLogError(err);
            console.log(resp);
            if (resp)
                if (resp.status)
                    if (resp.status == 'ok')
                        Toast.show('Ошибка отправлена на сервер');
            console.log(resp);
            return {
                'status': 'got error'
            }
        });
    return resp;
}

export const Ping = async (token) => {
    /* console.log(token);
    console.log(data); */
    resp = await fetch(currentUrl + '/api/ping', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {return {"status": 'not ok'}});
    return resp;
}
