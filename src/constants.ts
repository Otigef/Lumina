import { Module } from './types';
import { MODULE_EXAMS } from './exams';

export const ROADMAP: Module[] = [
  {
    id: 'm1',
    title: 'HTML Fundamentals',
    level: 'Beginner',
    exam: MODULE_EXAMS.m1,
    lessons: [
      {
        id: 'h1',
        title: 'The Skeleton of the Web',
        description: 'Learn how to create a basic HTML structure.',
        content: '[HTML](term:HyperText Markup Language) stands for HyperText Markup Language. It is the structure of every website. Think of it as the bones of a building.\n\nTry adding this to your editor:\n```html\n<h1>My First Heading</h1>\n```',
        initialCode: '<!-- Create an <h1> tag with the text "Hello World" -->\n',
        solution: '<h1>Hello World</h1>',
        challenge: 'Create an <h1> tag with the exact text "Hello World".',
        type: 'html'
      },
      {
        id: 'h2',
        title: 'Lists and Links',
        description: 'Learn how to organize content and connect pages.',
        content: '[Links](term:A connection from one web resource to another) allow users to navigate, and [lists](term:A way to group related items) help organize information.',
        initialCode: '<!-- Create a link to google.com and an unordered list with 2 items -->\n',
        solution: '<a href="https://google.com">Google</a>\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>',
        challenge: 'Create a link to "https://google.com" with the text "Google", followed by an unordered list (<ul>) containing exactly two list items (<li>).',
        type: 'html'
      },
      {
        id: 'h3',
        title: 'Basic HTML Forms',
        description: 'Learn how to collect user input using forms.',
        content: '[Forms](term:A section of a document containing interactive controls for submitting information) are used to collect user input. Common elements include `<input type="text">` for names, `<input type="password">` for secrets, and `<button type="submit">` to send the data.',
        initialCode: '<!-- 1. Create a <form> tag -->\n<!-- 2. Inside, add a text input for "Username" -->\n<!-- 3. Add a password input for "Password" -->\n<!-- 4. Add a submit button with the text "Login" -->\n',
        solution: '<form>\n  <label>Username:</label>\n  <input type="text" name="username">\n  <br>\n  <label>Password:</label>\n  <input type="password" name="password">\n  <br>\n  <button type="submit">Login</button>\n</form>',
        challenge: 'Create a <form> containing a text input for "Username", a password input for "Password", and a submit button with the text "Login".',
        type: 'html'
      },
      {
        id: 'h4',
        title: 'Data in Tables',
        description: 'Learn how to structure tabular data.',
        content: '[Tables](term:An arrangement of data in rows and columns) are used to display data. Use [<table>](term:The container for table data) to start. [<tr>](term:Table Row) defines a row, [<th>](term:Table Header) defines a header cell, and [<td>](term:Table Data) defines a standard data cell.',
        initialCode: '<!-- 1. Create a <table> -->\n<!-- 2. Add a header row with "Name" and "Age" -->\n<!-- 3. Add a data row with "Alice" and "25" -->\n',
        solution: '<table>\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>Alice</td>\n    <td>25</td>\n  </tr>\n</table>',
        challenge: 'Create a <table> with a header row containing "Name" and "Age", and one data row containing "Alice" and "25".',
        type: 'html'
      },
      {
        id: 'h5',
        title: 'Semantic HTML',
        description: 'Learn how to use meaningful tags for better accessibility.',
        content: '[Semantic HTML](term:HTML tags that convey meaning about the content they contain) helps search engines and screen readers understand your page. Use `<header>`, `<footer>`, `<main>`, and `<section>` instead of generic `<div>` tags whenever possible.',
        initialCode: '<!-- Create a structure with <header>, <main>, and <footer> tags -->\n<!-- Add some text inside each -->\n',
        solution: '<header>\n  <h1>My Website</h1>\n</header>\n<main>\n  <p>Welcome to the main content.</p>\n</main>\n<footer>\n  <p>&copy; 2024 SkillStack</p>\n</footer>',
        challenge: 'Structure your page using semantic tags: <header>, <main>, and <footer>. Add some text content inside each.',
        type: 'html'
      },
      {
        id: 'h6',
        title: 'Images and Multimedia',
        description: 'Learn how to add images and videos to your pages.',
        content: 'Use the [<img>](term:Embeds an image in the document) tag for images and the `<video>` tag for videos. Remember to always include an `alt` attribute for images for accessibility.',
        initialCode: '<!-- 1. Add an image from https://picsum.photos/200 -->\n<!-- 2. Add an alt text "Random Image" -->\n',
        solution: '<img src="https://picsum.photos/200" alt="Random Image">',
        challenge: 'Add an <img> tag with src="https://picsum.photos/200" and an alt attribute set to "Random Image".',
        type: 'html'
      },
      {
        id: 'h7',
        title: 'HTML Accessibility (ARIA)',
        description: 'Make your web pages usable for everyone.',
        content: '[Accessibility](term:The practice of making websites usable by as many people as possible) is a core part of web development. [ARIA](term:Accessible Rich Internet Applications) attributes like `aria-label` and `role` help screen readers understand interactive elements that aren\'t standard HTML tags.',
        initialCode: '<!-- 1. Create a <div> that acts like a button -->\n<!-- 2. Add role="button" and aria-label="Close" -->\n',
        solution: '<div role="button" aria-label="Close">X</div>',
        challenge: 'Create a <div> with role="button" and aria-label="Close" to make it accessible as a button.',
        type: 'html'
      },
      {
        id: 'h8',
        title: 'Meta Tags and SEO',
        description: 'Help search engines find and understand your site.',
        content: '[Meta tags](term:Snippets of text that describe a page\'s content) go inside the `<head>` section. They don\'t appear on the page itself, but are used by search engines ([SEO](term:Search Engine Optimization)) and social media platforms.',
        initialCode: '<!-- 1. Add a <meta> tag for description -->\n<!-- 2. Set content to "Learn web development with Lumina" -->\n',
        solution: '<meta name="description" content="Learn web development with Lumina">',
        challenge: 'Add a <meta> tag with name="description" and content="Learn web development with Lumina".',
        type: 'html'
      },
      {
        id: 'h9',
        title: 'Web Components',
        description: 'Learn how to create reusable custom HTML elements.',
        content: '[Web Components](term:A suite of different technologies allowing you to create reusable custom elements) consist of three main technologies: Custom Elements, Shadow DOM, and HTML Templates.',
        initialCode: '<script>\n  class MyElement extends HTMLElement {\n    constructor() {\n      super();\n      this.innerHTML = "<p>Hello from Custom Element!</p>";\n    }\n  }\n  // Register the element as "my-element"\n</script>\n<my-element></my-element>',
        solution: '<script>\n  class MyElement extends HTMLElement {\n    constructor() {\n      super();\n      this.innerHTML = "<p>Hello from Custom Element!</p>";\n    }\n  }\n  customElements.define("my-element", MyElement);\n</script>\n<my-element></my-element>',
        challenge: 'Register the custom element "my-element" using customElements.define.',
        type: 'js'
      },
      {
        id: 'h10',
        title: 'HTML5 Canvas',
        description: 'Learn how to draw graphics on the fly via scripting.',
        content: 'The [Canvas API](term:A way to draw graphics via JavaScript and the HTML <canvas> element) can be used for drawing graphs, making photo compositions, creating animations, or even doing real-time video processing or rendering.',
        initialCode: '<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>\n<script>\n  const c = document.getElementById("myCanvas");\n  const ctx = c.getContext("2d");\n  // 1. Set fillStyle to "red"\n  // 2. Draw a rectangle at (0,0) with width 150 and height 75\n</script>',
        solution: '<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>\n<script>\n  const c = document.getElementById("myCanvas");\n  const ctx = c.getContext("2d");\n  ctx.fillStyle = "red";\n  ctx.fillRect(0, 0, 150, 75);\n</script>',
        challenge: 'Use the Canvas 2D context to draw a red rectangle of 150x75 pixels.',
        type: 'js'
      },
      {
        id: 'h11',
        title: 'SVG Basics',
        description: 'Learn how to use Scalable Vector Graphics.',
        content: '[SVG](term:Scalable Vector Graphics - an XML-based image format for two-dimensional graphics) is used to define vector-based graphics for the Web. SVGs do not lose any quality if they are zoomed or resized.',
        initialCode: '<!-- 1. Create an <svg> element with width 100 and height 100 -->\n<!-- 2. Inside, add a <circle> with cx=50, cy=50, r=40, and fill="blue" -->\n',
        solution: '<svg width="100" height="100">\n  <circle cx="50" cy="50" r="40" fill="blue" />\n</svg>',
        challenge: 'Create an SVG circle with a radius of 40, centered at (50, 50), and filled with blue.',
        type: 'html'
      }
    ]
  },
  {
    id: 'm2',
    title: 'CSS Styling Basics',
    level: 'Beginner',
    exam: MODULE_EXAMS.m2,
    lessons: [
      {
        id: 'c1',
        title: 'Colors and Fonts',
        description: 'Make your HTML look beautiful.',
        content: '[CSS](term:Cascading Style Sheets) is used to style HTML elements. You can change colors, sizes, and fonts.\n\nYou can use the `color` property like this:\n```css\ncolor: red;\n```',
        initialCode: '<style>\n  h1 {\n    /* Change color to blue and font-size to 40px */\n  }\n</style>\n<h1>Style Me!</h1>',
        solution: '<style>\n  h1 {\n    color: blue;\n    font-size: 40px;\n  }\n</style>\n<h1>Style Me!</h1>',
        challenge: 'Style the <h1> tag: set its color to blue and its font-size to 40px.',
        type: 'css'
      },
      {
        id: 'c2',
        title: 'The Box Model',
        description: 'Understand padding, borders, and margins.',
        content: 'Every element in CSS is a [box](term:The rectangular area that every HTML element occupies). Understanding the [box model](term:The structure of an element consisting of content, padding, border, and margin) is crucial for layout.',
        initialCode: '<style>\n  .box {\n    background: lightgray;\n    padding: 20px;\n    margin: 10px;\n    border: 2px solid black;\n  }\n</style>\n<div class="box">I am a box</div>',
        solution: '<style>\n  .box {\n    background: lightgray;\n    padding: 20px;\n    margin: 10px;\n    border: 2px solid black;\n  }\n</style>\n<div class="box">I am a box</div>',
        challenge: 'Apply the box model: Give the .box class 20px of padding, 10px of margin, and a 2px solid black border.',
        type: 'css',
        isComplex: true,
        videoPrompt: 'A 3D animation showing an HTML element as a box with layers: content in the center, surrounded by padding, then a border, and finally margin space pushing other elements away.'
      },
      {
        id: 'c3',
        title: 'Mastering Positioning',
        description: 'Learn how to move elements around the page.',
        content: 'CSS positioning allows you to take elements out of the normal document flow. [position: relative](term:Positions the element relative to its normal position) is used as a reference for absolute children. [position: absolute](term:Positions the element relative to its nearest positioned ancestor) lets you place elements anywhere. [z-index](term:Controls the vertical stacking order of elements that overlap) determines which element stays on top.',
        initialCode: '<style>\n  .container {\n    width: 200px;\n    height: 200px;\n    background: #eee;\n    /* 1. Set position to relative */\n  }\n  .box {\n    width: 50px;\n    height: 50px;\n    background: red;\n    /* 2. Set position to absolute */\n    /* 3. Move it 20px from the top and 20px from the left */\n  }\n</style>\n<div class="container">\n  <div class="box"></div>\n</div>',
        solution: '<style>\n  .container {\n    width: 200px;\n    height: 200px;\n    background: #eee;\n    position: relative;\n  }\n  .box {\n    width: 50px;\n    height: 50px;\n    background: red;\n    position: absolute;\n    top: 20px;\n    left: 20px;\n  }\n</style>\n<div class="container">\n  <div class="box"></div>\n</div>',
        challenge: 'Position the red box: Set .container to relative and .box to absolute. Move .box 20px from the top and 20px from the left.',
        type: 'css',
        isComplex: true,
        videoPrompt: 'A motion graphics video showing a red square moving inside a gray container. The red square is labeled "absolute" and the container is labeled "relative". Arrows show the square moving 20px from top and left.'
      },
      {
        id: 'c4',
        title: 'CSS Specificity',
        description: 'Learn how the browser decides which styles to apply.',
        content: 'CSS Specificity is a score or rank that determines which style declarations are applied to an element. When multiple rules target the same element, the one with the highest specificity wins.\n\n### The Cascade\nThe [Cascade](term:The process of combining different stylesheets and resolving conflicts between different CSS rules) is the algorithm the browser uses to decide which styles to apply. It follows a specific order of priority:\n\n1. **Origin & Importance**: The browser looks at where the style comes from:\n   - **User Agent Styles**: Default styles provided by the browser (e.g., `h1` is bold).\n   - **User Styles**: Styles set by the user (e.g., custom browser settings).\n   - **Author Styles**: Styles written by you, the developer.\n   - **!important**: Adding `!important` to a property overrides almost everything else.\n\n2. **Specificity**: If styles have the same origin, the browser calculates a score based on the selector type. \n\n3. **Source Order**: If the origin and specificity are identical, the **last** rule defined in the CSS wins.\n\n### How Specificity is Calculated:\nSpecificity is represented by four numbers: (Inline, ID, Class, Element).\n\n- **Inline Styles**: `(1, 0, 0, 0)` - Added via the `style` attribute.\n- **IDs**: `(0, 1, 0, 0)` - Selectors like `#header`.\n- **Classes, Attributes, and Pseudo-classes**: `(0, 0, 1, 0)` - Selectors like `.btn` or `:hover`.\n- **Elements and Pseudo-elements**: `(0, 0, 0, 1)` - Selectors like `div` or `::before`.\n\n### Combinators and Special Selectors\n[Combinators](term:Symbols that explain the relationship between selectors) like space (descendant), `>` (child), `+` (adjacent sibling), and `~` (general sibling) **do not add specificity** themselves, but the selectors they connect do.\n\n- **:not(x)**: The `:not()` pseudo-class itself has no specificity, but the **selector inside it (x)** does.\n- **:is(x, y)**: Has the specificity of its **most specific** argument.\n- **:where(x, y)**: Always has **zero** specificity, regardless of its arguments.\n\n[Try the Interactive Demo](demo:specificity)',
        initialCode: '<style>\n  /* 1. Add a rule for "h1" that sets color to red */\n  /* 2. Add a rule for the class ".title" that sets color to blue */\n  /* 3. Add a rule for the id "#main-title" that sets color to green */\n</style>\n<h1 id="main-title" class="title">What color am I?</h1>',
        solution: '<style>\n  h1 {\n    color: red;\n  }\n  .title {\n    color: blue;\n  }\n  #main-title {\n    color: green;\n  }\n</style>\n<h1 id="main-title" class="title">What color am I?</h1>',
        challenge: 'Test specificity: Add CSS rules for h1 (color: red), .title (color: blue), and #main-title (color: green).',
        type: 'css',
        isComplex: true,
        videoPrompt: 'A visual hierarchy diagram showing CSS selectors: ID (gold crown), Class (silver medal), and Element (bronze medal). A text element changes color as different selectors are applied, showing the winner.'
      },
      {
        id: 'c5',
        title: 'Targeting Elements',
        description: 'Learn different ways to select HTML elements for styling.',
        content: '[Selectors](term:Patterns used to select the elements you want to style) are the heart of CSS. You can target by [element](term:Selects all elements of a specific type), [class](term:Selects elements with a specific class attribute), or [ID](term:Selects a single element with a unique ID). [Descendant selectors](term:Selects elements that are inside another element) and [child selectors](term:Selects elements that are direct children of another element) allow for more precision.\n\n### Background Images\nThe `background-image` property sets an image as the background of an element. You can use a URL to an image, like this:\n```css\n.hero {\n  background-image: url("https://picsum.photos/seed/picsum/800/600");\n}\n```',
        initialCode: '<style>\n  /* 1. Target all <p> elements and set color to gray */\n  /* 2. Target the class ".highlight" and set background to yellow */\n  /* 3. Target the ID "#main" and set font-weight to bold */\n  /* 4. Target <span> inside <div> (descendant) and set color to red */\n</style>\n<div id="main">\n  <p class="highlight">I am highlighted</p>\n  <p>I am just a <span>paragraph</span></p>\n</div>',
        solution: '<style>\n  p {\n    color: gray;\n  }\n  .highlight {\n    background: yellow;\n  }\n  #main {\n    font-weight: bold;\n  }\n  div span {\n    color: red;\n  }\n</style>\n<div id="main">\n  <p class="highlight">I am highlighted</p>\n  <p>I am just a <span>paragraph</span></p>\n</div>',
        challenge: 'Target elements: Set <p> to gray, .highlight to yellow background, #main to bold, and <span> inside <div> to red.',
        type: 'css'
      },
      {
        id: 'c6',
        title: 'CSS Variables',
        description: 'Learn how to use custom properties for reusable values.',
        content: '[CSS Variables](term:Custom properties that contain specific values to be reused throughout a document) allow you to store values like colors or sizes and reuse them. Define them in the `:root` selector using the `--` prefix.',
        initialCode: '<style>\n  :root {\n    /* 1. Define a variable --brand-color as #10b981 */\n  }\n  h1 {\n    /* 2. Use the variable for the color property */\n  }\n</style>\n<h1>Variable Color</h1>',
        solution: '<style>\n  :root {\n    --brand-color: #10b981;\n  }\n  h1 {\n    color: var(--brand-color);\n  }\n</style>\n<h1>Variable Color</h1>',
        challenge: 'Use CSS variables: Define --brand-color as #10b981 in :root and apply it to the <h1> color.',
        type: 'css'
      },
      {
        id: 'c7',
        title: 'Responsive Design',
        description: 'Learn how to make your site look good on all devices.',
        content: '[Media Queries](term:A CSS technique used to apply different styles for different devices and screen sizes) are the key to responsive design. You can change styles based on the viewport width.',
        initialCode: '<style>\n  .box {\n    width: 100%;\n    height: 100px;\n    background: red;\n  }\n  /* Add a media query for min-width: 600px */\n  /* Inside, change the .box background to blue */\n</style>\n<div class="box"></div>',
        solution: '<style>\n  .box {\n    width: 100%;\n    height: 100px;\n    background: red;\n  }\n  @media (min-width: 600px) {\n    .box {\n      background: blue;\n    }\n  }\n</style>\n<div class="box"></div>',
        challenge: 'Create a media query: Add a media query for min-width: 600px that changes the .box background to blue.',
        type: 'css'
      },
      {
        id: 'c8',
        title: 'Advanced Selectors',
        description: 'Master pseudo-classes, pseudo-elements, and attribute selectors.',
        content: 'Advanced selectors give you fine-grained control over your elements.\n\n### Pseudo-classes\n[Pseudo-classes](term:A keyword added to a selector that specifies a special state of the selected element(s)) like `:hover`, `:nth-child()`, and `:focus` target elements based on their state or position.\n\n### Pseudo-elements\n[Pseudo-elements](term:A keyword added to a selector that lets you style a specific part of the selected element(s)) like `::before`, `::after`, and `::first-letter` style specific parts of an element.\n\n### Attribute Selectors\n[Attribute Selectors](term:Selects elements based on the presence or value of a given attribute) like `[type="text"]` or `[href^="https"]` target elements with specific attributes.',
        initialCode: '<style>\n  /* 1. Change button background to green on :hover */\n  /* 2. Use ::before to add "★ " before the text in .star-item */\n  /* 3. Target input[type="text"] and add a 2px blue border */\n</style>\n<button>Hover Me</button>\n<p class="star-item">Special Item</p>\n<input type="text" placeholder="Type here...">',
        solution: '<style>\n  button:hover {\n    background: green;\n    color: white;\n  }\n  .star-item::before {\n    content: "★ ";\n    color: gold;\n  }\n  input[type="text"] {\n    border: 2px solid blue;\n  }\n</style>\n<button>Hover Me</button>\n<p class="star-item">Special Item</p>\n<input type="text" placeholder="Type here...">',
        challenge: 'Use advanced selectors: Add a :hover effect to the button, use ::before to add "★ " to .star-item, and style input[type="text"].',
        type: 'css'
      },
      {
        id: 'c9',
        title: 'Introduction to Tailwind CSS',
        description: 'Style your sites faster with a utility-first CSS framework.',
        content: '[Tailwind CSS](term:A utility-first CSS framework for rapidly building custom user interfaces) is a popular CSS framework that provides low-level utility classes to build designs directly in your markup.\n\n### Utility Classes\nInstead of writing custom CSS, you apply pre-existing classes like `text-red-500` for color or `p-4` for padding.\n\n### Responsive Modifiers\nUse prefixes like `md:` or `lg:` to apply styles only at certain screen sizes. For example, `md:text-lg` makes text larger on medium screens and up.',
        initialCode: '<!-- This is a conceptual lesson. In a real project, you would use Tailwind classes directly in HTML. -->\n<div class="p-6 bg-white rounded-lg shadow-md">\n  <h1 class="text-2xl font-bold text-slate-800 md:text-3xl">Hello, Tailwind!</h1>\n  <p class="mt-2 text-slate-600">This component is styled with utility classes.</p>\n</div>',
        solution: '<div class="p-6 bg-white rounded-lg shadow-md">\n  <h1 class="text-2xl font-bold text-slate-800 md:text-3xl">Hello, Tailwind!</h1>\n  <p class="mt-2 text-slate-600">This component is styled with utility classes.</p>\n</div>',
        challenge: 'Explore Tailwind: Apply utility classes to create a card with padding, background, shadow, and responsive text sizing.',
        type: 'html'
      },
      {
        id: 'c10',
        title: 'CSS Transitions',
        description: 'Animate property changes smoothly.',
        content: '[CSS Transitions](term:A CSS feature that allows you to smoothly animate changes to CSS properties over a given duration) provide a way to control animation speed when changing CSS properties. Instead of property changes taking effect immediately, you can cause changes in a property to take place over a period of time.\n\nFor example, you can make a button change color smoothly when the user hovers over it, or make an element fade in or out by transitioning its `opacity`.',
        initialCode: '<style>\n  .box {\n    width: 100px;\n    height: 100px;\n    background: #3498db;\n    opacity: 1;\n    /* 1. Add a transition for background-color and opacity over 0.5s */\n  }\n\n  .box:hover {\n    /* 2. Change background-color to #e74c3c */\n    /* 3. Change opacity to 0.5 */\n  }\n</style>\n<div class="box"></div>',
        solution: '<style>\n  .box {\n    width: 100px;\n    height: 100px;\n    background: #3498db;\n    opacity: 1;\n    transition: background-color 0.5s, opacity 0.5s;\n  }\n\n  .box:hover {\n    background-color: #e74c3c;\n    opacity: 0.5;\n  }\n</style>\n<div class="box"></div>',
        challenge: 'Add transitions: Make the .box background-color and opacity transition over 0.5s when hovered.',
        type: 'css'
      },
      {
        id: 'c11',
        title: 'CSS Animations & Keyframes',
        description: 'Create complex, multi-step animations.',
        content: '[Keyframes](term:A way to define the start, end, and intermediate steps of a CSS animation) allow you to create complex animations that go beyond simple transitions. Use `@keyframes` to define the animation and the `animation` property to apply it.',
        initialCode: '<style>\n  @keyframes slide {\n    from { transform: translateX(0); }\n    to { transform: translateX(100px); }\n  }\n  .box {\n    width: 50px;\n    height: 50px;\n    background: purple;\n    /* Apply the "slide" animation over 2 seconds, infinitely */\n  }\n</style>\n<div class="box"></div>',
        solution: '<style>\n  @keyframes slide {\n    from { transform: translateX(0); }\n    to { transform: translateX(100px); }\n  }\n  .box {\n    width: 50px;\n    height: 50px;\n    background: purple;\n    animation: slide 2s infinite alternate;\n  }\n</style>\n<div class="box"></div>',
        challenge: 'Apply the "slide" animation to the .box so it moves 100px to the right over 2 seconds, repeating infinitely.',
        type: 'css'
      },
      {
        id: 'c12',
        title: 'CSS Architecture (BEM)',
        description: 'Learn how to write maintainable and scalable CSS.',
        content: '[BEM](term:Block Element Modifier - a popular naming convention for CSS classes) helps you write CSS that is easy to understand and maintain. It uses a specific naming pattern: `block__element--modifier`.',
        initialCode: '<style>\n  /* 1. Style the block .card */\n  /* 2. Style the element .card__title */\n  /* 3. Style the modifier .card--featured */\n</style>\n<div class="card card--featured">\n  <h2 class="card__title">Featured Card</h2>\n</div>',
        solution: '<style>\n  .card { padding: 20px; border: 1px solid #ccc; }\n  .card__title { font-size: 1.5rem; margin: 0; }\n  .card--featured { background: #f0f9ff; border-color: #0ea5e9; }\n</style>\n<div class="card card--featured">\n  <h2 class="card__title">Featured Card</h2>\n</div>',
        challenge: 'Use BEM naming: Style the .card block, the .card__title element, and the .card--featured modifier.',
        type: 'css'
      },
      {
        id: 'c13',
        title: 'Container Queries',
        description: 'Style elements based on their container size, not the viewport.',
        content: '[Container Queries](term:A CSS feature that allows you to style elements based on the size of a container element) are the next evolution of responsive design. Use `container-type: inline-size` on a parent and `@container` on the child.',
        initialCode: '<style>\n  .parent {\n    /* 1. Set container-type to inline-size */\n    width: 300px;\n    border: 1px solid #ccc;\n  }\n  /* 2. Add a @container query for (min-width: 400px) */\n  /* 3. Inside, change .child background to emerald */\n  .child { background: slateblue; padding: 20px; color: white; }\n</style>\n<div class="parent">\n  <div class="child">I respond to my parent!</div>\n</div>',
        solution: '<style>\n  .parent {\n    container-type: inline-size;\n    width: 300px;\n    border: 1px solid #ccc;\n  }\n  @container (min-width: 400px) {\n    .child {\n      background: #10b981;\n    }\n  }\n  .child { background: slateblue; padding: 20px; color: white; }\n</style>\n<div class="parent">\n  <div class="child">I respond to my parent!</div>\n</div>',
        challenge: 'Set up a container query: Make the .parent a container and change the .child background when the parent is at least 400px wide.',
        type: 'css'
      },
      {
        id: 'c14',
        title: 'CSS Logical Properties',
        description: 'Learn how to write direction-agnostic CSS.',
        content: '[Logical Properties](term:CSS properties that refer to the block and inline dimensions of an element rather than physical dimensions) help with internationalization. Instead of `margin-left`, use `margin-inline-start`.',
        initialCode: '<style>\n  .box {\n    background: #f3f4f6;\n    /* 1. Set padding-inline to 20px */\n    /* 2. Set border-block-end to 4px solid blue */\n  }\n</style>\n<div class="box">Logical Styling</div>',
        solution: '<style>\n  .box {\n    background: #f3f4f6;\n    padding-inline: 20px;\n    border-block-end: 4px solid blue;\n  }\n</style>\n<div class="box">Logical Styling</div>',
        challenge: 'Use logical properties: Set padding-inline to 20px and border-block-end to 4px solid blue.',
        type: 'css'
      },
      {
        id: 'c15',
        title: 'CSS Filters',
        description: 'Apply visual effects like blur or contrast to elements.',
        content: 'The [filter](term:A CSS property that applies graphical effects like blur or color shift to an element) property is used to apply visual effects. You can also use `backdrop-filter` to apply effects to the area behind an element.',
        initialCode: '<style>\n  .blurred {\n    /* 1. Apply a blur filter of 5px */\n  }\n  .grayscale {\n    /* 2. Apply a grayscale filter of 100% */\n  }\n</style>\n<img class="blurred" src="https://picsum.photos/seed/1/200" alt="Blur me">\n<img class="grayscale" src="https://picsum.photos/seed/2/200" alt="Gray me">',
        solution: '<style>\n  .blurred {\n    filter: blur(5px);\n  }\n  .grayscale {\n    filter: grayscale(100%);\n  }\n</style>\n<img class="blurred" src="https://picsum.photos/seed/1/200" alt="Blur me">\n<img class="grayscale" src="https://picsum.photos/seed/2/200" alt="Gray me">',
        challenge: 'Apply filters: Blur the first image by 5px and make the second image 100% grayscale.',
        type: 'css'
      }
    ]
  },
  {
    id: 'm3',
    title: 'Modern Layouts',
    level: 'Intermediate',
    exam: MODULE_EXAMS.m3,
    lessons: [
      {
        id: 'f0',
        title: 'Flexbox Basics',
        description: 'Learn the core properties of Flexbox.',
        content: '[Flexbox](term:A CSS layout module that makes it easier to design flexible responsive layout structure) is a one-dimensional layout method. Use [display: flex](term:Defines a flex container) to enable it. [flex-direction](term:Specifies the direction of the flexible items) defines the axis (row or column), and [justify-content](term:Defines how the browser distributes space between and around content items) aligns items along the main axis.',
        initialCode: '<style>\n  .container {\n    /* 1. Enable flexbox */\n    /* 2. Set direction to row */\n    /* 3. Distribute items with space-between */\n    background: #f0f0f0;\n    padding: 10px;\n  }\n  .box {\n    width: 50px;\n    height: 50px;\n    background: #3498db;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n</style>\n<div class="container">\n  <div class="box">1</div>\n  <div class="box">2</div>\n  <div class="box">3</div>\n</div>',
        solution: '<style>\n  .container {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    background: #f0f0f0;\n    padding: 10px;\n  }\n  .box {\n    width: 50px;\n    height: 50px;\n    background: #3498db;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n</style>\n<div class="container">\n  <div class="box">1</div>\n  <div class="box">2</div>\n  <div class="box">3</div>\n</div>',
        challenge: 'Enable flexbox on .container, set direction to row, and use justify-content: space-between.',
        type: 'css',
        isComplex: true,
        videoPrompt: 'An animation of three blue boxes inside a container. The boxes smoothly slide apart to fill the space when "justify-content: space-between" is applied. The container expands and shrinks.'
      },
      {
        id: 'f1',
        title: 'Centering with Flexbox',
        description: 'The easiest way to center elements.',
        content: '[Flexbox](term:A one-dimensional layout method for arranging items in rows or columns) is a powerful layout tool. Use [display: flex](term:Defines a flex container; inline or block depending on the given value) to start.',
        initialCode: '<style>\n  .container {\n    display: flex;\n    height: 200px;\n    background: #f0f0f0;\n    /* Center the child horizontally and vertically */\n  }\n  .child {\n    background: coral;\n    padding: 20px;\n  }\n</style>\n<div class="container">\n  <div class="child">Centered!</div>\n</div>',
        solution: '<style>\n  .container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 200px;\n    background: #f0f0f0;\n  }\n  .child {\n    background: coral;\n    padding: 20px;\n  }\n</style>\n<div class="container">\n  <div class="child">Centered!</div>\n</div>',
        challenge: 'Center the .child element both horizontally and vertically inside .container using flexbox.',
        type: 'css'
      },
      {
        id: 'g1',
        title: 'CSS Grid Layout',
        description: 'Create complex 2D layouts with ease.',
        content: '[CSS Grid](term:A two-dimensional layout system for the web) is a 2-dimensional layout system. Use [display: grid](term:Defines the element as a grid container) on a container to start. You can define columns with [grid-template-columns](term:Defines the columns of the grid with a space-separated list of values) and spacing with [grid-gap](term:Sets the size of the gap between rows and columns).',
        initialCode: '<style>\n  .grid-container {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    grid-gap: 10px;\n    background: #eee;\n    padding: 10px;\n  }\n  .item {\n    background: #3498db;\n    color: white;\n    padding: 20px;\n    text-align: center;\n  }\n</style>\n<div class="grid-container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n  <div class="item">5</div>\n  <div class="item">6</div>\n</div>',
        solution: '<style>\n  .grid-container {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    grid-gap: 10px;\n    background: #eee;\n    padding: 10px;\n  }\n  .item {\n    background: #3498db;\n    color: white;\n    padding: 20px;\n    text-align: center;\n  }\n</style>\n<div class="grid-container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n  <div class="item">5</div>\n  <div class="item">6</div>\n</div>',
        challenge: 'Create a 3-column grid layout with a 10px gap using grid-template-columns: 1fr 1fr 1fr.',
        type: 'css',
        isComplex: true,
        videoPrompt: 'A 2D grid layout forming dynamically. Boxes fly into a 3-column grid structure, showing how rows and columns are defined and how gaps separate them.'
      },
      {
        id: 'g2',
        title: 'Grid Template Areas',
        description: 'Learn how to name and position grid areas.',
        content: '[Grid Template Areas](term:A way to define the layout of a grid by naming areas) allow you to create complex layouts by naming sections of your grid and placing elements into them.\n\n[Try the Interactive Demo](demo:grid-areas)',
        initialCode: '<style>\n  .container {\n    display: grid;\n    grid-template-areas:\n      "header header"\n      "sidebar main"\n      "footer footer";\n    grid-gap: 10px;\n  }\n  header { grid-area: header; background: #3498db; }\n  /* 1. Assign sidebar and main to their respective areas */\n  /* 2. Assign footer to the footer area */\n</style>\n<div class="container">\n  <header>Header</header>\n  <aside>Sidebar</aside>\n  <main>Main Content</main>\n  <footer>Footer</footer>\n</div>',
        solution: '<style>\n  .container {\n    display: grid;\n    grid-template-areas:\n      "header header"\n      "sidebar main"\n      "footer footer";\n    grid-gap: 10px;\n  }\n  header { grid-area: header; background: #3498db; }\n  aside { grid-area: sidebar; background: #e74c3c; }\n  main { grid-area: main; background: #2ecc71; }\n  footer { grid-area: footer; background: #f1c40f; }\n</style>\n<div class="container">\n  <header>Header</header>\n  <aside>Sidebar</aside>\n  <main>Main Content</main>\n  <footer>Footer</footer>\n</div>',
        challenge: 'Assign each element to its corresponding grid-area (header, sidebar, main, footer) to complete the layout.',
        type: 'css'
      },
      {
        id: 'f2',
        title: 'Flexbox Advanced',
        description: 'Master flex-grow, flex-shrink, and flex-basis.',
        content: '[Flex-grow](term:Defines the ability for a flex item to grow if necessary) and [flex-shrink](term:Defines the ability for a flex item to shrink if necessary) control how items fill space. [Flex-basis](term:Defines the default size of an element before the remaining space is distributed) sets the initial size.',
        initialCode: '<style>\n  .container { display: flex; gap: 10px; }\n  .box { padding: 20px; background: #eee; }\n  .grow { \n    /* Set flex-grow to 1 */\n  }\n</style>\n<div class="container">\n  <div class="box grow">I grow</div>\n  <div class="box">I stay</div>\n</div>',
        solution: '<style>\n  .container { display: flex; gap: 10px; }\n  .box { padding: 20px; background: #eee; }\n  .grow { flex-grow: 1; }\n</style>\n<div class="container">\n  <div class="box grow">I grow</div>\n  <div class="box">I stay</div>\n</div>',
        challenge: 'Make the .grow box take up all remaining space by setting flex-grow to 1.',
        type: 'css'
      },
      {
        id: 'g3',
        title: 'Grid Minmax & Auto-fit',
        description: 'Create ultra-responsive grids without media queries.',
        content: 'The [minmax()](term:Defines a size range greater than or equal to min and less than or equal to max) function and `auto-fit` keyword allow you to create grids that automatically wrap and resize based on available space.',
        initialCode: '<style>\n  .grid {\n    display: grid;\n    /* Create a grid with auto-fit columns, min 200px, max 1fr */\n    gap: 10px;\n  }\n  .item { background: #3498db; height: 100px; }\n</style>\n<div class="grid">\n  <div class="item"></div>\n  <div class="item"></div>\n  <div class="item"></div>\n</div>',
        solution: '<style>\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 10px;\n  }\n  .item { background: #3498db; height: 100px; }\n</style>\n<div class="grid">\n  <div class="item"></div>\n  <div class="item"></div>\n  <div class="item"></div>\n</div>',
        challenge: 'Create a responsive grid using repeat(auto-fit, minmax(200px, 1fr)) so items wrap automatically.',
        type: 'css'
      },
      {
        id: 'g4',
        title: 'Grid Alignment',
        description: 'Master alignment in CSS Grid.',
        content: 'Grid items can be aligned using [justify-items](term:Aligns grid items along the inline (row) axis) and [align-items](term:Aligns grid items along the block (column) axis). You can also use `place-items` as a shorthand.',
        initialCode: '<style>\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    height: 200px;\n    background: #eee;\n    /* Center items in both directions */\n  }\n  .item { background: coral; padding: 10px; }\n</style>\n<div class="grid">\n  <div class="item">Centered</div>\n  <div class="item">Centered</div>\n</div>',
        solution: '<style>\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    height: 200px;\n    background: #eee;\n    place-items: center;\n  }\n  .item { background: coral; padding: 10px; }\n</style>\n<div class="grid">\n  <div class="item">Centered</div>\n  <div class="item">Centered</div>\n</div>',
        challenge: 'Use place-items: center to center all items in the grid container.',
        type: 'css'
      }
    ]
  },
  {
    id: 'm4',
    title: 'JavaScript: The Brains',
    level: 'Intermediate',
    exam: MODULE_EXAMS.m4,
    lessons: [
      {
        id: 'j1',
        title: 'Variables and Alerts',
        description: 'Make your website interactive.',
        content: '[JavaScript](term:A programming language that enables interactive web pages) is a programming language that lets you add logic to your site.',
        initialCode: '<script>\n  // Create a variable named "name" and set it to your name\n  // Then use alert(name) to show it\n</script>',
        solution: '<script>\n  const name = "SkillStacker";\n  alert(name);\n</script>',
        challenge: 'Create a variable named "name", set it to any string, and then show it in an alert().',
        type: 'js'
      },
      {
        id: 'j2',
        title: 'DOM Manipulation',
        description: 'Change HTML with JavaScript.',
        content: 'You can use [document.getElementById](term:Returns an Element object representing the element whose id property matches the specified string) to find elements and change their content.',
        initialCode: '<h1 id="title">Old Title</h1>\n<script>\n  // Change the text of the element with id "title" to "New Title"\n</script>',
        solution: '<h1 id="title">Old Title</h1>\n<script>\n  document.getElementById("title").innerText = "New Title";\n</script>',
        challenge: 'Use document.getElementById to select the element with id "title" and change its innerText to "New Title".',
        type: 'js'
      },
      {
        id: 'j3',
        title: 'Interacting with the DOM',
        description: 'Learn how to select elements and change their styles dynamically.',
        content: 'The [DOM](term:Document Object Model - a programming interface for web documents) is how JavaScript "sees" your HTML. You can select elements using [querySelector](term:Returns the first Element within the document that matches the specified selector) and change their styles using the [.style](term:Property used to get or set the inline style of an element) property.',
        initialCode: '<div id="box" style="width: 100px; height: 100px; background: red;"></div>\n<script>\n  // 1. Select the element with id "box"\n  // 2. Change its background color to "blue"\n  // 3. Change its width to "200px"\n</script>',
        solution: '<div id="box" style="width: 100px; height: 100px; background: red;"></div>\n<script>\n  const box = document.querySelector("#box");\n  box.style.background = "blue";\n  box.style.width = "200px";\n</script>',
        challenge: 'Select the #box element using querySelector, then change its background to "blue" and its width to "200px".',
        type: 'js'
      },
      {
        id: 'j4',
        title: 'Asynchronous JavaScript',
        description: 'Learn how to handle tasks that take time, like fetching data.',
        content: 'JavaScript is single-threaded, but it can handle asynchronous tasks using [Promises](term:An object representing the eventual completion or failure of an asynchronous operation) and [async/await](term:Syntactic sugar for working with Promises in a more synchronous-looking way). This is essential for talking to APIs or loading data without freezing the page.',
        initialCode: '<script>\n  // 1. Create an async function called "fetchData"\n  // 2. Inside, use "await" with a Promise that resolves after 1 second\n  // 3. Log "Data loaded!" to the console\n  \n  async function fetchData() {\n    console.log("Loading...");\n    // Wait here for 1 second\n    \n    console.log("Data loaded!");\n  }\n  \n  fetchData();\n</script>',
        solution: '<script>\n  async function fetchData() {\n    console.log("Loading...");\n    await new Promise(resolve => setTimeout(resolve, 1000));\n    console.log("Data loaded!");\n  }\n  \n  fetchData();\n</script>',
        challenge: 'Create an async function that waits for 1 second using a Promise and then logs "Data loaded!".',
        type: 'js',
        isComplex: true,
        videoPrompt: 'A visual analogy of a busy restaurant. A waiter (JavaScript thread) takes a customer\'s order (async function call) and gives it to the kitchen (browser API). Instead of waiting and blocking the whole restaurant, the waiter serves other tables. When the food is ready (Promise resolves), the kitchen notifies the waiter, who then delivers the meal to the original customer. This demonstrates non-blocking operations. Then, transition to a factory conveyor belt analogy for the event loop. Tasks (functions) are placed on the belt (call stack). Long tasks (API calls) are moved to a separate area (Web APIs). When complete, they place a notification on a separate belt (callback queue). An inspector (event loop) constantly checks if the main belt is empty and, if so, moves the next notification from the callback queue to the main belt to be processed.'
      },
      {
        id: 'j5',
        title: 'Event Listeners',
        description: 'Learn how to respond to user actions like clicks.',
        content: '[Event Listeners](term:A function that waits for a specific event to occur on a target element) allow your code to react to user interactions. You can use [addEventListener](term:Sets up a function that will be called whenever the specified event is delivered to the target) to listen for events like \'click\'.',
        initialCode: '<button id="btn">Click Me!</button>\n<script>\n  const button = document.querySelector("#btn");\n  // Add a click event listener that alerts "Button Clicked!"\n</script>',
        solution: '<button id="btn">Click Me!</button>\n<script>\n  const button = document.querySelector("#btn");\n  button.addEventListener("click", () => {\n    alert("Button Clicked!");\n  });\n</script>',
        challenge: 'Add a "click" event listener to the button that shows an alert with the message "Button Clicked!".',
        type: 'js',
        isComplex: true,
        videoPrompt: 'A visual representation of an event listener. A button glows, and a "listener" ear icon waits nearby. When a mouse clicks the button, a lightning bolt connects them and triggers a popup.'
      },
      {
        id: 'j6',
        title: 'DOM Traversal',
        description: 'Navigate between parent and child elements.',
        content: '[DOM Traversal](term:The process of moving through the DOM tree to find related elements) lets you find elements based on their relationship to others. You can use properties like [.parentElement](term:Returns the DOM node\'s parent Element) and [.children](term:Returns a live HTMLCollection of the child elements of an element).\n\n### More Examples\n- `.nextElementSibling`: Selects the next sibling element.\n- `.previousElementSibling`: Selects the previous sibling element.\n- `.closest()`: Finds the nearest ancestor that matches a selector.',
        initialCode: '<div id="parent">\n  <p id="child">I am a child</p>\n</div>\n<script>\n  const child = document.querySelector("#child");\n  // 1. Get the parent element of the child\n  // 2. Change the parent\'s background to "yellow"\n</script>',
        solution: '<div id="parent">\n  <p id="child">I am a child</p>\n</div>\n<script>\n  const child = document.querySelector("#child");\n  const parent = child.parentElement;\n  parent.style.background = "yellow";\n</script>',
        challenge: 'Traverse the DOM: Get the parent element of #child and change its background color to "yellow".',
        type: 'js'
      },
      {
        id: 'j7',
        title: 'Array Methods: Map',
        description: 'Learn how to transform arrays with .map().',
        content: 'The [map()](term:Creates a new array populated with the results of calling a provided function on every element in the calling array) method is essential for modern JavaScript development, especially in React.',
        initialCode: '<script>\n  const numbers = [1, 2, 3, 4];\n  // 1. Use .map() to create a new array "doubled"\n  // 2. Each number should be multiplied by 2\n  console.log(doubled);\n</script>',
        solution: '<script>\n  const numbers = [1, 2, 3, 4];\n  const doubled = numbers.map(n => n * 2);\n  console.log(doubled);\n</script>',
        challenge: 'Use the .map() method to create a new array where each number in the "numbers" array is multiplied by 2.',
        type: 'js'
      },
      {
        id: 'j8',
        title: 'Array Methods: Filter',
        description: 'Learn how to filter arrays with .filter().',
        content: 'The [filter()](term:Creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function) method allows you to select specific items from an array based on a condition. It works by looping over each item in an array and running a test on it. If the test returns `true`, the item is included in the new array. If it returns `false`, the item is left out.\n\nFor example, you could use `.filter()` to find all the even numbers in an array of numbers, or all the people over a certain age in an array of objects.',
        initialCode: '<script>\n  const ages = [12, 18, 25, 30, 15];\n  // 1. Use .filter() to create a new array "adults"\n  // 2. Include only ages 18 and over\n  console.log(adults);\n</script>',
        solution: '<script>\n  const ages = [12, 18, 25, 30, 15];\n  const adults = ages.filter(age => age >= 18);\n  console.log(adults);\n</script>',
        challenge: 'Use the .filter() method to create a new array "adults" that only includes ages 18 and over.',
        type: 'js'
      },
      {
        id: 'j9',
        title: 'Working with Objects',
        description: 'Understand how to access and modify object properties.',
        content: 'Objects are a fundamental part of JavaScript, used to store collections of data as key-value pairs. Think of them like a dictionary where you have a word (the key) and its definition (the value).\n\nYou can access properties using **dot notation** (e.g., `person.name`) when the key is a valid identifier, or **bracket notation** (e.g., `person[\'name\']`) when the key is a variable or contains special characters. You can also add, change, or remove properties after an object has been created.',
        initialCode: '<script>\n  const person = { name: "Alex", age: 30 };\n  // 1. Access the "name" property and log it to the console\n  // 2. Change the "age" property to 31\n  console.log(person.age);\n</script>',
        solution: '<script>\n  const person = { name: "Alex", age: 30 };\n  console.log(person.name);\n  person.age = 31;\n  console.log(person.age);\n</script>',
        challenge: 'Access the "name" property of the person object, then update the "age" property to 31.',
        type: 'js'
      },
      {
        id: 'j10',
        title: 'Fetching Data with Fetch',
        description: 'Learn how to make API requests to get data from a server.',
        content: 'The [fetch()](term:A modern JavaScript API for making network requests) function is the modern way to make network requests in the browser. It\'s a powerful tool for getting data from an API, which is a common task in web development.\n\nBecause network requests can take time, `fetch()` is **asynchronous**. It returns a [Promise](term:An object representing the eventual completion or failure of an asynchronous operation), which is like a placeholder for a value that will be available later. You use the `.then()` method to handle the successful response (or `.catch()` to handle errors).',
        initialCode: '<div id="output"></div>\n<script>\n  // 1. Use fetch() to get data from "https://jsonplaceholder.typicode.com/posts/1"\n  // 2. Parse the response as JSON\n  // 3. Get the element with id "output"\n  // 4. Set its innerText to the post title\n</script>',
        solution: '<div id="output"></div>\n<script>\n  fetch("https://jsonplaceholder.typicode.com/posts/1")\n    .then(response => response.json())\n    .then(data => {\n      const output = document.getElementById("output");\n      output.innerText = data.title;\n    });\n</script>',
        challenge: 'Use fetch() to get data from the provided URL, parse it as JSON, and display the post title in the #output element.',
        type: 'js'
      },
      {
        id: 'j11',
        title: 'ES6+ Features: Destructuring',
        description: 'Learn how to extract data from arrays and objects easily.',
        content: '[Destructuring](term:A JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables) is a modern way to extract data.',
        initialCode: '<script>\n  const user = { name: "Alice", age: 25 };\n  // 1. Use destructuring to extract "name" and "age" from user\n  console.log(name, age);\n</script>',
        solution: '<script>\n  const user = { name: "Alice", age: 25 };\n  const { name, age } = user;\n  console.log(name, age);\n</script>',
        challenge: 'Use object destructuring to extract the "name" and "age" properties from the user object.',
        type: 'js'
      },
      {
        id: 'j12',
        title: 'LocalStorage',
        description: 'Learn how to save data in the browser.',
        content: '[LocalStorage](term:A web storage object that allows you to store data across browser sessions) is perfect for saving user preferences or simple app state.',
        initialCode: '<script>\n  // 1. Save "theme" as "dark" in localStorage\n  // 2. Retrieve it and log it to the console\n</script>',
        solution: '<script>\n  localStorage.setItem("theme", "dark");\n  console.log(localStorage.getItem("theme"));\n</script>',
        challenge: 'Save the key "theme" with the value "dark" to localStorage, then retrieve it and log it.',
        type: 'js'
      },
      {
        id: 'j13',
        title: 'Error Handling: Try/Catch',
        description: 'Learn how to handle errors gracefully.',
        content: '[Try/Catch](term:A block of code used to handle errors that might occur during execution) prevents your whole app from crashing when something goes wrong.',
        initialCode: '<script>\n  try {\n    // 1. Call a function that doesn\'t exist (e.g., nonExistentFunction())\n  } catch (error) {\n    // 2. Log "Error caught!" to the console\n  }\n</script>',
        solution: '<script>\n  try {\n    nonExistentFunction();\n  } catch (error) {\n    console.log("Error caught!");\n  }\n</script>',
        challenge: 'Use a try/catch block to catch an error caused by calling a non-existent function.',
        type: 'js'
      },
      {
        id: 'j14',
        title: 'ES Modules',
        description: 'Learn how to organize code into reusable files.',
        content: '[ES Modules](term:The official standard for organizing JavaScript code into reusable files) use `export` to share code and `import` to use it.',
        initialCode: '<script type="module">\n  // 1. Export a constant named "GREETING" with value "Hello"\n  // 2. (Simulated) Imagine importing it in another file\n  export const GREETING = "Hello";\n</script>',
        solution: '<script type="module">\n  export const GREETING = "Hello";\n</script>',
        challenge: 'Export a constant named "GREETING" from a module script.',
        type: 'js'
      },
      {
        id: 'j15',
        title: 'Classes and Prototypes',
        description: 'Learn Object-Oriented Programming in JavaScript.',
        content: '[Classes](term:A template for creating objects) provide a much cleaner and clearer syntax to create objects and deal with inheritance.',
        initialCode: '<script>\n  class Animal {\n    constructor(name) {\n      this.name = name;\n    }\n    speak() {\n      console.log(`${this.name} makes a noise.`);\n    }\n  }\n  // 1. Create a class "Dog" that extends "Animal"\n  // 2. Add a speak() method that logs "Bark!"\n</script>',
        solution: '<script>\n  class Animal {\n    constructor(name) {\n      this.name = name;\n    }\n    speak() {\n      console.log(`${this.name} makes a noise.`);\n    }\n  }\n  class Dog extends Animal {\n    speak() {\n      console.log(`${this.name} barks!`);\n    }\n  }\n  const d = new Dog("Rex");\n  d.speak();\n</script>',
        challenge: 'Create a Dog class that extends Animal and overrides the speak method.',
        type: 'js'
      },
      {
        id: 'j16',
        title: 'Regular Expressions',
        description: 'Learn how to search and manipulate text with patterns.',
        content: '[Regular Expressions](term:Patterns used to match character combinations in strings) are powerful tools for text processing.',
        initialCode: '<script>\n  const emailPattern = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;\n  const testEmail = "test@example.com";\n  // Use emailPattern.test(testEmail) to check if it matches\n</script>',
        solution: '<script>\n  const emailPattern = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;\n  const testEmail = "test@example.com";\n  const isValid = emailPattern.test(testEmail);\n  console.log(isValid);\n</script>',
        challenge: 'Use the .test() method of the regular expression to validate the email string.',
        type: 'js'
      }
    ]
  },
  {
    id: 'm5',
    title: 'React Basics',
    level: 'Advanced',
    exam: MODULE_EXAMS.m5,
    lessons: [
      {
        id: 'r1',
        title: 'Components and Props',
        description: 'The building blocks of React.',
        content: 'React uses [components](term:Independent and reusable bits of code that serve the same purpose as JavaScript functions, but work in isolation and return HTML) to build UIs. [Props](term:Short for properties, they are used to pass data from one component to another) are like arguments for components.',
        initialCode: '<!-- In this environment, we simulate React with simple HTML/JS for basics -->\n<div id="root"></div>\n<script>\n  function Welcome(props) {\n    return `<h1>Hello, ${props.name}</h1>`;\n  }\n  document.getElementById("root").innerHTML = Welcome({ name: "Student" });\n</script>',
        solution: '<div id="root"></div>\n<script>\n  function Welcome(props) {\n    return `<h1>Hello, ${props.name}</h1>`;\n  }\n  document.getElementById("root").innerHTML = Welcome({ name: "Student" });\n</script>',
        challenge: 'Create a Welcome component that accepts a "name" prop and returns a greeting string.',
        type: 'html',
        isComplex: true,
        videoPrompt: 'A Lego-like animation where small blocks (components) are snapped together to build a larger structure. Data (props) flows like electricity from the main block into the smaller ones.'
      },
      {
        id: 'r2',
        title: 'The useState Hook',
        description: 'Learn how to manage state in functional components.',
        content: '[State](term:An object that holds some information that may change over the lifetime of the component) is how React components remember things. The [useState](term:A React Hook that lets you add a state variable to your component) hook is the most common way to add state.',
        initialCode: '<div id="root"></div>\n<script>\n  // Simulating state in vanilla JS for the basics\n  let count = 0;\n  function update() {\n    document.getElementById("root").innerHTML = `\n      <p>Count: ${count}</p>\n      <button onclick="increment()">Increment</button>\n    `;\n  }\n  window.increment = () => {\n    count++;\n    update();\n  };\n  update();\n</script>',
        solution: '<div id="root"></div>\n<script>\n  let count = 0;\n  function update() {\n    document.getElementById("root").innerHTML = `\n      <p>Count: ${count}</p>\n      <button onclick="increment()">Increment</button>\n    `;\n  }\n  window.increment = () => {\n    count++;\n    update();\n  };\n  update();\n</script>',
        challenge: 'Simulate state: Create a counter that increments when a button is clicked and updates the UI.',
        type: 'html'
      },
      {
        id: 'r3',
        title: 'The useEffect Hook',
        description: 'Handle side effects in your components.',
        content: '[useEffect](term:A React Hook that lets you perform side effects in functional components) is used for things like fetching data, setting up subscriptions, or manually changing the DOM.',
        initialCode: '<div id="root"></div>\n<script>\n  // Simulating useEffect: a function that runs after "render"\n  function useEffect(callback) {\n    setTimeout(callback, 0);\n  }\n  \n  useEffect(() => {\n    console.log("Component mounted!");\n  });\n</script>',
        solution: '<div id="root"></div>\n<script>\n  function useEffect(callback) {\n    setTimeout(callback, 0);\n  }\n  \n  useEffect(() => {\n    console.log("Component mounted!");\n  });\n</script>',
        challenge: 'Simulate useEffect: Log "Component mounted!" to the console using a simulated effect function.',
        type: 'html'
      },
      {
        id: 'r4',
        title: 'Handling Forms in React',
        description: 'Learn about controlled components.',
        content: 'In React, [controlled components](term:Components where form data is handled by the component state) are the standard way to handle forms. Every input value is tied to a state variable.',
        initialCode: '<div id="root"></div>\n<script>\n  let text = "";\n  function render() {\n    document.getElementById("root").innerHTML = `\n      <input type="text" value="${text}" oninput="handleChange(event)">\n      <p>You typed: ${text}</p>\n    `;\n  }\n  window.handleChange = (e) => {\n    text = e.target.value;\n    render();\n  };\n  render();\n</script>',
        solution: '<div id="root"></div>\n<script>\n  let text = "";\n  function render() {\n    document.getElementById("root").innerHTML = `\n      <input type="text" value="${text}" oninput="handleChange(event)">\n      <p>You typed: ${text}</p>\n    `;\n  }\n  window.handleChange = (e) => {\n    text = e.target.value;\n    render();\n  };\n  render();\n</script>',
        challenge: 'Simulate a controlled input: Update the "text" state on every input change and re-render the UI.',
        type: 'html'
      },
      {
        id: 'r5',
        title: 'Conditional Rendering',
        description: 'Learn how to show or hide elements based on state.',
        content: 'In React, you can use JavaScript operators like `if` or the ternary operator `? :` to create elements representing the current state.',
        initialCode: '<div id="root"></div>\n<script>\n  let isLoggedIn = false;\n  function render() {\n    document.getElementById("root").innerHTML = `\n      <div>\n        ${isLoggedIn ? "<h1>Welcome Back!</h1>" : "<h1>Please Log In</h1>"}\n        <button onclick="toggle()">${isLoggedIn ? "Logout" : "Login"}</button>\n      </div>\n    `;\n  }\n  window.toggle = () => {\n    isLoggedIn = !isLoggedIn;\n    render();\n  };\n  render();\n</script>',
        solution: '<div id="root"></div>\n<script>\n  let isLoggedIn = false;\n  function render() {\n    document.getElementById("root").innerHTML = `\n      <div>\n        ${isLoggedIn ? "<h1>Welcome Back!</h1>" : "<h1>Please Log In</h1>"}\n        <button onclick="toggle()">${isLoggedIn ? "Logout" : "Login"}</button>\n      </div>\n    `;\n  }\n  window.toggle = () => {\n    isLoggedIn = !isLoggedIn;\n    render();\n  };\n  render();\n</script>',
        challenge: 'Simulate conditional rendering: Toggle the "isLoggedIn" state and update the UI to show different messages.',
        type: 'html'
      },
      {
        id: 'r6',
        title: 'Lists and Keys',
        description: 'Learn how to render multiple components from an array.',
        content: 'When rendering lists in React, you use the `.map()` method. Each item in the list needs a unique `key` prop to help React identify which items have changed, been added, or been removed.',
        initialCode: '<div id="root"></div>\n<script>\n  const items = ["Apple", "Banana", "Orange"];\n  function render() {\n    const listItems = items.map(item => `<li>${item}</li>`).join("");\n    document.getElementById("root").innerHTML = `<ul>${listItems}</ul>`;\n  }\n  render();\n</script>',
        solution: '<div id="root"></div>\n<script>\n  const items = ["Apple", "Banana", "Orange"];\n  function render() {\n    const listItems = items.map(item => `<li>${item}</li>`).join("");\n    document.getElementById("root").innerHTML = `<ul>${listItems}</ul>`;\n  }\n  render();\n</script>',
        challenge: 'Simulate list rendering: Use .map() to transform the "items" array into a string of <li> elements and display them.',
        type: 'html'
      },
      {
        id: 'r7',
        title: 'Context API',
        description: 'Learn how to share state globally without prop drilling.',
        content: '[Context](term:A way to pass data through the component tree without having to pass props down manually at every level) is ideal for global data like themes or user info.',
        initialCode: '<script>\n  // 1. Create a Context (simulated)\n  // 2. Provide a value "dark"\n  const ThemeContext = { value: "dark" };\n  console.log(ThemeContext.value);\n</script>',
        solution: '<script>\n  const ThemeContext = { value: "dark" };\n  console.log(ThemeContext.value);\n</script>',
        challenge: 'Simulate creating a context with a value of "dark".',
        type: 'js'
      },
      {
        id: 'r8',
        title: 'React Router',
        description: 'Learn how to handle navigation in a Single Page Application.',
        content: '[React Router](term:The standard routing library for React) allows you to handle navigation without refreshing the page.',
        initialCode: '<script>\n  // Simulated routing logic\n  const routes = {\n    "/": "Home Page",\n    "/about": "About Page"\n  };\n  function navigate(path) {\n    console.log("Navigating to:", routes[path]);\n  }\n  navigate("/about");\n</script>',
        solution: '<script>\n  const routes = {\n    "/": "Home Page",\n    "/about": "About Page"\n  };\n  function navigate(path) {\n    console.log("Navigating to:", routes[path]);\n  }\n  navigate("/about");\n</script>',
        challenge: 'Simulate a simple router that logs the page name based on a path.',
        type: 'js'
      }
    ]
  },
  {
    id: 'm6',
    title: 'Backend & Databases',
    level: 'Advanced',
    exam: MODULE_EXAMS.m6,
    lessons: [
      {
        id: 'b1',
        title: 'What is a Backend?',
        description: 'Understand the server-side of web development.',
        content: 'The [Backend](term:The part of a website that users don\'t see, responsible for data storage and business logic) is where the "magic" happens. It handles database connections, user authentication, and complex calculations.',
        initialCode: '<script>\n  // Conceptual: Imagine a server responding to a request\n  function handleRequest(url) {\n    if (url === "/api/data") {\n      return { status: 200, data: "Hello from Backend!" };\n    }\n  }\n  console.log(handleRequest("/api/data"));\n</script>',
        solution: '<script>\n  function handleRequest(url) {\n    if (url === "/api/data") {\n      return { status: 200, data: "Hello from Backend!" };\n    }\n  }\n  console.log(handleRequest("/api/data"));\n</script>',
        challenge: 'Simulate a simple backend request handler that returns a status and data.',
        type: 'js'
      },
      {
        id: 'b2',
        title: 'Introduction to Node.js',
        description: 'Learn how to run JavaScript on the server.',
        content: '[Node.js](term:A JavaScript runtime built on Chrome\'s V8 JavaScript engine) allows you to use JavaScript outside of the browser, enabling you to build scalable network applications.',
        initialCode: '<script>\n  // Conceptual: Node.js uses "require" or "import" for modules\n  // const fs = require("fs");\n  console.log("Node.js is running!");\n</script>',
        solution: '<script>\n  console.log("Node.js is running!");\n</script>',
        challenge: 'Log "Node.js is running!" to simulate a Node.js script.',
        type: 'js'
      },
      {
        id: 'b3',
        title: 'REST APIs and HTTP Methods',
        description: 'Learn how systems communicate over the web.',
        content: '[REST](term:Representational State Transfer - an architectural style for providing standards between computer systems on the web) uses HTTP methods like [GET](term:Retrieve data), [POST](term:Create data), [PUT](term:Update data), and [DELETE](term:Remove data).',
        initialCode: '<script>\n  const api = {\n    get: () => console.log("Fetching data..."),\n    post: (data) => console.log("Creating:", data)\n  };\n  // 1. Call api.get()\n  // 2. Call api.post() with "New Item"\n</script>',
        solution: '<script>\n  const api = {\n    get: () => console.log("Fetching data..."),\n    post: (data) => console.log("Creating:", data)\n  };\n  api.get();\n  api.post("New Item");\n</script>',
        challenge: 'Simulate calling GET and POST methods on a mock API object.',
        type: 'js'
      },
      {
        id: 'b4',
        title: 'SQL vs NoSQL',
        description: 'Understand the two main types of databases.',
        content: '[SQL](term:Structured Query Language - used for relational databases) databases like PostgreSQL use tables. [NoSQL](term:Non-relational databases) databases like MongoDB use document-based storage.',
        initialCode: '<script>\n  // Conceptual: SQL Query\n  const sqlQuery = "SELECT * FROM users WHERE id = 1";\n  // Conceptual: NoSQL Query\n  const nosqlQuery = "db.users.find({ id: 1 })";\n  console.log("SQL:", sqlQuery);\n  console.log("NoSQL:", nosqlQuery);\n</script>',
        solution: '<script>\n  const sqlQuery = "SELECT * FROM users WHERE id = 1";\n  const nosqlQuery = "db.users.find({ id: 1 })";\n  console.log("SQL:", sqlQuery);\n  console.log("NoSQL:", nosqlQuery);\n</script>',
        challenge: 'Log both a mock SQL query and a mock NoSQL query to the console.',
        type: 'js'
      },
      {
        id: 'b5',
        title: 'Authentication Basics',
        description: 'Learn how to secure your application.',
        content: '[Authentication](term:The process of verifying who a user is) often involves [JWT](term:JSON Web Token - a compact, URL-safe means of representing claims to be transferred between two parties) which are used to securely transmit information.',
        initialCode: '<script>\n  const user = { id: 123, username: "dev" };\n  // Simulated token generation\n  const token = btoa(JSON.stringify(user));\n  console.log("Token:", token);\n</script>',
        solution: '<script>\n  const user = { id: 123, username: "dev" };\n  const token = btoa(JSON.stringify(user));\n  console.log("Token:", token);\n</script>',
        challenge: 'Simulate generating a simple token by base64 encoding a user object.',
        type: 'js'
      }
    ]
  }
];
