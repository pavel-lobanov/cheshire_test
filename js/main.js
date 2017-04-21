//;(function(){
	let goodsBase = [{
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
				"price" : "11.00"},
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
	let priceBoxIsOpen = false;
	let currObj = null;

	function createGoodsList (arguments) {
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
								'<div class="price"><span>' + goodsBase[i].prices[0].price + 'руб</span></div>' +
								'<div class="weight"><span>' + goodsBase[i].prices[0].weight + 'кг</span>' +
								'<img src="img/caret-down.png" alt="V"></div></div>' +
							'<div class="goods-btns"><button class="to-cart">В корзину</button>' +
							'<button class="more-info">Подробнее</button></div></figure></div>';
			if (i%3 === 0) frag.appendChild(rowEl);
		}
		mainContainer.appendChild(frag);
	}

	function addListeners (arguments) {
		var priceButtons = document.getElementsByClassName('choose-price');
		for (var i = 0; i < priceButtons.length; i++) {
			priceButtons[i].addEventListener('click', createAndShowPriceBox, false);
		}
	}

	function createAndShowPriceBox (evObj) {
		if (priceBoxIsOpen) return false;
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

	function changePrice (priceElement,evObj) {
		var priceNumber = evObj.currentTarget.dataset.priceNumber,
			productNumber = parseFloat(priceElement.dataset.product);
			
		priceElement.innerHTML = '<div class="price"><span>' + goodsBase[productNumber].prices[priceNumber].price + 'руб</span></div>' +
								'<div class="weight"><span>' + goodsBase[productNumber].prices[priceNumber].weight + 'кг</span>' +
								'<img src="img/caret-down.png" alt="V"></div></div>';
		
		setTimeout(deleteBox, 10)
	}

	function deleteBox () {
		priceBoxIsOpen = false;
		var priceBox = document.getElementsByClassName('prices-box')[0];
		if (!priceBox) return false
		var parent = priceBox.parentNode;
		parent.removeChild(priceBox);
	}

	createGoodsList();
	addListeners();
//})();