function calculateSubTotal(countedCartItems) {
  let subTotalCartItems = [];
  for (let item of countedCartItems) {
    subTotalCartItems.push(Object.assign({}, item, {subTotal: (item.price * item.count)}));
  }
  return subTotalCartItems;
}

function calculateTotalPrice(subTotalCartItems) {
  let totalPrice = 0;
  for (let item of subTotalCartItems) {
    totalPrice += item.subTotal;
  }
  return totalPrice;
}

function generateHeader() {
  return '***<没钱赚商店>收据***\n';
}

function generateBody(subTotalCartItems) {
  let body = '';

  for (let item of subTotalCartItems) {
    let itemReceipt = '名称：' + item.name +
      '，数量：' + item.count + item.unit +
      '，单价：' + item.price.toFixed(2) +
      '(元)，小计：' + item.subTotal.toFixed(2) + '(元)\n';
    body = body.concat(itemReceipt);
  }
  return body;
}

function generateFooter(totalPrice) {
  return '----------------------\n' +
    '总计：' + totalPrice.toFixed(2) + '(元)\n' +
    '**********************';
}
function generateReceipt(totalPrice, subTotalCartItems) {
  let receipt = '';

  let header = generateHeader();
  let body = generateBody(subTotalCartItems);
  let footer = generateFooter(totalPrice);
  receipt = receipt.concat(header).concat(body).concat(footer);

  return receipt;
}

function itemCount(cartItems) {
  let countedCartItems = [];

  for (let rawItem of cartItems) {
    let existItem = countedCartItems.find((item)=> {
      return Object.is(item.barcode, rawItem.barcode);
    });
    if (existItem) {
      existItem.count++;
    } else {
      countedCartItems.push(Object.assign({}, rawItem, {count: 1}));
    }
  }
  return countedCartItems;
}
// implement
function printReceipt(inputs) {
  let countedCartItems = itemCount(inputs);
  let subTotalCartItems = calculateSubTotal(countedCartItems);
  let totalPrice = calculateTotalPrice(subTotalCartItems);
  //noinspection UnnecessaryLocalVariableJS
  let receipt = generateReceipt(totalPrice, subTotalCartItems);

  console.log(receipt);
}
