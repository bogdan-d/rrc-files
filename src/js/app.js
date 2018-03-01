(function(){
	let i = 0;
	const crs = 30;
	const cont1 = document.getElementById('c1_links');
	const cont2 = document.getElementById('c2_links');
	const addLink = function(cont, courseId, i) {
		const folder = courseId + '_' + i;
		const indexFile = folder + '/index.html';
		const a = document.createElement('a');

		try {
			require('../' + indexFile);
			a.href = indexFile;
		}
		catch (e) {
		}

		a.innerText = courseId.toUpperCase() + ' - ' + i;
		const div = document.createElement('div');
		div.appendChild(a);
		cont.appendChild(div);
	};
	while (i < crs) {
		++i;
		addLink(cont1, 'c1', i);
		addLink(cont2, 'c2', i);
	}
})();