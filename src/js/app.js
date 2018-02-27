(function(){
	var crs = 30;
	var i = 0;
	var cont1 = document.getElementById('c1_links');
	var cont2 = document.getElementById('c2_links');
	var addLink = function(cont, courseId, i) {
		var a = document.createElement('a');
		a.href = courseId + '_' + i + '/index.html';
		a.innerText = courseId.toUpperCase() + ' - ' + i;
		var div = document.createElement('div');
		div.appendChild(a);
		cont.appendChild(div);
	};
	while (i < crs) {
		++i;
		addLink(cont1, 'c1', i);
		addLink(cont2, 'c2', i);
	}
})();