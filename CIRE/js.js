function graph(){
	//alert('game On');
	var s = document.getElementById('seq').value;
	//var s = document.getElementsByTagName('seq').value;
	//alert(s.toUpperCase());
	//alert('yahoo');
	//console.log(s);

	var a=0;
	var x=0;
	var y=0;
	var cox=new Array(s.length);
	//alert(cox.length);
	var coy=new Array(s.length);
	var qrx=0;
	var qry=0;
	var qr=0;
	var z=0;
	var n=0;
	var amino=['E','A','C','V','F','L','I','W','M','T','Y','G','Q','R','N','P','H','K','D','S'];
	//alert(Math.cos(cox[0]));

	for (var i=0; i<s.length;i++)
	{
		if (s[i]==' ')
			continue;
		else if (s[i]=='\n')
			continue;
		else if (amino.includes(s[i],0))
		{
			a=amino.indexOf(s[i])*18;
			x+=Math.cos(((Math.PI)/180)*a);
			y+=Math.sin(((Math.PI)/180)*a);

			qrx+=x;
			qry+=y;
			n+=1;

			cox[i]=x;
			coy[i]=y;
		}
		else
			z+=1;
	}

	qr=Math.pow((Math.pow((qrx/n),2)+Math.pow((qry/n),2)),0.5);

	return [cox,coy,qrx,qry,n,z,qr];
}

function draw(){
	var points = graph();
	var cox = points[0];
	var coy = points[1];
	document.getElementById('graph').style.display = 'inline-Block';
	var pos = document.getElementById('graph');

	Plotly.newPlot( pos, [{
	x: cox, y: coy }], {margin: { t: 0 } } );
}

function compute(){

	draw();
	table();
}

function table(){

	var table = document.getElementById('chart');

	var row = table.insertRow(table.rows.length);
	var inter = graph();
	var cells = ['','','',inter[4],inter[5],inter[2],inter[3],inter[6]];

	for (var i=0; i<8; i++)
	{
		row.insertCell(i).innerHTML = cells[i];
	}
}