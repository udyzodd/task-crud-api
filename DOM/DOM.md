## There are 6 main methods to search for nodes in DOM:


# Method 	                Searches by... 	     Can call on an element? 	          Live?

    querySelector 	        CSS-selector 	                ✔ 	                        -

    querySelectorAll 	    CSS-selector 	                ✔ 	                        -

    getElementById 	            id 	                        - 	                        -

    getElementsByName 	        name 	                    - 	                        ✔

    getElementsByTagName 	tag or '*' 	                    ✔ 	                        ✔

    getElementsByClassName 	    class 	                    ✔ 	                        ✔

By far the most used are querySelector and querySelectorAll, but getElement(s)By* can be sporadically helpful or found in the old scripts.

Type A: A Single Element Node (or null)

    Methods: querySelector, getElementById
    How to access: You hold the element directly. You don't need loops or indexes. Always check if it exists (!== null) before modifying it.

```javascript
const banner = document.getElementById('main-banner');

if (banner) {
  banner.style.backgroundColor = 'blue'; // Modify directly
}
```
Type B: A NodeList

    Methods: querySelectorAll, getElementsByName
    How to access: * By Index: Use bracket notation like an array: list[0].
        By Loop: You can use a built-in .forEach() loop directly on a NodeList.
        Convert to Array: If you need real array methods (like map or filter), use Array.from(list).

```javascript
const buttons = document.querySelectorAll('.btn-submit');

// Access by index
const firstButton = buttons[0]; 

// Iterate directly using forEach
buttons.forEach((btn, index) => {
  btn.textContent = `Button #${index + 1}`;
});
```

Type C: An HTMLCollection

    Methods: getElementsByTagName, getElementsByClassName
    How to access: * By Index: Use bracket notation: collection[0].
        By Key/Name: You can access items by their id or name attribute string directly as a key: collection['username'].
        By Loop: CRITICAL: HTMLCollection does not support .forEach(). You must use a standard for...of loop, or convert it to a true array.

```javascript
const inputs = document.getElementsByClassName('user-input');

// Access by index
const firstInput = inputs[0];

// Accessing by an element's name/id attribute string key
// If <input name="email" class="user-input"> exists:
const emailInput = inputs['email']; 

// Loop using for...of (since .forEach() will throw an error here)
for (let input of inputs) {
  input.value = ""; 
}

// Alternative: Convert to real array to use array methods
const inputArray = Array.from(inputs);
inputArray.map(input => input.disabled = true);
```

## textContent, innerHTML, innerText

### innerHTML -> 
    Returns: String $\rightarrow$ "  Hello <span style=\"display: none;\">Secret</span> \n  <strong>World!</strong>\n"How to access/use: It gives you the full HTML structure. You use it when you want to inject new HTML tags into a page.Security Warning: Never use innerHTML with untrusted user inputs, as it exposes your site to Cross-Site Scripting (XSS) attacks.

```javascript
const element = document.querySelector('#demo');
let htmlContent = element.innerHTML;

console.log(htmlContent);

// result -> 
// Hello <span style="display: none;">Secret</span>
// <strong>World!</strong>
```

### textContent -> Hidden ko bhi select kar leta hai
    Returns: String $\rightarrow$ "  Hello Secret \n  World!\n"How to access/use: It grabs every piece of text, even if it is hidden by CSS (like the word "Secret"). It also extracts text inside <script> and <style> tags. It is fast because it doesn't care about layout or styling.

```javascript
const element = document.querySelector('#demo');
let pureText = element.textContent;

console.log(pureText);

// result ->
// Hello Secret
// World!
```

### innerText
    Returns: String $\rightarrow$ "Hello World!"How to access/use: It acts like a user copy-pasting text off the screen. Because it knows that "Secret" is hidden via CSS (display: none), it ignores it completely. It also normalizes extra spaces and newlines.Performance Note: It is slightly slower than textContent because the browser has to calculate the visual layout (CSS) before returning the value.

```javascript
const element = document.querySelector('#demo');
let visibleText = element.innerText;

console.log(visibleText);

// result ->
// Hello World!
```

