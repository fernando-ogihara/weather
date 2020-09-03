// JavaScript Document
window.onload = function() {
    var url         = "http://api.openweathermap.org/data/2.5/weather?";
    var minhaAPI    = "362953119f484c233679b70e00932253";
    var resultado;  
    var nav = null; 

    function pegarPosicao() {
        document.getElementById("status").innerHTML = "aguarde...";

        if ( nav == null ) {
            nav = window.navigator;
        }

        var geoloc = nav.geolocation;
        if ( geoloc != null ) {
            geoloc.getCurrentPosition( retornarPosicao , retornarFalha );   
        }
    }

    function retornarPosicao( posicao ) {
        var latitude = posicao.coords.latitude
        ;
        var longitude= posicao.coords.longitude;
        document.getElementById("status").innerHTML = "Latitude: " + latitude + " longitude: " + longitude;
    
        mostrarPrevisaoTempo(latitude,longitude);
    }

    function retornarFalha( erro ) {
        var mensagem = "";

        switch(erro.code) {

            case erro.PERMISSION_DENIED:
                mensagem = "Acesso a sua localização está desligado.";
                break;

            case erro.POSITION_UNAVAILABLE:
                mensagem = "Dados de localização estão indisponíveis no momento.";
                break;

            case erro.TIMEOUT:
                mensagem = "Sua localização, pode não ser especificada por um determinado tempo.";
                break;

            default:
                mensagem = "Sua localização não pode ser especificada.";
                break;
        }
        document.getElementById("status").innerHTML = mensagem;                
    }  
    
    function mostrarPrevisaoTempo(lat,lon) {
		var ajax = null;
		if( window.XMLHttpRequest ) {   
			ajax = new XMLHttpRequest();
		} else if( window.ActiveXObject ) {
			ajax = new ActiveXObject('Msxml2.XMLHTTP');	
		}
        
        ajax.open("GET", url + "&appid=" + minhaAPI + "&lat=" + lat + "&lon=" + lon + "&units=metric&lang=pt",true);
        ajax.send(null);
        ajax.onreadystatechange = function() { 
            if (ajax.readyState == 4) {
                if( ajax.status == 200 ) {
                    resultado = JSON.parse(ajax.responseText);
                    nome_cidade.innerHTML = resultado.name;
                    //console.log(resultado);
                    temp_min.innerHTML  = "Mín: " + resultado.main.temp_min + "°";
                    temp_max.innerHTML  = "Max: " + resultado.main.temp_max + "°"
                    descricao.innerHTML = "Previsão: " + resultado.weather[0].description;
                }
            }
        } 
    }
    
    pegarPosicao();
}