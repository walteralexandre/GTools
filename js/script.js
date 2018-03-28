function ChordSetFingerboard() {
	var tonica 			= document.getElementById("tonica");
	var terca  			= document.getElementById("terca");
	var quinta 			= document.getElementById("quinta");
	var sexta  			= document.getElementById("sexta");
	var setima 			= document.getElementById("setima");
	var nona   			= document.getElementById("nona");
	var decimaPrimeira 	= document.getElementById("decimaPrimeira");
	
	var notas = [0, 4, 7];
	var nnotas = notas.length;
	
	var fingerboard = new Array(6);			// CORDAS
	for (var i=0; i<6; i++)
		fingerboard[i] = new Array(16); 	// CASAS
	
	if (terca.value == "m")
		notas[1] = 3;
	else if (terca.value == "4") 
		notas[1] = 5;
	
	if (quinta.value == "+")
		notas[2] = 8;
	else if (quinta.value == "-")
		notas[2] = 6;
		
	if (sexta.value == "M")
		notas[nnotas] = 9;
	else if (sexta.value == "m")
		notas[nnotas] = 8;
	nnotas = notas.length;

	if (setima.value == "m")
		notas[nnotas] = 10;
	else if (setima.value == "M")
		notas[nnotas] = 11;
	nnotas = notas.length;
	
	if (nona.value == "M")
		notas[nnotas] = 14;
	else if (nona.value == "m")
		notas[nnotas] = 13;
	nnotas = notas.length;
		
	if (decimaPrimeira.value == "j")
		notas[nnotas] = 17;
	else if (decimaPrimeira.value == "-")
		notas[nnotas] = 16;
	else if (decimaPrimeira.value == "+")
		notas[nnotas] = 18;
	nnotas = notas.length;

	ChordClearFingerboard();

	var chromatic = ["c","cs","d","ds","e","f","fs","g","gs","a","as","b"];
	
	var note1 = chromatic[tonica.selectedIndex];
	note1     = document.getElementsByName(note1);
	for (var i=0; i<note1.length; i++)
		note1[i].className = "note1";
		
	var note2 = (tonica.selectedIndex+notas[1])%12;
	note2     = chromatic[note2];
	note2     = document.getElementsByName(note2);
	for (var i=0; i<note2.length; i++)
		note2[i].className = "note2";
		
	var note3 = (tonica.selectedIndex+notas[2])%12;
	note3     = chromatic[note3];
	note3	  = document.getElementsByName(note3);
	for (var i=0; i<note3.length; i++)
		note3[i].className = "note3";
	
	var inote = 3;
	if (sexta.value != "")
	{
		var note4 = (tonica.selectedIndex+notas[inote])%12;
		note4 	  = chromatic[note4];
		note4 	  = document.getElementsByName(note4);
		for (var i=0; i<note4.length; i++)
			note4[i].className = "note4";
		inote++;
	}
	
	if (setima.value != "")
	{
		var note5 = (tonica.selectedIndex+notas[inote])%12;
		note5 	  = chromatic[note5];
		note5 	  = document.getElementsByName(note5);
		for (var i=0; i<note5.length; i++)
			note5[i].className = "note5";
		inote++;
	}
	
	if (nona.value != "")
	{
		var note6 = (tonica.selectedIndex+notas[inote])%12;
		note6 	  = chromatic[note6];
		note6 	  = document.getElementsByName(note6);
		for (var i=0; i<note6.length; i++)
			note6[i].className = "note6";
		inote++;
	}
	
	if (decimaPrimeira.value != "")
	{
		var note7 = (tonica.selectedIndex+notas[inote])%12;
		note7 	  = chromatic[note7];
		note7 	  = document.getElementsByName(note7);
		for (var i=0; i<note7.length; i++)
			note7[i].className = "note7";
		inote++;
	}
}

function ChordClearFingerboard() {
	var td = document.getElementsByTagName("td");
	
	for (var i=0; i<td.length; i++) {
		td[i].className = "note0";
	}
}

