(function(doc){
  function loop(datas){
    if(datas.length>0){
      const els = ce('div','box');
      for(let i=0;i<datas.length;i++){
        const isChildren = datas[i].children&&datas[i].children.length>0;
        const el = ce('div',isChildren,datas[i].name);
        if(isChildren){
          el.appendChild(loop(datas[i].children));
        }
        els.appendChild(el);
      }
      return els;  
    }
  }
  function ce(ele,isChildren,text){
    const el = doc.createElement(ele);
    el.dataset.isLeaf = 'false';
    const el1 = doc.createElement('div');
    if(isChildren === true) {
      el.dataset.isLeaf = 'true';
      el1.dataset.show = 'false';
      el1.onclick = function(e){
        const me = e.target;
        const children = me.parentElement.lastElementChild;
        const cheight = children.scrollHeight;
        const height = children.offsetHeight;
        const detail = cheight/20;
        if (me.dataset.show === 'false') {
          var _height = height;
          const loop = () => {
            if(_height < cheight){
              _height += detail;
              children.style.height = _height +'px';
              requestAnimationFrame(loop);
            }else{
              children.style.height = cheight+'px';
              children.style.height = 'auto';
            }
          }
          loop();
          me.dataset.show = 'true';
        } else {
          let _height = height;
          const loop = () => {
            if(_height>0){
              _height -= detail;
              children.style.height = _height+'px';
              requestAnimationFrame(loop);
            }else{
              children.style.height = '0px';
            }
          }
          loop();
          me.dataset.show = 'false';
        }
      }
      el1.className = 'leaf-icon';
      text&&(el1.textContent = text);
      el.appendChild(el1);
    }else{
      text&&(el.textContent = text);    
    }
    if(isChildren === 'box') {
      el.dataset.isLeaf = 'box';
      el.className="children"
    }
    return el;
  }
  function slider(menu){
    return loop(menu||[]);
  }
  window.slider = slider;
})(document);