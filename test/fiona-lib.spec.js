var server
    , expect = SinonExpect.enhance(expect, sinon, "was")
    , pDocsResponse = '{ "isError":0,"signInRequired":0,"debug":"","error":"","data":{ "totalCount":315,"hasMore":1,"contentType":"Personal Documents","offset":0,"items":[ { "orderDateNumerical":"2014-02-03T11:32:36","numericSize":106760,"orderDate":"February 3, 2014","filters":{ "Personal Documents":1 },"author":"Instapaper","size":"104.3 KB","capability":[ "EMAIL_ALIAS_SUPPORTED" ],"image":"https://images-na.ssl-images-amazon.com/images/G/01/digital/fiona/myk/pdoc._V155869332_.png","renderDownloadElements":1,"asin":"3I67T5EOUSORRLZKHA7TN2BOOHS5MKTB","category":"kindle_pdoc","title":"Instapaper: Monday, Feb. 3","isNotYetLaunched":0 },{ "orderDateNumerical":"2014-01-31T15:48:20","numericSize":96796,"orderDate":"January 31, 2014","filters":{ "Personal Documents":1 },"author":"Instapaper","size":"94.5 KB","capability":[ "EMAIL_ALIAS_SUPPORTED" ],"image":"https://images-na.ssl-images-amazon.com/images/G/01/digital/fiona/myk/pdoc._V155869332_.png","renderDownloadElements":1,"asin":"U3ON3EOTR5IYG6DFXIK6OLOCMZDEGILC","category":"kindle_pdoc","title":"Instapaper: Friday, Jan. 31","isNotYetLaunched":0 }] },"json":1 }'
    , ownedResponse = '{ "isError":0,"signInRequired":0,"debug":"","error":"","data":{ "callMethod":"parallel","loanCount":0,"freeDictCount":2,"totalCount":76,"rentalCount":0,"updatableCount":0,"userGuideCount":7,"refundableCount":0,"hasMore":1,"dimsumCount":0,"offset":0,"items":[ { "refundEligibility":{ "resultCode":"FAIL_AGE","isEligible":0,"message":"You can only return content purchased in the last seven days. To return this item, please contact customer service at 1-866-321-8851." },"canReadNow":1,"bindingDisplay":"","authorOrPronunciation":"GmbH, PONS","binding":"","dpURL":"/gp/product/B00GQOF3WE/ref=kinw_myk_ro_title","author":"GmbH, PONS","udlGuid":"33C1A9C3","filters":{  },"titleOrPronunciation":"PONS Advanced German -&gt; English Dictionary / PONS W&ouml;rterbuch Deutsch -&gt; Englisch Advanced (German Edition)","isNellOptimized":0,"asin":"B00GQOF3WE","category":"fiona_ebook","isNotYetLaunched":0,"orderDateEpoch":1388013314,"orderID":"D01-6416539-1093654","excluded_device_types":[  ],"isPottermore":0,"orderDateNumerical":"2013-12-25T15:15:14","isPurchased":1,"orderDate":"December 25, 2013","capability":[ "EBOK_PURCHASE_ALLOWED" ],"orderDetails":"View order details on Amazon.com","image":"https://images-na.ssl-images-amazon.com/images/I/41xgqfWqOTL._SX105_.jpg","isUpdateAvailable":"FALSE","summaryHref":"https://www.amazon.com:443/gp/redirect.html?ie=UTF8&location=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fdigital%2Fyour-account%2Forder-summary.html%3ForderID%3DD01-6416539-1093654&token=661ABEA050EC7ED103349320C53489637F654274","renderDownloadElements":1,"firstOrderDate":"1388013313.652","title":"PONS Advanced German -&gt; English Dictionary / PONS W&ouml;rterbuch Deutsch -&gt; Englisch Advanced (German Edition)" },{ "refundEligibility":{ "resultCode":"FAIL_AGE","isEligible":0,"message":"You can only return content purchased in the last seven days. To return this item, please contact customer service at 1-866-321-8851." },"canReadNow":1,"bindingDisplay":"","authorOrPronunciation":"Rippetoe, Mark","binding":"","dpURL":"/gp/product/B006XJR5ZA/ref=kinw_myk_ro_title","author":"Rippetoe, Mark","udlGuid":"39A61C3E","filters":{  },"titleOrPronunciation":"Starting Strength","isNellOptimized":0,"asin":"B006XJR5ZA","category":"fiona_ebook","isNotYetLaunched":0,"orderDateEpoch":1386774584,"orderID":"D01-5752650-3093611","excluded_device_types":[  ],"isPottermore":0,"orderDateNumerical":"2013-12-11T07:09:44","isPurchased":1,"orderDate":"December 11, 2013","capability":[ "EBOK_PURCHASE_ALLOWED" ],"orderDetails":"View order details on Amazon.com","image":"https://images-na.ssl-images-amazon.com/images/I/51qninUnshL._SX105_.jpg","isUpdateAvailable":"FALSE","summaryHref":"https://www.amazon.com:443/gp/redirect.html?ie=UTF8&location=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fdigital%2Fyour-account%2Forder-summary.html%3ForderID%3DD01-5752650-3093611&token=661ABEA050EC7ED103349320C53489637F654274","renderDownloadElements":1,"firstOrderDate":"1386774582.52","title":"Starting Strength" },{ "refundEligibility":{ "resultCode":"FAIL_AGE","isEligible":0,"message":"You can only return content purchased in the last seven days. To return this item, please contact customer service at 1-866-321-8851." },"canReadNow":1,"bindingDisplay":"","authorOrPronunciation":"Vermes, Timur","binding":"","dpURL":"/gp/product/B008NW1M4K/ref=kinw_myk_ro_title","author":"Vermes, Timur","udlGuid":"AC797659","filters":{  },"titleOrPronunciation":"Er ist wieder da: Der Roman (German Edition)","isNellOptimized":0,"asin":"B008NW1M4K","category":"fiona_ebook","isNotYetLaunched":0,"orderDateEpoch":1374093260,"orderID":"D01-3099356-0130453","excluded_device_types":[  ],"isPottermore":0,"orderDateNumerical":"2013-07-17T13:34:20","isPurchased":1,"orderDate":"July 17, 2013","capability":[ "EBOK_PURCHASE_ALLOWED" ],"orderDetails":"View order details on Amazon.com","image":"https://images-na.ssl-images-amazon.com/images/I/31zFDOJLXCL._SX105_.jpg","isUpdateAvailable":"FALSE","summaryHref":"https://www.amazon.com:443/gp/redirect.html?ie=UTF8&location=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fdigital%2Fyour-account%2Forder-summary.html%3ForderID%3DD01-3099356-0130453&token=661ABEA050EC7ED103349320C53489637F654274","renderDownloadElements":1,"firstOrderDate":1374093260,"title":"Er ist wieder da: Der Roman (German Edition)" },{ "refundEligibility":{ "resultCode":"FAIL_CATEGORY","isEligible":0,"message":"To return this item, please contact customer service at 1-866-321-8851." },"canReadNow":0,"bindingDisplay":"","authorOrPronunciation":"Die Zeit","binding":"","dpURL":"/gp/product/B004QZ9PQA/ref=kinw_myk_ro_title","author":"Die Zeit","udlGuid":"","filters":{  },"titleOrPronunciation":"DIE ZEIT","asin":"F_E_B00DV13SEK_B004QZ9PQA","category":"fiona_newspaper","isNotYetLaunched":0,"orderDateEpoch":1373961101,"orderID":"D01-4049273-6805643","isPottermore":0,"excluded_device_types":[ "AMWQ4871HHWW","A3N6ISSL0EPZWG","A2XIMM7ACS4GUS","A3BHV8OQ3W90PJ" ],"orderDateNumerical":"2013-07-16T00:51:41","isPurchased":1,"orderDate":"July 16, 2013","capability":[ "NWPR_PURCHASE_ALLOWED" ],"orderDetails":"View order details on Amazon.com","image":"https://images-na.ssl-images-amazon.com/images/I/41%2BMur4TElL._SX105_.jpg","isUpdateAvailable":"FALSE","summaryHref":"https://www.amazon.com:443/gp/redirect.html?ie=UTF8&location=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fdigital%2Fyour-account%2Forder-summary.html%3ForderID%3DD01-4049273-6805643&token=661ABEA050EC7ED103349320C53489637F654274","renderDownloadElements":1,"firstOrderDate":1373961101,"title":"DIE ZEIT (July 11, 2013)" }],"contentType":"All" },"json":1 }';


