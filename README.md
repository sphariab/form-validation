# form-validation

LIVE DEMO: https://sphariab.github.io/form-validation/

for installation:
- npm install
- gulp build
- gulp (to run on http://localhost:3000)

This is responsive form

Used:
1) preprocessor SCSS.
2) preprocessor Pug.
3) Task manager Gulp for compilation styles and templates, minification styles and scripts.
4) Responsiveness breakpoints: 480/768/1024px, Mobile first
5) Validate.js, underscore libraries for form fields validation, error messages show.
    On click field it becomes focus.
    On click "Tab" or "Enter" starts it's validation.
    If validation failed - show error message.
    On click "Submit" button - shows first not valid field.
    On any click - validation resets, messages hide.
6) CVV tooltip on click "?" icon, on click out of icon it is hidden.
7) On submit if form is valid page reloads (standart behavior).
8) BEM naming.