function ChordChangeLabels(tipo) {
	var sustenidos = ["C#","D#","F#","G#","A#"];
	var bemoles    = ["Db","Eb","Gb","Ab","Bb"];
	var tdnames	   = ["cs","ds","fs","gs","as"];
	var td;
	if (tipo == 'b') {
		for (var i=0; i<5; i++) {
			td = document.getElementsByName(tdnames[i]);
			for (var ii=0; ii<td.length; ii++) {
				td[ii].innerHTML = bemoles[i];
			}
		}
	}
	else {
		for (var i=0; i<5; i++) {
			td = document.getElementsByName(tdnames[i]);
			for (var ii=0; ii<td.length; ii++) {
				td[ii].innerHTML = sustenidos[i];
			}
		}
	}
}




function ScaleSetFingerboard() {
	var tonica 			= document.getElementById("tonica");	// elemento tonica
	var scale  			= document.getElementById("scale");		// elemento escala
	
	if (scale.selectedIndex == 0) {			// nenhuma escala selecionada
		ScaleSetFingerboard2();					// preenche fingerboar a partir dos checkboxes
		return;
	}

	var notas = new Array(scale.value.length);		// notas da escala
	for (var i=0; i<notas.length; i++) {			// obtendo notas da escala
		notas[i] = parseInt(scale.value[i], 16);
	}

	ScaleClearFingerboard();		// limpa fingerboard

	var chromatic = ["c","cs","d","ds","e","f","fs","g","gs","a","as","b"];
	var note;

	for (var i=0; i<notas.length; i++) {				// para cada nota da escala
		note = (notas[i]+tonica.selectedIndex)%12; 		// número da nota
		note = chromatic[note];							// nome da nota
		note = document.getElementsByName(note);		// celulas (td) da nota
		for (var ii=0; ii<note.length; ii++) {			// para cada nota na fingerboard
			note[ii].className = "note"+notas[i];		// cor da nota
		}
	}
}

function ScaleSetFingerboard2() {
	document.getElementById("scale").selectedIndex = 0;	// seleciona indice no menu de escalas
	ScaleClearFingerboard();									// limpa fingerboard
	
	var tonica 	  = document.getElementById("tonica");
	var chromatic = ["c","cs","d","ds","e","f","fs","g","gs","a","as","b"];
	var notas     = new Array();
	
	var ckb    	  = "";
	var lbl		  = "";
	var inotas 	  = 0;
	var classname = "";
	for (var i=0; i<12; i++) {
		ckb 		  = "ckb_"+chromatic[i];						// id do checkbox
		lbl			  = "lbl_"+chromatic[i];						// id do label
		ckb 		  = document.getElementById(ckb);				// elemento checkbox
		lbl			  = document.getElementById(lbl);				// elemento label
		classname     = "ckb"+((12+i-tonica.selectedIndex)%12);		// cor do label/checkbox
		lbl.className = classname;									// aplica cor
		if (ckb.checked == true) {									// obtendo notas marcadas
			notas[inotas] = i;
			inotas++;
		}
	}
	
	var note;
	for (var i=0; i<notas.length; i++) {				// para cada nota da escala
		note = (notas[i])%12; 		// número da nota
		note = chromatic[note];							// nome da nota
		note = document.getElementsByName(note);		// celulas (td) da nota
		for (var ii=0; ii<note.length; ii++) {			// para cada nota na fingerboard
			// cor da nota	
			note[ii].className = "note"+((12+notas[i]-tonica.selectedIndex)%12);
		}
	}
	
}

function ScaleClearFingerboard() {
	var td = document.getElementsByTagName("td");
	
	for (var i=0; i<td.length; i++) {
		td[i].className = "noteoff";
	}
}

function ScaleChangeLabels(tipo) {
	var sustenidos = ["C#","D#","F#","G#","A#"];
	var bemoles    = ["Db","Eb","Gb","Ab","Bb"];
	var tdnames	   = ["cs","ds","fs","gs","as"];
	var td;
	if (tipo == 'b') {
		for (var i=0; i<5; i++) {
			td = document.getElementsByName(tdnames[i]);
			for (var ii=0; ii<td.length; ii++) {
				td[ii].innerHTML = bemoles[i];
			}
		}
	}
	else {
		for (var i=0; i<5; i++) {
			td = document.getElementsByName(tdnames[i]);
			for (var ii=0; ii<td.length; ii++) {
				td[ii].innerHTML = sustenidos[i];
			}
		}
	}
}