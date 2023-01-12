const socket = io()

const form = document.getElementById('add-realtimeproducts-form');
const productListContainer = document.getElementById('product-list-container');


// Agregar Producto
form.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(form)
    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'manual'
    }

    fetch('http://localhost:8080/realtimeproducts',requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error))

    form.reset()
})

socket.on('getProducts', data => {
    console.log('probando 123' + data);
})

socket.on('newProduct', data => {
    const newProductFragment = document.createElement('div')
    if(!data.thumbnails.length){
        newProductFragment.innerHTML = `
        <div id="product-item">
            <p id="no-image">El producto no tiene imagen</p>
            <p id="title">${data.title}</p>
            <p>$${data.price}</p>
        </div>`
    }else{
        newProductFragment.innerHTML = `
        <div id="product-item">
            <div class="thumbnail-container">
                <img src="../../statics/img/${data.thumbnails[0].originalName}" alt="">
            </div>
            <p id="title">${data.title}</p>
            <p>$${data.price}</p>
        </div>`
    }
    
    productListContainer.append(newProductFragment)
})

