const URL = 'http://127.0.0.1:8000/api'

export async function getWarehousAllApi() {
    let response = await fetch(`${ URL }/warehous`, {
        method: 'GET'
    })
    return await response.json();
}

export async function saveWarehousApi(item) {
    let response = await fetch(`${ URL }/warehous`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    return await response.json()
}
