const URL = 'http://127.0.0.1:8000/api'

export async function getProductAllApi() {
    let response = await fetch(`${ URL }/product`, {
        method: 'GET'
    })
    return await response.json();
}

export async function saveProductApi(data) {
    let response = await fetch(`${ URL }/product`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function getMaterialByProductApi(product_id) {
    let response = await fetch(`${ URL }/product/${product_id}/materials`, {
        method: 'GET',
    })
    return await response.json()
}

export async function saveMaterialByProductApi(item) {
    let response = await fetch(`${ URL }/product-material`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    return await response.json()
}
