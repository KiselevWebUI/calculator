
let dialog, cross, products_block, product_volume_all;
dialog = document.querySelector('#dialog');

const products = [{v: 0}];

if(dialog){
    cross = document.querySelector('.popup-cross');
    
    dialog.addEventListener("click", (event) => {
        openPopup(event);
    });
    
    cross.addEventListener("click", (event) => {
        openPopup(event, 1);
    });

    products_block = document.querySelector('#products-block');
    product_volume_all = document.querySelector('#product-volume-all');
    document.querySelector('#calculatorBtn').addEventListener('click', () =>{
        openPopup(1);
    })
}

function openPopup(open, force){
    if(force || open.target == dialog){
        dialog.classList.remove('open');
        document.body.classList.remove('dialog_opened');
        document.body.style.paddingRight = `0px`;
    }else if(open == 1){
        dialog.classList.add('open');
        document.body.classList.add('dialog_opened');
    }
}

function takeValue(field, size, i){
    field.value = field.value.replace(/[^0-9]/g, '');
    products[i]['sizes'][size] = field.value;
    update();
}

function update(){
    let v, allV = 0;
    products.map((item)=>{
        if(item.id){
            let volume = document.querySelector('.product-volume' + item.id);
            v = 
            (isNaN(item.sizes.l)?0:item.sizes.l)
            *(isNaN(item.sizes.w)?0:item.sizes.w)
            *(isNaN(item.sizes.h)?0:item.sizes.h);
            products[item.id]['v'] = v;
            if(volume) volume.value = new Intl.NumberFormat().format(v); 
            allV += parseInt(v);
        }
    })
    product_volume_all.value = new Intl.NumberFormat().format(allV);
}

function updateContainer(){
    let blocks = products.filter((product)=>product.id);
    if(blocks.length > 2) products_block.classList.add('with_scroll');
    else products_block.classList.remove('with_scroll');
}

function removeProduct(i){
    let block = document.querySelector('.product-block-' + i);
    block.remove();
    products[i] = {};
    update();
    updateContainer();
}

function addNewProduct(){

    let product = {
        id: products.length,
        sizes: {l: 0, w: 0, h: 0},
        v: 0
    }

    products.push(product);

    let html = `<div class="product-block product-block-${product.id}">
        <div class="product-block-header">
            <h3>Товар ${product.id}</h3>
            <a onclick="removeProduct(${product.id})" title="Удалить товар">-</a>
        </div>
        <div class="form-field-block">
            <label>Название товара</label>
            <input type="text" class="form-input product-name" />
            <p class="form-input-comment">Скорее всего, это <span>линия “Одежда”</span></p>
        </div>
        <h4>Введите транспортировочные данные</h4>
        <div class="form-field-row">
            <div class="form-field-block">
                <label>Длина, см</label>
                <input type="text" oninput="takeValue(this, 'l', ${product.id})" class="form-input" />
            </div>
            <div class="form-field-block">
                <label>Ширина, см</label>
                <input type="text" oninput="takeValue(this, 'w', ${product.id})" class="form-input" />
            </div>
            <div class="form-field-block">
                <label>Высота, см</label>
                <input type="text" oninput="takeValue(this, 'h', ${product.id})" class="form-input" />
            </div>
            <div class="form-field-block">
                <label>Объем, см<sup></sup></label>
                <input type="text" readonly="" class="form-input product-volume${product.id}" />
            </div>
        </div>
    </div>`;

    products_block.insertAdjacentHTML("beforeEnd", html);
    updateContainer();
}