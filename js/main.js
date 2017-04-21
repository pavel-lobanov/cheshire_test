let priceBoxIsOpen = false; //открыт ли список цен
let goodsInCart = []; //товары в корзине
const goodsBase = [{ //база товаров, а-ля пришедшая с сервера в JSON-формате
"goodName": "Acana Wild Prairie cat  and dog", 
"discription": "Беззерновой корм с курицей для собак корм с курицей", 
"prices": [{"weight" : "0.34",
			"price" : "10.00"},
			{"weight" : "2.42",
			"price" : "48.00"},
			{"weight" : "6.8",
			"price" : "95.00"},
			{"weight" : "12",
			"price" : "165.00"},]
},
{
"goodName": "Acana Wild Prairie cat  and dog", 
"discription": "Беззерновой корм с курицей для собак корм с курицей", 
"prices": [{"weight" : "0.34",
			"price" : "11.23"},
			{"weight" : "2.42",
			"price" : "48.00"},
			{"weight" : "6.8",
			"price" : "95.00"},
			{"weight" : "12",
			"price" : "165.00"},]
},
{
"goodName": "Ami Play Crazy", 
"discription": "Лежак овальный, размер XS", 
"prices": [{"weight" : "0.34",
			"price" : "12.50"},
			{"weight" : "2.42",
			"price" : "48.00"},
			{"weight" : "6.8",
			"price" : "95.00"},
			{"weight" : "12",
			"price" : "165.00"},]
},
{
"goodName": "Acana Wild Prairie cat  and dog", 
"discription": "Беззерновой корм с курицей для собак корм с курицей", 
"prices": [{"weight" : "0.34",
			"price" : "10.40"},
			{"weight" : "2.42",
			"price" : "48.00"},
			{"weight" : "6.8",
			"price" : "95.00"},
			{"weight" : "12",
			"price" : "165.00"},]
},
{
"goodName": "Acana Wild Prairie cat  and dog", 
"discription": "Беззерновой корм с курицей для собак корм с курицей", 
"prices": [{"weight" : "0.34",
			"price" : "10.00"},
			{"weight" : "2.42",
			"price" : "48.00"},
			{"weight" : "6.8",
			"price" : "95.00"},
			{"weight" : "12",
			"price" : "165.00"},]
},
{
"goodName": "Ami Play Crazy", 
"discription": "Лежак овальный, размер XS", 
"prices": [{"weight" : "0.34",
			"price" : "10.00"},
			{"weight" : "2.42",
			"price" : "48.00"},
			{"weight" : "6.8",
			"price" : "95.00"},
			{"weight" : "12",
			"price" : "165.00"},]
}];

//Создает список товаров из базы
function createGoodsList () {
	var mainContainer = document.getElementsByClassName('container')[0];
	var frag = document.createDocumentFragment();
	for (var i = 0; i < goodsBase.length; i++) {
		if (i === 0 || i%3 === 0) {
			var rowEl = document.createElement('div');
			rowEl.className = 'row';
		}
		rowEl.innerHTML += '<div class="col-sm-4 col-lg-4">' +
					'<figure><p><img src="img/goods1.png" alt="goods"></p>' +
						'<figcaption><h3>' + goodsBase[i].goodName + '</h3>' +
						'<small>' + goodsBase[i].discription + '</small></figcaption>' +
						'<div class="choose-price clearfix" data-product="'+ i +'">' +
							'<div class="price" data-priceNumber="0"><span>' + goodsBase[i].prices[0].price + 'руб</span></div>' +
							'<div class="weight"><span>' + goodsBase[i].prices[0].weight + 'кг</span>' +
							'<img src="img/caret-down.png" alt="V"></div></div>' +
						'<div class="goods-btns"><button class="to-cart">В корзину</button>' +
						'<button class="more-info">Подробнее</button></div></figure></div>';
		if (i%3 === 0) frag.appendChild(rowEl);
	}
	mainContainer.appendChild(frag);
}

//Добавляет события на кнопки с ценами и добавить в корзину
function addListeners () {
	var priceButtons = document.getElementsByClassName('choose-price'),
		toCartButtons = document.getElementsByClassName('to-cart');

	for (var i = 0; i < goodsBase.length; i++) {
		priceButtons[i].addEventListener('click', createAndShowPriceBox, false);
		toCartButtons[i].addEventListener('click', addToCart, false);
	}
}

