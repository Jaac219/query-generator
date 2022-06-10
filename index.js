const axios = require('axios');
const fs = require('fs');

function generateCategories(){
  axios.get(`https://api.mercadolibre.com/sites/MCO/categories`)
    .then((resp)=>{
      let txt = '';
      resp.data.forEach((val, index)=>{
        txt = txt + `INSERT INTO categories (id, name, "createdAt", "updatedAt") VALUES (${++index}, '${val.name}', '2022-06-09', '2022-06-09');\n`;
      });
      fs.writeFile('categories.sql', txt, 'utf8', ()=>{});
    })
    try {
      fs.readFileSync('productsCategories.sql')
      fs.unlinkSync('productsCategories.sql')
      fs.writeFile('productsCategories.sql', txtPC, ()=>{});
    } catch (error) {
      fs.writeFile('productsCategories.sql', txtPC, ()=>{});
    } 
}

function generateProducts(){
  axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=cocina`)
  .then((resp)=>{
    let txtP = '';
    let index = 51;
    resp.data.results.forEach((val)=>{
      txtP = txtP + `INSERT INTO products (id, name, price, image, description, condition, brand, model, stock, score, state,"createdAt", "updatedAt", "userId") VALUES (${++index}, '${val.title}', '${val.price}', '${val.thumbnail}', '${val.permalink}', '${val.condition}', null, '${val.prices.id}', '${val.sold_quantity}', null, 'active', '2022-06-09', '2022-06-09', 1);\n`;
    });
    fs.writeFile('products.sql', txtP, ()=>{});
  })
  try {
    fs.readFileSync('productsCategories.sql')
    fs.unlinkSync('productsCategories.sql')
    fs.writeFile('productsCategories.sql', txtPC, ()=>{});
  } catch (error) {
    fs.writeFile('productsCategories.sql', txtPC, ()=>{});
  } 
}


function generateProductsCategories(){
  let txtPC = '';
  for (let i = 0; i < 100; i++) {
      let categoryAleatoria = Math.floor(Math.random() * (31 - 1) + 1);
      let productAleatorio = Math.floor(Math.random() * (51 - 1) + 1);
      txtPC = txtPC + `INSERT INTO "ProductCategory" ("createdAt", "updatedAt", "categoryId", "productId") VALUES ('2022-06-09', '2022-06-09', ${categoryAleatoria}, ${productAleatorio});\n`;
    }

    try {
      fs.readFileSync('productsCategories.sql')
      fs.unlinkSync('productsCategories.sql')
      fs.writeFile('productsCategories.sql', txtPC, ()=>{});
    } catch (error) {
      fs.writeFile('productsCategories.sql', txtPC, ()=>{});
    }    
}

generateProductsCategories();
// generateCategories();
// generateProducts();