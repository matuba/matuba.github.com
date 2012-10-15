var coderwall = (function(){
  function render(target, badges){
    var i = 0, t = $(target)[0];
    var fragment = '<p class="nav-header">coderwall Badges</p><section>';
    
    for(i = 0; i < badges.length; i++) {
      fragment += '<a><img src="'+badges[i].badge+'" title="'+badges[i].description+'" width="65" height="65" /></a>';
    }
    fragment += '</section>';
    t.innerHTML = fragment;
  }
  return {
    showBadges: function(options){

      $.getJSON("http://coderwall.com/"+options.user+".json?callback=?",
        function(response) {
          if (!response || response.data.length == 0) { return; }
          var badges = response.data.badges;
          badges.sort(function(a, b) {
            var aDate = new Date(a.created).valueOf(),
                bDate = new Date(b.created).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

          render(options.target, badges);
        
      });
    }
  };
})();