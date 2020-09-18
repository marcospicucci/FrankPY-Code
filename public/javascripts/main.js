var runBtn = document.getElementById('runBtn');
runBtn.addEventListener('click', function () {
    //myCodeMirror.save();
    alert('Funcionalidad en construcción');
    console.log("contenido ide:")
    console.log(myCodeMirror.getValue()); //imprime modificado
    myCodeMirror.setValue(myCodeMirror.getValue());
    console.log("texto inicializacion ide:")
    console.log(myTextArea.textContent); //imprime inicializacion
});

var myTextArea = document.getElementById('editor');

//se usaria solo para inicializar el editor con algún texto
var codeToExecute = "from robofai220 import*\n" +
    "init()\n" +
    "adelante(1,1)\n" +
    "derecha(1,1)";
myTextArea.textContent = codeToExecute;
//propiedad estática!! ...
var myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
    mode: "python",
    theme: "material",
    lineNumbers: true
});
