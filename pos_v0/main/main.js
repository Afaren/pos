function calculateSubTotal(countedCartItems) {


}
function calculateTotalPrice(subCartItems) {

}
function generateReceipt(totalPrice, subCartItems) {

}
function printReceipt(inputs) {

  let subCartItems = calculateSubTotal(inputs);
  let totalPrice = calculateTotalPrice(subCartItems);
  //noinspection UnnecessaryLocalVariableJS
  let receipt = generateReceipt(totalPrice, subCartItems);
  return receipt;

}
