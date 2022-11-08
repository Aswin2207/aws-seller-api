const http = require('http');
const SellingPartnerAPI = require('amazon-sp-api');
const express = require('express');
const axios = require('axios');
var path = require('path');
const fs = require('fs');

const creds = {
    SELLING_PARTNER_APP_CLIENT_ID: "amzn1.application-oa2-client.92f5b27c6c804493b6278ca5f4473635",
    SELLING_PARTNER_APP_CLIENT_SECRET: "731419039602c56f3802315a6b1015a8437b04d5ae8906fb5a1fd143799f0823",
    AWS_ACCESS_KEY_ID: "AKIA4CC7AAGQDDAXLJGC",
    AWS_SECRET_ACCESS_KEY: "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",
    AWS_SELLING_PARTNER_ROLE :"arn:aws:iam::829127917984:role/Seller_partner"
}
var mapData=[];


var app = express();
app.set('view engine', 'pug');
app.set('views', 'views');
app.get('/orders', function (req, res) {

    var data = mapData; 
    // res.render('table.pug', { table_data: data });
    res.sendFile(path.join(__dirname + '/table.html'),{data:data});
    // res.render("lists", { pageTitle: "Home" ,table_data: data});
});
app.get('/data',function(req,res){
    const data = fs.readFileSync(path.join(__dirname + '/json/output.json'), "utf8");
    //listing all files using forEach
    if(data)
    res.status(200).json(JSON.parse(data));
    else
    res.status(500).json({ "err": "Internal Server Error" });

      
  
     });
  
var server = app;
app.use(express.static(path.join(__dirname, "node_modules/tabulator-tables/dist/css")));
app.use(express.static(path.join(__dirname, "node_modules/tabulator-tables/dist/js")));
// let sellingPartner =
// new SellingPartnerAPI({
// region:"na",
// refresh_token:"Atzr|IwEBIIMXhVhhcjXfTBOA3VnDd2TBlYX5QrXiXvTRHtxhUsoTj6k6wN_XUCGgIrCaFoDA0cCfRXvpABxeGug9VJVCrqV1pZcld107UAbmbVqcoGeZCAiai5uj3RmlQRcOh0lxcL6X2gHuRGPyKJWRFmrqulOrPfWgzbIw1SM0boNX9MvR6DBc_vQ31vgoJ1ZVSljOMWT_YHzxSuqB6YrLU_bYudUZ1QgeuY8BVsPPwV0nuOwA9S5oL_XpiIlpjJ4tSpjM2DLpcJMcKf6S_fzVLGVc-F5JqcoKb4BmHvks9SKEa1RNFJOBPpYSsJ2TZ9ymmq1pAvs" ,
// credentials: creds
// });
// const requestListener = function (req, res) {
//     res.writeHead(200);
//     res.end("mapData");
// }
// const server = http.createServer(requestListener);
server.listen(8080);
// test();

