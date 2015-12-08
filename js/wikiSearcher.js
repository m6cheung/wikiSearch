$(document).ready(function() {
  
  $("input[type='search']").on('keydown', function(event){
    if(event.keyCode === 13){
      event.preventDefault();
    }
});
  
  $('.submit').on('click', function() {
    $('.entry').remove();
    $('.invalid').remove();
    
    $.ajax({
        url: 'http://en.wikipedia.org/w/api.php?format=json&action=query&namespace=0&generator=search&gsrsearch=' + $('input[type="search"]').val() + '&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
          if(data.query === undefined) {
            $('<p class="invalid">Invalid search, please try again.</p>').appendTo('.holder');
          } else {
            console.log(data.query.pages);
            Object.keys(data.query.pages).forEach(function(prop) { 
              $('<div class="entry"><a target="_blank" href="http://en.wikipedia.org/?curid=' + data.query.pages[prop].pageid + '"><h2 class="wikiTitle">' + data.query.pages[prop].title + '</h2><p class="wikiDesc">' + data.query.pages[prop].extract + '</p></a></div>').appendTo('.holder');
            });
          }
          $("input[type='search']").val('');
        },
      error: function(error) {
        alert(error);
      }
    });
  });
  
  $('.lucky').on('click', function() {
    
    $('.entry').remove();
    $('.invalid').remove();
    
    $.ajax({
      url:'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        var randomKey = Object.keys(data.query.pages)[0];
        console.log(data.query.pages);
        $('<div class="entry"><a target="_blank" href="http://en.wikipedia.org/?curid=' + data.query.pages[randomKey].pageid + '"><h2 class="wikiTitle">' + data.query.pages[randomKey].title + '</h2><p class="wikiDesc">' + data.query.pages[randomKey].extract + '</p></a></div>').appendTo('.holder')
      }
    });
  });
});