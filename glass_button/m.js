function deBasePseudo(dict){
    return str.split('').map(lt=>lt.match(/[A-Z]/) && lt ? `-${lt.toLowerCase()}` : lt).join('')+';';
}

var dict = {
	background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)',
	boxShadow: '0 5px 5px rgba(0,0,0,0.2)',
	transform: 'translateY(100%)',
}



console.log(str);
