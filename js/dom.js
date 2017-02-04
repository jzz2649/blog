(function(win, doc){
  var dom = function(c) {
    return new dom.fn.init(c);
  }

  dom.fn = dom.prototype = {
    constructor: dom,
    d: null,
    all: null,
    init: function(c) {
      var d = doc.querySelector(c);
      var all = doc.querySelectorAll(c);
      this.all = all;
      this.d = d;
      return this;
    },
    type: type,
    isArray: isArray,
    jsObject: jsObject,
    val: function(v){
      if (this.c) {
        if (v === undefined) {
          return this.c.textContent;
        }else {
          this.c.textContent =   v;
        }
      }
      return this;
    },
    each: function(obj,callback) {
      var len, i = 0;

      if( isArray(obj) ) {
        len = obj.length;
        for( ; i < len; i++ ) {
          if( callback.call( obj[i], i, obj[i] ) === false ) {
            break;
          }
        }
      }else {
        for( i in obj ) {
          if ( callback.call( obj[i], i, obj[i] ) === false ) {
            break;
          }
        }
      }
      return obj;
    }
  }

  dom.fn.each(dom.fn,function(i){
    dom[i] = dom.fn[i];
  })

  function type(obj) {
    return toString.call(obj).split(' ')[1].slice(0,-1).toLowerCase();
  }

  function isArray(obj) {
    if(type(obj) === 'array') {
      return true;
    }else {
      return false;
    }
  }

  function jsObject(obj) {
    if(type(obj) === 'object') {
      return true;
    }else {
      return false;
    }
  }

  dom.fn.init.prototype = dom.fn;
  win.j = win.dom = dom;
})(window, document);

(function(win,doc,j){
  var about = j('.j-about').d;
  var box = j('.j-newpagebox').d;
  var boxloading = box.querySelector('.loading-box');
  var pagebox = j('.j-page-container').d;
  var close = j('.j-page-close').d;
  var list = j('.j-list').d;
  var listloading = list.querySelector('.loading-box');
  var template = j('.j-template').d;
  var dc = template.content;
  var div = dc.querySelector('.j-root');
  var log,ti,make,time;
  var df = doc.createDocumentFragment();
  var _div;
  var i=0;

  about.addEventListener('click', function(){pagehandle(1)});

  ajax('js/title.js?1814','text',function(data){
    listloading && (listloading.style.display = 'none');
    var title = JSON.parse(data);
    j.each(title, function(i,k){
      _div = div.cloneNode(true);
      log = _div.querySelector('.j-log');
      ti = _div.querySelector('.j-title');
      make = _div.querySelector('.j-make');
      time = _div.querySelector('.j-time');
      j.each(k,function(k,v){
        switch (k) {
          case 'index':
              setData(_div,v);
            break;
          case 'title':
              setVal(ti,v);
            break;
          case 'make':
              setVal(make,v);
              setlogbg(log,v);
            break;
          case 'time':
              setVal(time,v);
            break;
          case 'href':
              setHref(_div,v);
            break;
          default:
            break;
        }
      });
      append(df,_div);
    });
    list.appendChild(df);
    list.addEventListener('click', function(e){
      if(e.target.tagName){
        if(e.target.tagName === 'DIV'){
          if ( !!e.target.dataset.href ) {
            location.href = e.target.dataset.href;
            return;
          }
          pagehandle(e.target.dataset.index);
        }
      }
    });
    close.addEventListener('click', function(e){
      box.classList.toggle('i-hide');
      boxloading && (boxloading.style.display = 'block');
    });
  });

  function pagehandle(n){
    pagebox.innerHTML = '';
    box.classList.toggle('i-hide');
    ajax('page/page'+n+'.html','document',function(data,type){
      boxloading && (boxloading.style.display = 'none');
      if ( type == 404 ){
        pagebox.innerHTML = '<p style="text-align:center;">'+data+'</p>';
        return;
      }
      var page = data.body.firstElementChild;
      pagebox.appendChild(page);
    })
  }

  function append(d,dc){
    d.appendChild(dc);
  }
  function setVal(d,v){
    d.textContent = v;
  }
  function setHref(d,v){
    d.dataset.href = v;
  }
  function setData(d,v){
    d.dataset.index = v;
  }
  function setlogbg(d,v){
    d.style.backgroundImage = 'url(img/'+v+'.png)';
  }
  function ajax(url,type,callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = type;
    xhr.onload = function(e){
      if ( xhr.status == 404 ) {
        callback('页面没找到',404);
        return ;
      }
      var data = xhr.response;
      if(data){
        callback(data);
      }
    }
    xhr.onerror = function(e){
    }
    xhr.open('get',url,true);
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
  }
})(window,document,j);