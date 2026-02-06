const fs = require("fs");
let data = fs.readFileSync("data.json");
data = JSON.parse(data);

let products = data.products;
let customers = data.customers;
const TAX = 0.06;
let totalOrdersProccessed = customers.length;
let totalItemsSold = 0;
let totalProfitProccessed =  0;

for (customer of customers) {
    console.log(customer.name);
    let orders = customer.purchases;
    let orderTbl = [];
    let subtotal = 0;
    for (let i = 0; i < orders.length; i++) {
        let quantity = orders[i];
        if (quantity > 0) {
            totalItemsSold += quantity;
            let totalItemPrice = products[i].sellingPrice * quantity;
            let totalItemProfit =
                (products[i].sellingPrice - products[i].costToSeller) *
                quantity;
            subtotal += totalItemPrice;
            totalProfitProccessed += totalItemProfit
            orderTbl.push({
                "Item Purchased": products[i].item,
                "Selling Price": products[i].sellingPrice.toFixed(2),
                Quantity: quantity,
                "Item Cost to Procure": products[i].costToSeller.toFixed(2),
                "Total Item Profit": totalItemProfit.toFixed(2),
                "Total Item Price": totalItemPrice.toFixed(2),
            });
            
        }
    }
    console.table(orderTbl);
    console.log(`Subtotal: $${subtotal.toFixed(2)}`);
    const orderTax = TAX * subtotal;
    console.log(`Tax: $${orderTax.toFixed(2)}`);
    console.log(`Processing Fee: $${customer.processing.toFixed(2)}`);
    const custTotal = subtotal + orderTax + customer.processing;
    console.log(`Order Total: $${custTotal.toFixed(2)}`);
    console.log();
}
 

console.log(`Total Orders Proccessed ${totalOrdersProccessed}`);
console.log(`Total Items Sold ${totalItemsSold}`)
console.log(`Total Profit Proccessed ${totalProfitProccessed.toFixed(2)}`)