var calculadora = {
	
        /*--------------------------------------------------------
         * SECCION 1: Definición de variables
        -----------------------------------------------------------*/
        
        //iniciamos variables l->locales (s->string, l->long, b->booleano)
        
        ls_pantalla:            document.getElementById("display"),        
        lb_botonigual:          false,	        
	ll_valor:               "0",	
	ll_valor1:              0,
	ll_valor2:              0,
	ll_valor3:              0,
        ls_operacion:           "",        
	ll_resultado:           0,        
	
         /*------------------------------------------------------------
         * Sección 2: Estilos y eventos de las teclas de la calculadora
         --------------------------------------------------------------*/
        
        //iniciamos las funciones de estilos y funcionalidad de la tecla con clase .tecla
	
	init: (function(){
		this.lf_animacionBoton(".tecla");
		this.lf_asignarFuncion();
	}),
        
	
	//Creamos la función para la animación al presionar un boton
	
	lf_animacionBoton: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.lf_presionarBotonEvt;
			x[i].onmouseleave = this.lf_soltarBotonEvt;
		};
	},  
        
        /*----------------------------------
         * EVENTOS
         -----------------------------------*/
        
        //Definimos la accion al soltar la tecla
        
	lf_soltarBotonEvt: function(event){
		calculadora.lf_botonSoltar(event.target);
	},  
        
        //Definimos la acción al presionar la tecla
        
	lf_presionarBotonEvt: function(event){
		calculadora.lf_botonPresionar(event.target);
	}, 
        
        /*-------------------------------------
         * ESTILOS
         --------------------------------------*/
	
	//Definimos el estilo al presionar la tecla
	
	lf_botonPresionar: function(e){
		var x = e.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			e.style.width = "28%";
			e.style.height = "62px";
		} else if(x=="mas") {
			e.style.width = "88%";
			e.style.height = "98%";
		} else {
		e.style.width = "21%";
		e.style.height = "62px";
		}
	},               
        
        //Definimos el estilo al soltar la tecla
	
	lf_botonSoltar: function(e){
		var x = e.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			e.style.width = "29%";
			e.style.height = "62.91px";
		} else if(x=="mas") {
			e.style.width = "90%";
			e.style.height = "100%";
		} else {
		e.style.width = "22%";
		e.style.height = "62.91px";
		}
	},
        


         /*------------------------------------------------------------
         * Sección 3: Creamos y asignamos las funciones a los elementos
         --------------------------------------------------------------*/    
    
        //Función para obtener los valores de la acción click del boton y ejecutamos la operación aritmética correspondiente
	
	lf_asignarFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.lf_operarNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.lf_operarNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.lf_operarNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.lf_operarNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.lf_operarNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.lf_operarNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.lf_operarNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.lf_operarNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.lf_operarNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.lf_operarNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.lf_borrarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.lf_cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ld_operarDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.lf_mostrarTotal();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.lf_inicioOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.lf_inicioOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.lf_inicioOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.lf_inicioOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.lf_inicioOperacion("+");});
	},
        
        //Función para borrar la pantalla
	
	lf_borrarPantalla: function(){ 

	    this.ll_valor = "0";
		this.ls_operacion = "";
		this.ll_valor1 = 0;
		this.ll_valor2 = 0;
		this.ll_resultado = 0;
		this.Operación = "";
		this.lb_botonigual = false;
		this.ll_valor3 = 0;
		this.lf_actualizarPantalla();
	},
        
        //Función para el cambio de Signo
	
	lf_cambiarSigno: function(){
		if (this.ll_valor !="0") {
			var aux;
			if (this.ll_valor.charAt(0)=="-") {
				aux = this.ll_valor.slice(1);
			}	else {
				aux = "-" + this.ll_valor;
			}
		this.ll_valor = "";
		this.ll_valor = aux;
		this.lf_actualizarPantalla();
		}
	},
        
        //Función para Operar y concatenar numeros como Decimales cuando se presiona la tecla punto
	
	ld_operarDecimal: function(){
		if (this.ll_valor.indexOf(".")== -1) {
			if (this.ll_valor == ""){
				this.ll_valor = this.ll_valor + "0.";
			} else {
				this.ll_valor = this.ll_valor + ".";
			}
			this.lf_actualizarPantalla();
		}
	},
	
        //Función para definir y concatenar los numeros a operar
        
	lf_operarNumero: function(valor){
		if (this.ll_valor.length < 8) {
		
			if (this.ll_valor=="0") {
				this.ll_valor = "";
				this.ll_valor = this.ll_valor + valor;
			} else {
				this.ll_valor = this.ll_valor + valor;
			}
		this.lf_actualizarPantalla();
		}
	},
	
        //Función para preparar los valores que intervendran en la operacion aritmetica
        
	lf_inicioOperacion: function(operacion){
		this.ll_valor1 = parseFloat(this.ll_valor);
		this.ll_valor = "";
		this.ls_operacion = operacion;
		this.lb_botonigual = false;
		this.lf_actualizarPantalla();
	},
        
        //Función para mostrar el total del resultado en pantalla
	
	lf_mostrarTotal: function(){

		if(!this.lb_botonigual){ 
			this.ll_valor2 = parseFloat(this.ll_valor);
			this.ll_valor3 = this.ll_valor2;
			this.lf_ejecutarOperacion(this.ll_valor1, this.ll_valor2, this.ls_operacion);
		
		} else {
			this.lf_ejecutarOperacion(this.ll_valor1, this.ll_valor3, this.ls_operacion);
		}
	
		this.ll_valor1 = this.ll_resultado;
		this.ll_valor = "";
	
		if (this.ll_resultado.toString().length < 9){
			this.ll_valor = this.ll_resultado.toString();
		} else {
			this.ll_valor = this.ll_resultado.toString().slice(0,8) + "...";
		}
	
		this.lb_botonigual = true;		
		this.lf_actualizarPantalla();
	
	},
        
        //Función que ejecuta las operaciones aritméticas
	
	lf_ejecutarOperacion: function(ll_valor1, ll_valor2, ls_operacion){
		switch(ls_operacion){
			case "+": 
				this.ll_resultado = eval(ll_valor1 + ll_valor2);
			break;
			case "-": 
				this.ll_resultado = eval(ll_valor1 - ll_valor2);
			break;
			case "*": 
				this.ll_resultado = eval(ll_valor1 * ll_valor2);
			break;
			case "/": 
				this.ll_resultado = eval(ll_valor1 / ll_valor2);
			break;
			case "raiz":
				this.ll_resultado = eval(Math.sqrt(ll_valor1));
		}
	},
        
        //Función que sirve para refrescar y poner los nuevos valores en la pantalla de la calculadora
	
	lf_actualizarPantalla: function(){
		this.ls_pantalla.innerHTML = this.ll_valor;
	}
	
};

//Iniciamos la calculadora

calculadora.init();