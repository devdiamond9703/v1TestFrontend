const URL = 'http://127.0.0.1:8000/api'

export async function getMaterialAllApi() {
    let response = await fetch(`${ URL }/material`, {
        method: 'GET'
    })
    return await response.json();
}

export async function saveMaterialApi(item) {
    let response = await fetch(`${ URL }/material`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    return await response.json()
}
