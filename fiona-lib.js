(function(w) {
  /* exported AmazonFiona */
  'use strict';

  var amazon = 'https://www.amazon.com'
    , fetchUri = amazon+'/gp/digital/fiona/manage/features/order-history/ajax/'
    , deleteUri = amazon +  '/gp/digital/fiona/du/fiona-delete.html';

  function fetch(options) {
    var r = new XMLHttpRequest(), 
    data = {
      offset : (options.offset || 0),
      count : (options.count || 15)
    };

    r.open("POST", fetchUri + options.action, true);
    r.onreadystatechange = function () {
      //if (r.readyState != 4 || r.status != 200) return;
      options.callback(r.responseText);
      //clean_json = remove_control_chars(r.text)
      //return json.loads(clean_json)['data']
    };
    r.send(data);
  }

  function deleteItem (options) {
    var data = {'contentName':content_id}
      , r = s.post(amazon, data);
  }

  function createFetchFunction(action) {
    return function(options) {
      var opts;
      if(!options) opts = {};
      else opts = options;

      opts.action = action;
      return fetch(opts);
    };
  }

  w.AmazonFiona = {

    /** 
     * Fetch personal documents
     * @param options.offset  default 0
     * @param options.count default 15
     */
    personal_docs : createFetchFunction('queryPdocs.html'),

    /** 
     * Fetch book titles
     * @param options.offset  default 0
     * @param options.count default 15
     */
    book_titles : createFetchFunction('queryOwnership_refactored2.html')
  };
})(window);
