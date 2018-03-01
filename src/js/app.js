(function(){
	let i = 0;
	const crs = 30;
	const cont1 = document.getElementById('c1_links');
	const cont2 = document.getElementById('c2_links');
	const addLink = function(cont, courseId, i) {
		const folder = courseId + '_' + i;
		const indexFile = folder + '/index.html';
		const configFile = folder + '/config.js';
		const a = document.createElement('a');
		a.innerText = courseId.toUpperCase() + ' - ' + i;

		try {
			const config = require('../' + configFile);
			a.href = indexFile;
			if (config.title) {
				a.innerText += ` (${config.title})`;
			}
		}
		catch (e) {
		}

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