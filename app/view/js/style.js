var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';  
var isChrome = !!window.chrome && !isOpera;  

function loadSimulationPage(){

	document.getElementById('content').style.display='none';
	document.getElementById('simulator').style.display='block';
	window.scrollTo(0,0);
	
}


function loadContentPage(){
	
	document.getElementById('content').style.display='block';
	document.getElementById('simulator').style.display='none';
	window.scrollTo(0,0);
}