(async() => {
    try {


      let sellingPartner = new SellingPartnerAPI({
        region:"na",
        refresh_token:"Atzr|IwEBICruQ9hoEtrK6dWCWZgR48LJlJDSRQucHbStZFTNkrP86IV20rBJjqXwh1zyKcoqET3fJyEr4eZVJuE9gKPqNdMepU59sk5Uq_FAlJNaz2E1RsLzvDHFw8NC_cPUuEgD_A0vieSDR_PZ-cKyysXPC4m2nic9AbOxb-gqxbHQbOva4Kq7TllH_gWpLdcrkShjAPYw6E3yS_tnOOr219DJoiTRqNA5IgULBMqTVwA0wVoK7bFP80TEDEwCNNPmCAv3nJiOfrlQhotdOh7qepopoUkLqn5PPvGDOFawJFYzHYgxAjsAK8woFveqZS6rZSAHuEk" ,
        credentials: creds
        });
    //   let res = await sellingPartner.callAPI({
    //     operation:'getMarketplaceParticipations',
    //     endpoint:'sellers'
    //   });
    //   let res = await sellingPartner.callAPI({
    //     operation:'getOrderMetrics',
    //     endpoint:'sales',
    //     query:{
    //       marketplaceIds:['ATVPDKIKX0DER'],
    //       interval:'2022-10-01T00:00:00-07:00--2022-10-11T20:00:00-07:00',
    //       granularity:'Hour'
    //     }
    //   });
    // let res = await sellingPartner.callAPI({
    //     operation:'getCatalogItem',
    //     endpoint:'catalogItems',
    //     query:{
    //       MarketplaceId:'ATVPDKIKX0DER'
    //     },
    //     path:{
    //       asin:'B0B459B5HZ'
    //     },
    //     options:{
    //       version:'v0'
    //     }
    //   });
      let res = await sellingPartner.callAPI({
        operation:'getOrders',
        endpoint:'orders',
        query:{
            MarketplaceIds:["ATVPDKIKX0DER"],
            CreatedAfter:'2022-10-01T00:00:00-07:00'
        },
        options:{
          version:'v0'
        }
      });
    // let res = await sellingPartner.callAPI({
    //     operation:'createReport',
    //     endpoint:'reports',
    //     body:{
    //       reportType:'GET_FLAT_FILE_OPEN_LISTINGS_DATA',
    //       marketplaceIds:['ATVPDKIKX0DER']
    //     }
    //   });
    // console.log(res.BuyerInfo);
    mapData.push(res);
    // console.log(mapData)
    mapData.map(dat=>{
        // console.log(dat)
      });

    //   fs.writeFile("output.json", JSON.stringify(mapData), 'utf8', function (err) {
    //     if (err) {
    //         console.log("An error occured while writing JSON Object to File.");
    //         return console.log(err);
    //     }

    // });
    //   );
    } catch(e){
      console.log(e);
    }
  })();


// const qs = require('qs');
// const fetch = require("node-fetch");
// //     SELLING_PARTNER_APP_CLIENT_ID: "amzn1.application-oa2-client.92f5b27c6c804493b6278ca5f4473635",
// //     SELLING_PARTNER_APP_CLIENT_SECRET: "731419039602c56f3802315a6b1015a8437b04d5ae8906fb5a1fd143799f0823",
// //     AWS_ACCESS_KEY_ID: "AKIA4CC7AAGQDDAXLJGC",
// //     AWS_SECRET_ACCESS_KEY: "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",
//     // AWS_SELLING_PARTNER_ROLE :"arn:aws:iam::829127917984:role/Seller_partner"
// (async() => {
//    const body = {
//       grant_type: 'refresh_token',
//       client_id: "amzn1.application-oa2-client.92f5b27c6c804493b6278ca5f4473635",
//       refresh_token: "Atzr|IwEBICruQ9hoEtrK6dWCWZgR48LJlJDSRQucHbStZFTNkrP86IV20rBJjqXwh1zyKcoqET3fJyEr4eZVJuE9gKPqNdMepU59sk5Uq_FAlJNaz2E1RsLzvDHFw8NC_cPUuEgD_A0vieSDR_PZ-cKyysXPC4m2nic9AbOxb-gqxbHQbOva4Kq7TllH_gWpLdcrkShjAPYw6E3yS_tnOOr219DJoiTRqNA5IgULBMqTVwA0wVoK7bFP80TEDEwCNNPmCAv3nJiOfrlQhotdOh7qepopoUkLqn5PPvGDOFawJFYzHYgxAjsAK8woFveqZS6rZSAHuEk",
//       client_secret: "731419039602c56f3802315a6b1015a8437b04d5ae8906fb5a1fd143799f0823",
//    };
// const acccessToken = await fetch('https://api.amazon.com/auth/o2/token', {
//       method: 'POST',
//       body: qs.stringify(body),
//       headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
//    });
//    console.log(acccessToken)
// if (acccessToken.ok) {
//   console.log(acccessToken)
//       return await acccessToken.json();
//    } else {
//       // console.log(acccessToken)
//       throw new Error(acccessToken.statusText);
//    }
// })();