//Создает окошко с ценами на веса
function createAndShowPriceBox (evObj) {
	if (priceBoxIsOpen) {
		setTimeout(deleteBox, 10);
		return false;
	}
	var evObj    	 = evObj || window.event,
		elemTarget   = evObj.currentTarget,
		productNo    = elemTarget.dataset.product,
		priceBoxElem = document.createElement('div'),
		ulElem       = document.createElement('ul');
	priceBoxElem.className = 'prices-box';

	for (var i = 0; i < goodsBase[productNo].prices.length; i++) {
		var liElem = document.createElement('li');
		liElem.innerHTML = '<div class="price"><span>'+ goodsBase[productNo].prices[i].price +' руб</span></div>' + 
			'<div class="weight"><span>'+ goodsBase[productNo].prices[i].weight +' кг</span></div>';
		liElem.addEventListener('click', function (evObj) {changePrice(elemTarget,evObj);}, false);
		liElem.dataset.priceNumber = i;
		ulElem.appendChild(liElem);
	}
	priceBoxElem.appendChild(ulElem);
	elemTarget.appendChild(priceBoxElem);
	priceBoxIsOpen = true;
}

//Меняет цену в зависимости от веса товара
function changePrice (priceElement,evObj) {
	var priceNumber = evObj.currentTarget.dataset.priceNumber,
		productNumber = parseFloat(priceElement.dataset.product);
		
	priceElement.innerHTML = '<div class="price" data-priceNumber="'+ priceNumber +'""><span>' + goodsBase[productNumber].prices[priceNumber].price + 'руб</span></div>' +
							'<div class="weight"><span>' + goodsBase[productNumber].prices[priceNumber].weight + 'кг</span>' +
							'<img src="img/caret-down.png" alt="V"></div></div>';
	setTimeout(deleteBox, 10);
}

//Удаляет модальное окно
function deleteBox () {
	priceBoxIsOpen = false;
	var priceBox = document.getElementsByClassName('prices-box')[0];
	if (!priceBox) return false;
	var parent = priceBox.parentNode;
	parent.removeChild(priceBox);
}

//Добавляет товар в базу корзины
function addToCart (evObj) {
	var product = evObj.target.closest('figure'),
		productNumber = parseFloat(product.querySelector('.choose-price').dataset.product),
		priceNumber = parseFloat(product.getElementsByClassName('price')[0].dataset.pricenumber);

	goodsInCart.push({"priceNumber" : priceNumber, "productNumber": productNumber});
	showCart();
}

//Создает корзину и наполняет ее товарами из базы
function showCart () {
	var mainContainer = document.body,
		korzinaDiv    = document.createElement('div'),
		fixOvelayDiv  = document.createElement('div'),
		cartBoxDiv    = document.createElement('div'),
		orderFieldDiv = document.createElement('div'),
		ulElem        = document.createElement('ul'),
		h2Elem        = document.createElement('h2'),
		returnButton  = document.createElement('button')
		totalPrice    = 0;
	korzinaDiv.className    = 'korzina1';
	fixOvelayDiv.className  = 'fix-overlay';
	cartBoxDiv.className    = 'cart-box';
	orderFieldDiv.className = 'order-field';
	returnButton.className  = 'return-btn';
	h2Elem.textContent = 'Ваш заказ:';

	for (var i = 0; i < goodsInCart.length; i++) {
		var liElem = document.createElement('li'),
			productName   = goodsBase[goodsInCart[i].productNumber].goodName,
			productWeight = goodsBase[goodsInCart[i].productNumber].prices[goodsInCart[i].priceNumber].weight,
			productPrice  = goodsBase[goodsInCart[i].productNumber].prices[goodsInCart[i].priceNumber].price;

		liElem.insertAdjacentHTML('afterBegin', 
			'<div class="product-name">'+ productName +'</div>' +
			'<div class="weight">'+ productWeight +' кг</div>' +
			'<div class="price">'+ productPrice +' руб</div>');
		ulElem.appendChild(liElem);
		totalPrice += Number(productPrice);
	}
	mainContainer.appendChild(korzinaDiv);
	cartBoxDiv.appendChild(h2Elem)
	orderFieldDiv.appendChild(ulElem);
	cartBoxDiv.appendChild(orderFieldDiv);
	korzinaDiv.append(fixOvelayDiv, cartBoxDiv);
	cartBoxDiv.insertAdjacentHTML('beforeEnd', 
		'<div class="cart-footer">' +
				'<div class="total-price">Итого: '+ totalPrice.toFixed(2) +' руб</div>' +
				'<div class="cart-btns">' +
					'<button class="return-btn" onclick="closeModal()">Вернуться в каталог</button>' +
					'<button class="order-btn">Заказать</button></div></div>');
}

function closeModal () {
	var mainContainer = document.body,
		modalWindow = document.getElementsByClassName('korzina1')[0];
	mainContainer.removeChild(modalWindow);
}

createGoodsList();
addListeners();
