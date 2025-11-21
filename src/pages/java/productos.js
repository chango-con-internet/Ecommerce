//funcion de cargar productos
async function cargarproductos() {
    try {
        const response = await fetch('http://localhost:8081/api/productos');
        const productos = await response.json();

        const grid=document.getElementById('product-grid');
                grid.innerHTML= productos.map(productos=>`
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 product-car"
                        data-category="laptops"
                        data-price="${productos.precio}"
                        data-productId="${productos.productId}">

                    <div class="bg-linear-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center overflow-hidden">
                    <img src="${productos.imagen}" alt="${productos.nombre}"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy">
                    
                    <div class="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -15%
                    </div>
                    </div>

                    <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900">
                    ${productos.nombre}
                    </h3>

                    <p class="text-sm text-gray-800 mb-4">
                    ${productos.descripcipcion}
                    </p>
                    <div class="flex items-center justify-between mb-4">
                    <div>
                    <spam class="text-2xl font-bold text-blue-600">
                    ${(productos.precio ||0).toLocaleString('es-CO')}
                    </spam>
                    </div>

                    <div class="flex text-yellow-600">
                    ⭐⭐⭐⭐⭐
                    </div>
                    </div>
                    
                    <div class="flex space-x-2">
                    <button class="ver-detalles=btn bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex-1 text-sm">
                    Detalles
                    </button>

                    <button class=" add-to-cart-btn  bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex-1 text-sm">
                    Comprar
                    </button>
                    </div>
                    </div>
                    </div>

                    `).join('');
                    console.log("productos cargados con exito");

                
    } catch (error) {
        console.error("Error al cargar los productos",error);
    }
}

//
cargarproductos();
setInterval(() => {
    cargarproductos();

}, 5000);