var tooltip = new HTML5TooltipUIComponent;
var target = document.getElementById("tooltip");
tooltip.set({
	animateFunction: "spin",
	backgroundColor: "#fff",
	target: target,
});


target.addEventListener('mouseenter',function(){
 tooltip.show();
 });

target.addEventListener('mouseleave',function(){
	tooltip.hide();
});

tooltip.mount();