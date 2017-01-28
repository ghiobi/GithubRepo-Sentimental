$(function(){
  var $input = $('#input-form');
  var $form = $('#form');
  var $start = $('#start-section');
  var $end = $('#end-section');
  var $reset = $('#reset');
  var $results = $('.results');
  var $body = $('body');

  $form.submit(function (event) {
    event.preventDefault();

    $.ajax({
      url: window.location.origin,
      method: 'POST',
      data: {
        url: $input.val()
      },
      success: function(data){
        $results.html('');
        $results.html(JSON.stringify(data));

        if(data.type == 'negative' && data.score < -0.3){
          $body.addClass('red');
        } else {
          $body.addClass('green');
        }

        $start.hide();
        $end.fadeIn(800);
        $input.val('');
      }
    });
  });

  $reset.click(function () {
    $body.removeClass('red').removeClass('green');
    $end.hide();
    $start.fadeIn(800);
  });
});