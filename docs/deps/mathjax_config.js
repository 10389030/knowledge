$(function(){
  $("p, li").each(function(){
    var text = $(this).html();
    var group = text.match(/(\u0024[^\u0024]+\u0024)|("\u0024{2,2}[^\u0024]+\u0024{2,2}")/g);
    if (group) {
      for (var idx in group) {
        if (group[idx]) {
          var pre = group[idx];
          var now = pre.replace("<em>", "_").replace("</em>", "_").trim('"');
          text = text.replace(pre, now);
        }
      }
      $(this).html(text);
      console.log(text);
    }
  }); 

  MathJax.Hub.Config({
    tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
  });
});
