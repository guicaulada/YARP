var editor = null

function setupCodeEditor(text){
   var fullscreen = false;
  	var code = $('.codemirror-textarea')[0];
  	editor = CodeMirror.fromTextArea(code, {
      mode : {name: 'javascript', json: true},
      theme : 'monokai',
  		lineNumbers : true,
      matchBrackets : true,
      closeBrackets : true,
      foldGutter : true,
      styleSelectedText : true,
      scrollbarStyle : 'null',
      tabSize : 2,
      lineWrapping : true
  	});
    $('#draggable_handle').on('mousedown', function(){
      $('.wrapper').draggable();
    });
    $('#draggable_handle').on('mouseup', function(){
      $('.wrapper').draggable('destroy');
    });
    $('.wrapper').resizable({
      maxHeight: 1080,
      maxWidth: 1920,
      minHeight: 100,
      minWidth: 140,
      resize: function() {
        editor.setSize($(this).width(), $(this).height());
      }
    });
    $('#cancel').click(function(){
      mp.trigger('yarp:cefTrigger', 'destroyBrowser', 'editor');
      mp.trigger('yarp:cefTrigger', 'unbindToggleChat');
    });

    $('#server').click(function(){
      mp.trigger('yarp:cefTrigger', 'runServerCode', editor.getValue());
      editor.getDoc().setValue('');
    });

    $('#client').click(function(){
      mp.trigger('yarp:cefTrigger', 'runClientCode', editor.getValue());
      editor.getDoc().setValue('');
    });
    editor.setSize($('.wrapper').width(), $('.wrapper').height());
    $('[data-toggle=\'tooltip\']').tooltip();
    if (text) {
      text = text.split('\'').join('\'')
      editor.getDoc().setValue(text);
    }
}