describe("Resultset", function () {
    var ResultSet = fiona._ResultSet;

    it("should convert raw data of personal docs to a ResultSet", function () {
        var result = new ResultSet(JSON.parse(pDocsResponse));
        testIsResultSet(result);
    });

    it("should convert raw data of bought titles to a ResultSet", function () {
        var result = new ResultSet(JSON.parse(ownedResponse));
        testIsResultSet(result);
    });

    it("should convert the raw  items to LibraryItems", function () {
        var result = new ResultSet(JSON.parse(pDocsResponse))
            , item = result.items[0];

        expect(result.items).to.have.length(2);
        expect(item).to.be.an(Object);
        expect(item).to.have.keys(["title", "author", "asin"]);
    })
});

describe("Fetching of personal documents", function () {
    var findMethod = fiona.PersonalDoc.findAll;

    serverSetupAndTeardown('queryPdocs.html', pDocsResponse);

    it("should call the personal docs uri", function () {
        testFunctionCallsMatchingUri(findMethod);
    });

    it("should return a ResultSet", function (done) {
        findMethod({
            callback: function (result) {
                testIsResultSet(result);

                done();
            }
        });
        server.respond();
    });

    commonFetchTests(findMethod);
});

describe("Fetching of book titles", function () {
    var findMethod = fiona.Ebook.findAll;
    serverSetupAndTeardown('queryOwnership_refactored2.html', '{ "data": { "hasMore": 1, "items" : [] } }');

    commonFetchTests(findMethod);

    it("should call the books uri", function () {
        testFunctionCallsMatchingUri(findMethod);
    });
});

