from robofai220 import*
init()
print "Deteccion de objetos:"
detectar_objetos()
print "Ingrese su nombre:"
nombre = raw_input()
print "Bienvenido: " + nombre
lugar = buscarcolor(ROJO)
wait(4)
adelante(1, 2)
print lugar