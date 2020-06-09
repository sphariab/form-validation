document.addEventListener("DOMContentLoaded", function(){
	var html = document.body.parentNode;
	var tooltip = document.querySelector('.tooltip');
	tooltip.addEventListener('click', showTooltip);

	html.addEventListener('click', function(event) {
		event.preventDefault();
		if (tooltip.contains(event.target)) {
			tooltip.classList.add('tooltip_active');
		} else {
			tooltip.classList.remove('tooltip_active');
			tooltip.removeEventListener('click', showTooltip)
		}
	});

	function showTooltip() {
		this.classList.add('tooltip_active');
	}
});