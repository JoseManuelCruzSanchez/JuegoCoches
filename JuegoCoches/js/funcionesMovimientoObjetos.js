function moverObjeto(objeto, arriba, izquierda){
    objeto.style.top = Number(objeto.style.top.substring(0,objeto.style.top.length-2))+arriba + 'px';
    objeto.style.left = Number(objeto.style.left.substring(0,objeto.style.left.length-2))+izquierda + 'px';
}

function  desplazarSentidoPositivo(objeto) {
    var eje_y;
    var eje_x;
    var angulo = getCurrentRotation(objeto);
    if(angulo == 0){
        eje_y = -1;
        eje_x = 0;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo == 90){
        eje_y = 0;
        eje_x = 1;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo == -90){
        eje_y = 0;
        eje_x = -1;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo == 180 || angulo == -180){
        eje_y = 1;
        eje_x = 0;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo > -90 && angulo < 0){
        eje_x = (angulo*(1/90));
        eje_y = (1+eje_x)*-1;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo > -180 && angulo < -90){
        eje_y = ((angulo+90)*(1/90))*-1;
        eje_x = -1+eje_y;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo > 0 && angulo < 90){
        eje_x = (angulo*(1/90));
        eje_y = (1-eje_x)*-1;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo > 90 && angulo < 180){
        eje_y = (angulo*(1/90))-1;
        eje_x = 1-eje_y;
        moverObjeto(objeto, eje_y, eje_x);
    }
}

function desplazarSentidoInverso(objeto){
    var eje_y;
    var eje_x;
    var angulo = getCurrentRotation(objeto);
    if(angulo == 0){
        eje_y = 1;
        eje_x = 0;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo == 90){
        eje_y = 0;
        eje_x = -1;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo == -90){
        eje_y = 0;
        eje_x = 1;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo == 180 || angulo == -180){
        eje_y = -1;
        eje_x = 0;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo > -90 && angulo < 0){
        eje_x = (angulo*(1/90));
        eje_y = (1+eje_x);
        eje_x = eje_x * -1;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo > -180 && angulo < -90){
        eje_y = ((angulo+90)*(1/90));
        eje_x = 1+eje_y;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo > 0 && angulo < 90){
        eje_x = (angulo*(1/90));
        eje_y = 1-eje_x;
        eje_x = eje_x * -1;
        moverObjeto(objeto, eje_y, eje_x);
    }
    else if(angulo > 90 && angulo < 180){
        eje_y = (angulo*(1/90))-1;
        eje_x = 1-eje_y;
        eje_y = eje_y * -1;
        eje_x = eje_x * -1;
        moverObjeto(objeto, eje_y, eje_x);
    }
}

/*objeto: elemento que se quiere rotar
 sentido: true o false. True si sentido reloj, false a la inversa del reloj.
 */
function rotarElemento(objeto, sentidoRotacion) {
    if(sentidoRotacion){
        objeto.style.transform = "rotate(" + (getCurrentRotation(objeto)+1) + "deg)";
    }else{
        objeto.style.transform = "rotate(" + (getCurrentRotation(objeto)-1) + "deg)";
    }

}

function getCurrentRotation( elid ) {
    var el = document.getElementById(elid);
    var st = window.getComputedStyle(elid, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "fail...";

    if( tr !== "none") {
        //console.log('Matrix: ' + tr);
        var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a*a + b*b);

        // First option, don't check for negative result
        // Second, check for the negative result
        /**/
        var radians = Math.atan2(b, a);
        var angle = Math.round( radians * (180/Math.PI));
        /*/
         var radians = Math.atan2(b, a);
         if ( radians < 0 ) {
         radians += (2 * Math.PI);
         }
         var angle = Math.round( radians * (180/Math.PI));
         /**/

    } else {
        var angle = 0;
    }
    //console.log(angle)
    return angle;
    // works!
    //console.log('Rotate: ' + angle + 'deg');
    //$('#results').append('<p>Rotate: ' + angle + 'deg</p>');
}