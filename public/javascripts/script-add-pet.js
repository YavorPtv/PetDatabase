if (document.getElementById('add-pet-select') != null) {
	document
		.getElementById('add-pet-select')
		.addEventListener('change', function () {
			var petType = this.value;
			var dogDetails = document.getElementById('dogDetails');
			var catDetails = document.getElementById('catDetails');

			if (petType === 'dog') {
				dogDetails.classList.remove('hidden');
				catDetails.classList.add('hidden');
			} else if (petType === 'cat') {
				dogDetails.classList.add('hidden');
				catDetails.classList.remove('hidden');
			}
		});
}
