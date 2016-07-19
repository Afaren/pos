// function getCartItems(allItems, barcodes) {
//   let cartItems = [];
//
//   for (let barcode of barcodes) {
//     let foundItem = allItems.find((item)=> {
//       return Object.is(item.barcode, barcode);
//     });
//     cartItems.push(Object.assign({}, foundItem));
//   }
//   return cartItems;
// }


function calculateBarcodeCount(barcodes) {
  let barcodeCounts = [];
  for (let barcode of barcodes) {
    // console.log(barcodes);
    let barcodeAlreadyInside = barcodeCounts.find((toBeFound)=> {
      // console.log('afar   '+ toBeFound);
      return Object.is(toBeFound.barcode, barcode);
    });
    if (barcodeAlreadyInside) {
      barcodeAlreadyInside.count++;
    } else {
      barcodeCounts.push(Object.assign({}, {barcode: barcode}, {count: 1}));//这里纠结了很久
    }
  }

  return barcodeCounts;
}

function calculateItemCount(barcodeCounts, allItems) {
  let countedCartItems = [];

  for (let foo of barcodeCounts) {
    let existItem = allItems.find((item)=> {
      return Object.is(item.barcode, foo.barcode);
    });
    if (existItem) {
      // existItem.count = foo.count; // 就是这里写错了，欸
      countedCartItems.push(Object.assign({}, existItem, {count: foo.count}));
    }
  }

  return countedCartItems;
}

function calculateSubTotal(countedCartItems) {

  let subCountedCartItems = [];
  for (let item of countedCartItems) {
    subCountedCartItems.push(Object.assign({}, item, {subTotal: item.price * item.count}));
  }


  return subCountedCartItems;

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

// implement
function printReceipt(inputs) {
  let allItems = loadAllItems();
  let barcodeCounts = calculateBarcodeCount(inputs);
  let countedCartItems = calculateItemCount(barcodeCounts, allItems);
  let subTotalCartItems = calculateSubTotal(countedCartItems);
  let totalPrice = calculateTotalPrice(subTotalCartItems);
  //noinspection UnnecessaryLocalVariableJS
  let receipt = generateReceipt(totalPrice, subTotalCartItems);

  console.log(receipt);
}
