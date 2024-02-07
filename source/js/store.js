let $ = document;
let shopItems = $.querySelector(".shop-items");
let cartItems = $.querySelector(".cart-items");
let totalProductPrices = $.querySelector(".cart-total-price");
let removeAllBtn = $.querySelector("#remove-all-btn");

let basket = [];

let allProducts = [
  {
    id: 1,
    title: "Album 1",
    image: "./images/Album 1.png",
    price: 12.99,
    count: 1,
    addToBasket: "ADD TO CART",
  },

  {
    id: 2,
    title: "Album 2",
    image: "./images/Album 2.png",
    price: 14.99,
    count: 1,
    addToBasket: "ADD TO CART",
  },

  {
    id: 3,
    title: "Album 3",
    image: "./images/Album 3.png",
    price: 9.99,
    count: 1,
    addToBasket: "ADD TO CART",
  },

  {
    id: 4,
    title: "Album 4",
    image: "./images/Album 4.png",
    price: 19.99,
    count: 1,
    addToBasket: "ADD TO CART",
  },

  {
    id: 5,
    title: "T-Shirt",
    image: "./images/Shirt.png",
    price: 19.99,
    count: 1,
    addToBasket: "ADD TO CART",
  },

  {
    id: 6,
    title: "Coffee",
    image: "./images/Cofee.png",
    price: 6.99,
    count: 1,
    addToBasket: "ADD TO CART",
  },
];

let productItemsGenerator = (productItems) => {
  let titleElem,
    imageElem,
    priceElem,
    buttonElem,
    productContainer,
    shopDetails = null;

  let shopItemsFragment = $.createDocumentFragment();

  productItems.forEach((items) => {
    productContainer = $.createElement("div");
    productContainer.classList.add("shop-item");

    titleElem = $.createElement("span");
    titleElem.innerHTML = items.title;
    titleElem.classList.add("shop-item-title");

    imageElem = $.createElement("img");
    imageElem.setAttribute("src", items.image);
    imageElem.classList.add("shop-item-image");

    shopDetails = $.createElement("div");
    shopDetails.classList.add("shop-item-details");

    priceElem = $.createElement("span");
    priceElem.innerHTML = "$" + items.price;
    priceElem.classList.add("shop-item-price");

    buttonElem = $.createElement("button");
    buttonElem.innerHTML = items.addToBasket;
    buttonElem.setAttribute("class", "btn btn-primary shop-item-button");

    buttonElem.addEventListener("click", () => {
      addProductToBasket(items.id);
      usersBasketsArray(basket);
      sumPriceFunction();
      setLocalStorage(basket);
    });

    shopDetails.append(priceElem, buttonElem);
    productContainer.append(titleElem, imageElem, shopDetails);
    shopItemsFragment.appendChild(productContainer);
  });
  shopItems.appendChild(shopItemsFragment);
};

let addProductToBasket = (productId) => {
  let mainProductsBasket = allProducts.find((product) => {
    return product.id === productId;
  });

  let productFindIndex = checkProductsById(mainProductsBasket.id);

  if (productFindIndex !== -1) {
    basket[productFindIndex].count++;
  } else {
    basket.push(mainProductsBasket);
    setLocalStorage(basket);
  }
};

let usersBasketsArray = (basketArray) => {
  cartItems.innerHTML = "";

  let cardItemsFragment = $.createDocumentFragment();
  basketArray.forEach((baskets) => {
    let cardItem,
      cardRow,
      cardImage,
      cardTitle,
      cardPrice,
      cardQuantity,
      cardQuantityInput,
      removeBtnElem;
    cardRow = $.createElement("div");
    cardRow.className = "cart-row";

    cardItem = $.createElement("div");
    cardItem.className = "cart-item cart-column";

    cardImage = $.createElement("img");
    cardImage.setAttribute("src", baskets.image);
    cardImage.classList.add("cart-item-image");

    cardTitle = $.createElement("span");
    cardTitle.classList.add("cart-item-title");
    cardTitle.innerHTML = baskets.title;

    cardPrice = $.createElement("span");
    cardPrice.className = "cart-price cart-column";
    cardPrice.innerHTML = "$" + baskets.price;

    cardQuantity = $.createElement("div");
    cardQuantity.className = "cart-quantity cart-column";

    cardQuantityInput = $.createElement("input");
    cardQuantityInput.classList.add("cart-quantity-input");
    cardQuantityInput.setAttribute("type", "number");
    cardQuantityInput.value = baskets.count;
    cardQuantityInput.addEventListener("change", () => {
      updateProductQuantityCount(baskets.id, cardQuantityInput.value);
    });

    removeBtnElem = $.createElement("button");
    removeBtnElem.setAttribute("class", "btn btn-danger");
    removeBtnElem.innerHTML = "REMOVE";

    removeBtnElem.addEventListener("click", function () {
      removeItemFromBasket(baskets.id);
    });

    cardItem.append(cardImage, cardTitle);
    cardQuantity.append(cardQuantityInput, removeBtnElem);

    cardRow.append(cardItem, cardPrice, cardQuantity);
    cardItemsFragment.appendChild(cardRow);
  });
  cartItems.appendChild(cardItemsFragment);
};

removeAllBtn.addEventListener("click", () => {
  removeAllProductsFromBasket();
});

let sumPriceFunction = () => {
  totalProductPrices.innerHTML = "";
  let totalPriceValue = 0;
  basket.forEach((totalBaskets) => {
    totalPriceValue += totalBaskets.price * totalBaskets.count;
  });
  totalProductPrices.innerHTML = "$" + totalPriceValue.toFixed(2);
  usersBasketsArray(basket);
};

let updateProductQuantityCount = (productId, newCount) => {
  basket.forEach((product) => {
    if (product.id === productId) {
      product.count = newCount;
    }
  });
  setLocalStorage(basket);
  sumPriceFunction();
};

let removeItemFromBasket = (productId) => {
  let getItem = JSON.parse(localStorage.getItem("Basket"));
  basket = getItem;
  let findBasketIndex = basket.findIndex((basketsId) => {
    return basketsId.id === productId;
  });
  basket.splice(findBasketIndex, 1);
  setLocalStorage(basket);
  sumPriceFunction();
  usersBasketsArray(basket);
};

let removeAllProductsFromBasket = () => {
  basket = [];
  sumPriceFunction();
  usersBasketsArray(basket);
  localStorage.removeItem("Basket");
};

let checkProductsById = (productId) => {
  let res = basket.findIndex((checkItem) => checkItem.id === productId);
  return res;
};

let setLocalStorage = (productsArray) => {
  localStorage.setItem("Basket", JSON.stringify(productsArray));
};

let getLocalStorage = () => {
  let localStorageBasket = JSON.parse(localStorage.getItem("Basket"));
  if (localStorageBasket) {
    basket = localStorageBasket;
  } else {
    basket = [];
  }
  sumPriceFunction();
  usersBasketsArray(basket);
};

window.addEventListener("load", () => {
  getLocalStorage();
});

productItemsGenerator(allProducts);
