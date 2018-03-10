
function setupObjectForm(Class, JSONargs) {
  var objectClass = Class;
  var objectArgs = JSON.parse(JSONargs);
  var container = document.getElementById("object-form-items");
  for (var i=0; i < objectArgs.length; i++){
    var div = document.createElement("div");
    div.classList.add('col-lg-12');
    div.classList.add('col-lg-offset-2');
    div.classList.add('d-block');
    div.classList.add('mx-auto');
    var input = document.createElement("input");
    input.type = "text";
    input.name = objectArgs[i];
    input.placeholder = objectArgs[i];
    input.required = true;
    input.classList.add("form-control");
    input.classList.add("form-control-sm");
    div.appendChild(input);
    container.appendChild(div);
  }
  $('#cancel').click(function(e) {
    mp.trigger("destroyBrowser");
  });
  $('#object-form').submit(function(e){
    e.preventDefault();
    var args = {};
    for (var i=0;i<objectArgs.length;i++){
      args[objectArgs[i]] = document.getElementsByName(objectArgs[i])[0].value
    }
    mp.trigger("destroyBrowser");
    mp.trigger('yarp_createGamemodeObject', objectClass, JSON.stringify(args));
  })
};

function setupCodeEditor(){
  	//code here...
    var fullscreen = false;
  	var code = $(".codemirror-textarea")[0];
  	var editor = CodeMirror.fromTextArea(code, {
      mode : {name: "javascript", json: true},
      theme : "monokai",
  		lineNumbers : true,
      matchBrackets : true,
      closeBrackets : true,
      foldGutter : true,
      styleSelectedText : true,
      scrollbarStyle : "null",
      tabSize : 2,
      lineWrapping : true
  	});
    $('#draggable_handle').on('mousedown', function(){
      $('.wrapper').draggable();
    });
    $('#draggable_handle').on('mouseup', function(){
      $('.wrapper').draggable("destroy");
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
      mp.trigger('destroyBrowser');
    });

    $('#server').click(function(){
      mp.trigger('yarp_runServerCode', editor.getValue());
      editor.getDoc().setValue('');
    });

    $('#client').click(function(){
      mp.trigger('yarp_runClientCode', editor.getValue());
      editor.getDoc().setValue('');
    });
    editor.setSize($('.wrapper').width(), $('.wrapper').height());
    $('[data-toggle="tooltip"]').tooltip();
}
