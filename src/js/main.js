document.addEventListener("DOMContentLoaded", function() {
//tooltip
	var html = document.body.parentNode;
	var tooltip = document.querySelector('.tooltip');
	tooltip.addEventListener('click', showTooltip);

	html.addEventListener('click', function (event) {
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

//form validation
	var constraints = {
		cardnumber: {
			presence: true,
		},
		firstname: {
			presence: true,
			length: {
				minimum: 3,
				maximum: 20
			},
			format: {
				pattern: "[a-z0-9]+",
				flags: "i",
				message: "can only contain a-z and 0-9"
			}
		},
		lastname: {
			presence: true,
			length: {
				minimum: 3,
				maximum: 20
			},
			format: {
				pattern: "[a-z0-9]+",
				flags: "i",
				message: "can only contain a-z and 0-9"
			}
		},
		zipcode: {
			presence: true,
		},
		cvv: {
			presence: true,
		},
		expDateMonth: {
			presence: true
		},
		expDateYear: {
			presence: true,
		},
	};

	var form = document.querySelector(".user-form");
	var submitBtn = document.getElementsByClassName('submit-button')[0];
	var wrapper = document.querySelectorAll(".validation-wrapper");
	var inputs = document.querySelectorAll("input, select")

	submitBtn.addEventListener("click", function() {
		handleFormSubmit(form);
	});

	//reset onblur
	_.each(inputs, function(input) {
		input.addEventListener("blur", function(ev) {
			_.each(wrapper, function(item) {
				resetFormGroup(item)
			});
		});
	});

	//validation onkeyup, onchange
	for (var i = 0; i < inputs.length; ++i) {
		inputs.item(i).addEventListener("change", function() {
			var errors = validate(form, constraints) || {};
			showErrorsForInput(this, errors[this.name])
		});

		inputs.item(i).addEventListener("keyup", function() {
			if (event.keyCode === 13 || event.keyCode === 9) {
				event.preventDefault();
				var errors = validate(form, constraints) || {};
				showErrorsForInput(this, errors[this.name])
			}
		});
	}

	function handleFormSubmit(form, input) {
		var errors = validate(form, constraints);
		var inputContainer;

		if (errors !== undefined) {
			_.each(form.querySelectorAll("input[name], select[name]"), function(input) {
				if (errors && errors[input['name']] && !inputContainer) {
					return inputContainer = input
				}
			});

			showErrorsForInput(inputContainer, errors && errors[inputContainer.name]);
		} else {
			form.submit();
		}
	}

	function showErrors(form, errors) {
		_.each(form.querySelectorAll("input[name], select[name]"), function(input) {
			showErrorsForInput(input, errors && errors[input.name]);
		});
	}

	function showErrorsForInput(input, errors) {
		var formGroup = closestParent(input.parentNode, "validation-wrapper"),
			messages = formGroup.querySelector(".messages");
		resetFormGroup(formGroup);

		if (errors) {
			formGroup.classList.add("has-error");
			_.each(errors, function(error) {
				addError(messages, error);
			});
		} else {
			formGroup.classList.add("has-success");
		}
	}

	function closestParent(child, className) {
		if (!child || child == document) {
			return null;
		}
		if (child.classList.contains(className)) {
			return child;
		} else {
			return closestParent(child.parentNode, className);
		}
	}

	function resetFormGroup(formGroup) {
		formGroup.classList.remove("has-error");
		formGroup.classList.remove("has-success");
		_.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
			el.parentNode.removeChild(el);
		});
	}

	function addError(messages, error) {
		var block = document.createElement("p");
		block.classList.add("help-block");
		block.classList.add("error");
		block.innerText = error;
		messages.appendChild(block);
	}
})

