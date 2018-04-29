const products = require('../products'),
    APIError = require('../rest').APIError;

module.exports = {
    "GET /api/products": async (ctx , next) => {
        ctx.rest({
            products: products.getProducts()
        });
        // ctx.response.type = 'application/json';
        // ctx.response.body = {
        //     products
        // }
    },
    "POST /api/products": async(ctx , next) => {
        const p = products.createProduct(ctx.request.body.name , ctx.request.body.manufacturer , parseFloat(ctx.request.body.price));
        ctx.rest(p);
        // const p = {
        //     name: ctx.request.body.name,
        //     price: ctx.request.body.price
        // };
        // products.push(p);
        // ctx.response.type = 'application/json';
        // ctx.response.body = p;
    },
    "DELETE /api/products/:id": async(ctx , next) => {
        let p = procucts.deleteProduct(ctx.params.id);
        if(p){
            ctx.rest(p);
        }else{
            throw new APIError('product:not_found' , 'product not found by id.');
        };
    }
};