describe("Delete library item", function () {
    serverSetupAndTeardown('fiona-delete.html', '');

    it("should call the callback when finished", function (done) {
        var item = new fiona.Ebook({ asin: "1234", orderID : "abc", title : "foo"})    ;
        item.delete(done);
        server.respond();
    });

    it("should silently drop requests to delete anything but personal documents");
});

function testFunctionCallsMatchingUri(method) {
    var spy = sinon.spy();
    method({ callback: spy });
    server.respond();
    expect(spy).was.called();
}

function commonFetchTests(method) {

    it("should be callable without parameters", function () {
        expect(method).not.to.throwException();
    });
    /*
     it('should have a default offset of 0', function() {
     fiona[methodName]();
     expect(requests[0].requestBody.offset).to.be(0);
     });

     it("should add a count to the query when specified", function() {
     fiona[methodName]({count : 11});
     expect(requests[0].requestBody.count).to.be(11);
     });

     it("should add an offset to the query when specified", function() {
     fiona[methodName]({offset : 33});
     expect(requests[0].requestBody.offset).to.be(33);
     });
     */

    it("should call the specified callback on success", function (done) {
        method({callback: function () {
            done();
        }});
        server.respond();
    });
}


function testIsResultSet(result) {
    expect(result).to.be.an(Object);
    expect(result).to.have.key('totalCount');
    expect(result).to.have.key('items');
    expect(result).to.have.key('offset');
}

function serverSetupAndTeardown(action, response) {
    before(function () {
        server = sinon.fakeServer.create();
        server.respondWith("POST",
            new RegExp('amazon.com.*' + action),
            [ 200,
                { 'Content-Type': 'text/html; charset=ISO-8859-1' },
                response
            ]);
    });

    after(function () {
        server.restore();
    });
}