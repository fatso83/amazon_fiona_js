(function(w) {
  /* exported AmazonFiona */
  'use strict';

  var amazon = 'https://www.amazon.com'
    , fetchUri = amazon+'/gp/digital/fiona/manage/features/order-history/ajax/'
    , deleteUri = amazon +  '/gp/digital/fiona/du/fiona-delete.html';

  function fetch(options) {
    var r = new XMLHttpRequest()
      , data = {
    offset : (options.offset || 0),
    count : (options.count || 15)
      };

      r.open("POST", options.url, true);
      r.onload = function () {
        // do something
        //clean_json = remove_control_chars(r.text)
        //return json.loads(clean_json)['data']
      };
      r.send(data);
  }

  function deleteItem (options) {
    var data = {'contentName':content_id}
      , r = s.post(amazon, data);
  }

  w.AmazonFiona = {
    /** 
     * @param options.offset  default 0
     * @param options.count default 15
     */
    personal_docs : function(options) {
      var opts;
      if(!options) opts = {};
      else opts = options;

      opts.url = 'http://www.amazon.com/';
      return fetch(opts);
    }
  };
})(window);
