const loadAllProduct = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
}

const setAllMenu = async () => {
    const data = await loadAllProduct();

    const allMenu = document.getElementById('all-menu');

    const uniqueArray = [];
    for (const product of data) {
        // console.log(product.category);

        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);
            // console.log(product.category);

            const li = document.createElement('li');
            li.innerHTML = `<a>${product.category}</a>`;
            allMenu.appendChild(li);
        }

    }
}

setAllMenu();

const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', async (event) => {
    //console.log(event.key)
    if (event.key === 'Enter') {
        // console.log(searchField.value)
        const searchValue = searchField.value;

        const allProduct = await loadAllProduct();
        // console.log(allProduct);
        const foundProducts = allProduct.filter(product => product.category.includes(searchValue));
        console.log(foundProducts);

        const productContainer = document.getElementById('product-container');
        productContainer.textContent = '';

        foundProducts.forEach(product => {
            console.log(product);
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
                <figure><img src="${product.image}" alt="Shoes" class="h-80 w-full" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${product.category}</h2>
                    <p>${product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title}</p>
                    <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
            </div>
            `;
            productContainer.appendChild(div);
        })
    }
})