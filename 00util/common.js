/*
* @Author: 67564
* @Date:   2019-01-14 15:32:19
* @Last Modified by:   67564
* @Last Modified time: 2019-01-14 15:53:12
*/
var _mm = {
  //获取元素位置
  position ： function getPosition (el){
    var xPos = 0;
    var yPos = 0;
    while ( el ) {
      if ( el.tarName == "BODY"){
        //deal with brower quirks with body/window/document and page scroll
        var xscroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yscroll = el.scrollTop || document.documentElement.scrollTop;
        xPos += el.offsetLeft - xscroll + el.clientLeft;
        yPos += el.offsetTop - yscroll + el.clientTop;
    }else{
      //for all other non-BODY elements
        xPos += offsetLeft - scrollLeft + clientLeft;
        yPos += offsetTop - scrollTop + clientTop;
      }
      el = el.offserParent;
    }
    return {
      x : xPos,
      y : yPos
    }


module.exports = _mm;
