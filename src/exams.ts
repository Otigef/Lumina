import { Exam } from './types';

export const MODULE_EXAMS: Record<string, Exam> = {
  m1: {
    id: 'e1',
    title: 'HTML Fundamentals Exam',
    questions: [
      {
        id: 'q1_1',
        question: 'What does HTML stand for?',
        options: [
          'HyperText Markup Language',
          'HighText Machine Language',
          'HyperText Modern Language',
          'Hyperlink and Text Markup Language'
        ],
        correctAnswer: 0
      },
      {
        id: 'q1_2',
        question: 'Which tag is used for the largest heading?',
        options: ['<h6>', '<head>', '<h1>', '<heading>'],
        correctAnswer: 2
      },
      {
        id: 'q1_3',
        question: 'What is the correct tag for a line break?',
        options: ['<lb>', '<break>', '<br>', '<hr>'],
        correctAnswer: 2
      },
      {
        id: 'q1_4',
        question: 'Which attribute is used to provide an alternative text for an image?',
        options: ['title', 'alt', 'src', 'longdesc'],
        correctAnswer: 1
      },
      {
        id: 'q1_5',
        question: 'What is the correct HTML for creating a hyperlink?',
        options: [
          '<a url="http://google.com">Google</a>',
          '<a>http://google.com</a>',
          '<a href="http://google.com">Google</a>',
          '<link rel="http://google.com">Google</link>'
        ],
        correctAnswer: 2
      },
      {
        id: 'q1_6',
        question: 'What does the ARIA "role" attribute do?',
        options: [
          'It defines the color of an element',
          'It tells screen readers what an element does (e.g., "button")',
          'It sets the font size',
          'It creates a link to another page'
        ],
        correctAnswer: 1
      },
      {
        id: 'q1_7',
        question: 'Where do <meta> tags belong in an HTML document?',
        options: ['Inside <body>', 'Inside <head>', 'After </html>', 'Inside <footer>'],
        correctAnswer: 1
      }
    ]
  },
  m2: {
    id: 'e2',
    title: 'CSS Styling Basics Exam',
    questions: [
      {
        id: 'q2_1',
        question: 'What does CSS stand for?',
        options: [
          'Colorful Style Sheets',
          'Cascading Style Sheets',
          'Computer Style Sheets',
          'Creative Style Sheets'
        ],
        correctAnswer: 1
      },
      {
        id: 'q2_2',
        question: 'Which CSS property is used to change the text color of an element?',
        options: ['fgcolor', 'text-color', 'color', 'font-color'],
        correctAnswer: 2
      },
      {
        id: 'q2_3',
        question: 'Which property is used to change the background color?',
        options: ['color', 'bgcolor', 'background-color', 'background'],
        correctAnswer: 2
      },
      {
        id: 'q2_4',
        question: 'In the box model, which layer is between the border and the content?',
        options: ['Margin', 'Padding', 'Outline', 'Spacing'],
        correctAnswer: 1
      },
      {
        id: 'q2_5',
        question: 'Which selector has the highest specificity?',
        options: ['Element selector (e.g., div)', 'Class selector (e.g., .btn)', 'ID selector (e.g., #header)', 'Universal selector (*)'],
        correctAnswer: 2
      },
      {
        id: 'q2_6',
        question: 'Which keyword is used to define a CSS animation sequence?',
        options: ['@animation', '@keyframes', '@steps', '@sequence'],
        correctAnswer: 1
      },
      {
        id: 'q2_7',
        question: 'In BEM naming, what does the double underscore (__) represent?',
        options: ['A modifier', 'An element', 'A block', 'A state'],
        correctAnswer: 1
      }
    ]
  },
  m3: {
    id: 'e3',
    title: 'Modern Layouts Exam',
    questions: [
      {
        id: 'q3_1',
        question: 'Which property is used to enable Flexbox on a container?',
        options: ['display: flexbox', 'display: flex', 'layout: flex', 'flex: true'],
        correctAnswer: 1
      },
      {
        id: 'q3_2',
        question: 'In Flexbox, which property aligns items along the main axis?',
        options: ['align-items', 'justify-content', 'flex-direction', 'align-content'],
        correctAnswer: 1
      },
      {
        id: 'q3_3',
        question: 'Which CSS Grid property defines the columns of the grid?',
        options: ['grid-columns', 'grid-template-columns', 'columns', 'grid-layout-columns'],
        correctAnswer: 1
      },
      {
        id: 'q3_4',
        question: 'What does "1fr" mean in CSS Grid?',
        options: ['1 fixed row', '1 fraction of the available space', '1 full row', '1 font-relative unit'],
        correctAnswer: 1
      },
      {
        id: 'q3_5',
        question: 'Which property allows you to name grid areas?',
        options: ['grid-area-names', 'grid-template-areas', 'grid-names', 'grid-sections'],
        correctAnswer: 1
      },
      {
        id: 'q3_6',
        question: 'What does flex-grow: 1 do to a flex item?',
        options: [
          'It makes the item shrink',
          'It allows the item to grow and fill available space',
          'It sets the item to a fixed width',
          'It hides the item'
        ],
        correctAnswer: 1
      },
      {
        id: 'q3_7',
        question: 'Which function defines a size range for a grid column or row?',
        options: ['range()', 'size()', 'minmax()', 'limit()'],
        correctAnswer: 2
      }
    ]
  },
  m4: {
    id: 'e4',
    title: 'JavaScript: The Brains Exam',
    questions: [
      {
        id: 'q4_1',
        question: 'Which keyword is used to declare a variable that cannot be reassigned?',
        options: ['var', 'let', 'const', 'fixed'],
        correctAnswer: 2
      },
      {
        id: 'q4_2',
        question: 'How do you select an element with the ID "demo" in JavaScript?',
        options: [
          'document.getElement("demo")',
          'document.getElementById("demo")',
          'document.querySelector(".demo")',
          'document.find("#demo")'
        ],
        correctAnswer: 1
      },
      {
        id: 'q4_3',
        question: 'Which method is used to add an event listener to an element?',
        options: ['on()', 'listen()', 'addEventListener()', 'attachEvent()'],
        correctAnswer: 2
      },
      {
        id: 'q4_4',
        question: 'What does the .map() array method return?',
        options: [
          'The original array modified',
          'A single value (the sum)',
          'A new array with transformed elements',
          'A boolean indicating if all elements pass a test'
        ],
        correctAnswer: 2
      },
      {
        id: 'q4_5',
        question: 'Which keyword is used to wait for a Promise to resolve in an async function?',
        options: ['wait', 'hold', 'await', 'pause'],
        correctAnswer: 2
      },
      {
        id: 'q4_6',
        question: 'What is the result of: const { name } = { name: "Bob", age: 40 }?',
        options: [
          'name is an object',
          'name is equal to "Bob"',
          'An error is thrown',
          'name is undefined'
        ],
        correctAnswer: 1
      },
      {
        id: 'q4_7',
        question: 'Which block is used to handle exceptions in JavaScript?',
        options: ['if/else', 'switch/case', 'try/catch', 'while/do'],
        correctAnswer: 2
      }
    ]
  },
  m5: {
    id: 'e5',
    title: 'React Basics Exam',
    questions: [
      {
        id: 'q5_1',
        question: 'What are the building blocks of a React application?',
        options: ['Functions', 'Classes', 'Components', 'Templates'],
        correctAnswer: 2
      },
      {
        id: 'q5_2',
        question: 'How do you pass data from a parent component to a child component?',
        options: ['Using state', 'Using props', 'Using context', 'Using refs'],
        correctAnswer: 1
      },
      {
        id: 'q5_3',
        question: 'Which hook is used to add state to a functional component?',
        options: ['useEffect', 'useContext', 'useState', 'useReducer'],
        correctAnswer: 2
      },
      {
        id: 'q5_4',
        question: 'What is the correct syntax for the useState hook?',
        options: [
          'const [state, setState] = useState(initialValue)',
          'const state = useState(initialValue)',
          'const {state, setState} = useState(initialValue)',
          'const [setState, state] = useState(initialValue)'
        ],
        correctAnswer: 0
      },
      {
        id: 'q5_5',
        question: 'What does JSX stand for?',
        options: [
          'JavaScript XML',
          'JavaScript Extension',
          'JSON XML',
          'JavaScript Syntax'
        ],
        correctAnswer: 0
      },
      {
        id: 'q5_6',
        question: 'Which hook is used for side effects like fetching data?',
        options: ['useState', 'useMemo', 'useEffect', 'useCallback'],
        correctAnswer: 2
      },
      {
        id: 'q5_7',
        question: 'What is a "controlled component" in React?',
        options: [
          'A component that is not part of the DOM',
          'A component where form data is handled by React state',
          'A component that cannot be changed',
          'A component that uses external libraries'
        ],
        correctAnswer: 1
      },
      {
        id: 'q5_8',
        question: 'Why do you need a "key" prop when rendering a list of elements?',
        options: [
          'To set the color of the items',
          'To help React identify which items have changed, been added, or been removed',
          'To make the list searchable',
          'To define the order of the items'
        ],
        correctAnswer: 1
      }
    ]
  },
  m6: {
    id: 'e6',
    title: 'Backend & Databases Exam',
    questions: [
      {
        id: 'q6_1',
        question: 'What is the primary responsibility of a backend?',
        options: [
          'Designing the UI',
          'Handling user interactions in the browser',
          'Data storage and business logic',
          'Optimizing images for the web'
        ],
        correctAnswer: 2
      },
      {
        id: 'q6_2',
        question: 'What is Node.js?',
        options: [
          'A CSS framework',
          'A JavaScript runtime built on Chrome\'s V8 engine',
          'A type of database',
          'A browser extension'
        ],
        correctAnswer: 1
      },
      {
        id: 'q6_3',
        question: 'Which HTTP method is typically used to retrieve data from a server?',
        options: ['POST', 'PUT', 'GET', 'DELETE'],
        correctAnswer: 2
      },
      {
        id: 'q6_4',
        question: 'What does REST stand for?',
        options: [
          'Relational State Transfer',
          'Representational State Transfer',
          'Remote State Transfer',
          'Real-time State Transfer'
        ],
        correctAnswer: 1
      },
      {
        id: 'q6_5',
        question: 'Which type of database uses tables and SQL?',
        options: ['NoSQL', 'Relational', 'Document-based', 'Key-value'],
        correctAnswer: 1
      },
      {
        id: 'q6_6',
        question: 'What is JWT commonly used for?',
        options: [
          'Styling components',
          'Securely transmitting information for authentication',
          'Database indexing',
          'Frontend routing'
        ],
        correctAnswer: 1
      },
      {
        id: 'q6_7',
        question: 'Which HTTP method is used to create a new resource?',
        options: ['GET', 'POST', 'PATCH', 'HEAD'],
        correctAnswer: 1
      }
    ]
  }
};
