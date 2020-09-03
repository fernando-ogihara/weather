// JavaScript Document
window.onload = function() {
    var url         = "http://api.openweathermap.org/data/2.5/weather?";
    var minhaAPI    = "362953119f484c233679b70e00932253";
    var resultado;
    var cidade;
    
    cidades.onchange  = function() {
        
		var ajax = null;
		if( window.XMLHttpRequest ) {   
			ajax = new XMLHttpRequest();
		} else if( window.ActiveXObject ) {
			ajax = new ActiveXObject('Msxml2.XMLHTTP');	
		}
        
        cidade = cidades.value;

        if ( cidade != 0 ) {
            ajax.open("GET", url + "appid=" + minhaAPI + "&q=" + cidade + "&units=metric&lang=pt",true);
            ajax.send(null);
            ajax.onreadystatechange = function() { 
                if (ajax.readyState == 4) {
                    if( ajax.status == 200 ) {
                        resultado = JSON.parse(ajax.responseText);
                        
                        nome_cidade.innerHTML = resultado.name;

                        //console.log(resultado);
                        temp_min.innerHTML  = "Mínima: " + resultado.main.temp_min + "°";
                        temp_max.innerHTML  = "Máxima: " + resultado.main.temp_max + "°";
                        descricao.innerHTML = "Previsão: " + resultado.weather[0].description;
                    }
                }
            }
        }
	};
}

//362953119f484c233679b70e00932253
