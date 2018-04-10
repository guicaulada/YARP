# Coding Conventions

## JavaScript

### Language

#### Strict Mode

  - The first line of every file should be `'use strict';`.
  - The strict mode directive should be followed by the documentation of the file and a blank line.
  ```javascript
  'use strict';
  /**
  * @file Checkpoint events
  */
  
  // Right
  console.log('even when not required');

  // Wrong
  'use strict';
  console.log('even when not required')

  // Also wrong
  'use strict';
  /**
  * @file Checkpoint events
  */
  console.log('even when not required')
  ```

#### Semicolon

  - Always end statements with `;`
  ```javascript
  // Right
  console.log('even when not required');

  // Wrong
  console.log('even when not required')
  ```

#### Variable declarations

  - Any variable that is only assigned once should be defined using `const`.
  - Any variable that is assigned multiple times should be defined using `let`.
  - Variables should not be declared using `var`.
  - Declare on first use, not at top of function.
  - Do not chain declarations unless inside `for` parentheses (repeat `const` or `let` for each variable in a separate statement)
  - Give descriptive names
    - Do not use similar names or synonyms for different variables unless following a convention
    - `for...in` iterators should use descriptive names
    - `for` iterators should use single character names
    - Use combination of plural for array and singular for each item in the array
  - Use camelCase, never underscores
  - Avoid using numbered variables (e.g. i1, i2, i3)

#### Scope

  - No implicit or single statement scopes
  - All scopes must be wrapped in `{}` unless you have a really good reason not to.
  ```javascript
  // Right

  if (condition) {
      return;
  }

  // Wrong

  if (condition) return;

  if (condition)
      return;
  ```

#### For loops

  - Iterator variable should be declared inside the `for` parentheses, unless already defined
  - Iterator variables should be named `i` if possible. Nested `for` loops use `j`, `k`, etc.
  - Use `for` with arrays, `for...in` for objects.

  ```javascript
  // Right

  const name = 'john';

  for (let i = 0; i < name.length; ++i) {
      console.log(name[i]);
  }

  // Wrong

  let position;
  const name = 'john' ;
  const len = name.length;

  for (position = 0; position < len; position++) {
      console.log(name[position]) ;
  }
  ```

#### Prototype members

  - Prefix persistent members with `_`
  ```javascript
  class Hotkeys{
    constructor() {
      this._key = id._key || key || 'NONE'; // Persists to the database
      this.args = {}; // Doesn't persist
    }
  }
  ```

#### Function declaration

  - Declare functions via assignment
  - Arrow function arguments must be enclosed in parentheses
  - Arrow function bodies must be enclosed in curly braces
  ``` javascript
  // Right

  const method = function () {

  };

  const arrow = (foo) => {

      return bar;
  };

  // Wrong

  function method() {

  }

  const arrow = foo => bar;
  ```

#### Enforcing new on Constructor

  - You can use `this instanceof` to check if a constructor function was called with new. (This allows for future prototypical inheritance and abstract classes.)

  ```javascript
  class GMObject{
    constructor() {
      if (this.constructor === GMObject) {
        throw new TypeError('Abstract class GMObject cannot be instantiated directly.');
      }
    }
  }
  ```

### Style

#### Whitespace

  - Always spaces, never tabs
  - 2 spaces indents
  - No trailing whitespace at end-of-line

  ```javascript
  // Right

  if (test) {
      if (value === 12) {
          console.log('result');
      }
  }

  // Wrong

  if (test) {
    if (value === 12) {
      console.log('result');
    }
  }
  ```

#### String literals

  - Always `'` never `"` and ``` ` ``` only for data
  ```javascript
  // Right
  const string = 'text in single quotes';
  
  // Also right
  const quotes = 'quotes';
  const string = `text in data ${quotes}`;

  // Wrong
  const string = "text in single quotes";
  ```

#### Newlines

  - all files need to end with a newline (or more accurately end of line).  IDEs will often do a line separator instead.  This is to ensure it is unix friendly.  The "cat" command is a good example of seeing this behavior.  Git does a good job of pointing these out when doing pull requests.  

  - One empty lines between functions (end of function to comment about next function)
  ```javascript
  function () {

      // Some code
  };
                                                              // 1
  /**
   * jsDoc comment
   */
  function () {

      //Some code
  };
  ```

  - Newline after `{` except for inlined or empty objects
    - Inline an object when it improves readability and unlikely to change often
    - No inline object in assignment unless empty

  ```javascript
  // Right

  if (condition) {
      execute(value, { strict: true });
  }

  if (condition) {
      const options = {
          strict: true
      };
      execute(value, options);
  }

  const empty = {};

  // Wrong

  if (condition) { execute(value, { strict: true }); }

  if (condition) {
      const options = { strict: true };
      execute(value, options);
  }

  const empty = {
  };
  ```

  - Newline after `}`
    - Only exception is when followed by `,`, `;`, `);` which must be followed by a newline (not a necesarily a blank line)
    - Except before `else`, `catch`, etc.
    - It's recommended to have a blank line after `}` if not last statement in scope

  ```javascript
  // Right

  if (condition) {
      value = {
          func: () => {

              console.log('example');
          },
          message: 'hello'
      };
      
      execute(value, (err) => {
          console.log(err);
      });
  } else {
      console.log('otherwise');
  }

  // Wrong

  if (condition) {
      value = {
          func: () => {
              console.log('example');
          }, message: 'hello'
      };
      execute(value, (err) => {
          console.log(err); }
      );
  } 
  else {
      console.log('otherwise');
  }
  ```

  - Empty line after `{`
    - Following a multi-line condition
    - In function scope declarations
    - In arrow function declarations using curly braces

  ```javascript
  // Right

  function () {

      if (condition) {
          if (otherCondition) {
              console.log('sometimes');
          }

          if (result &&
              result.statusCode === 200) {

              console.log('special case');
          }

          console.log('always');
      }

      execute(123, (err) => {

          console.log(err);
      });

      const empty = {};
  };

  // Wrong

  function () {
        if (condition) {

          if (otherCondition) {

              console.log('sometimes');
          }

          if (result &&
              result.statusCode === 200) {
              console.log('special case');
          }

          console.log('always');
      }

      execute(123, (err) => {
          console.log(err);
      });

      const empty = {
      };
  };
  ```

  - No empty line before end of scope
  ```javascript
  // Right

  if (condition) {
      if (otherCondition) {
          console.log('done');
      }
  }

  // Wrong

  if (condition) {
      if (otherCondition) {
          console.log('done');

      }

  }
  ```

#### Spaces

  - Use one and only one space (when required)
  ```javascript
  // Right
  const value = calculate(1, 3);

  // Wrong
  const  value =  calculate(1,  3);
  ```

  - One space between function and `(` when declaring a function
  ```javascript
  // Right

  const example = function () {

      return value;
  };

  // Wrong

  const example = function() {

      return value;
  };
  ```

  - No space between function name and `(` when invoking a function
  ```javascript
  // Right

  const key = example();

  // Wrong

  const key = example ();
  ```

  - No space after `(` or before `)`
   ```javascript
  // Right

  execute('order', 34);

  if (result === 'ok') {
      console.log('success');
  }

  // Wrong

  execute( 'order', 34 );

  if ( result === 'ok' ) {
      console.log( 'success' );
  }
  ```

  - No space before object key `:`, always after object key `:`
  ```javascript
  // Right

  const obj = {
      a: 1,
      b: 2,
      c: 3
  };

  // Wrong

  const obj = {
      a : 1,
      b :2,
      c:3
  };
  ```

  - No space before `;`, always after `;` if not end-of-line
  ```javascript
  // Right

  const name = 'john';

  for (let i = 0; i < name.length; ++i) {
      console.log(name[i]);
  }

  // Wrong

  const name = 'john' ;

  for (let i = 0;i < name.length ;++i) {
      console.log(name[i]) ;
  }
  ```

  - Always space after reserved keywords (`if`, `else`, `for`, `return`, `function`, etc.)
  ```javascript
  // Right

  for (let book in books) {
      if (books.hasOwnProperty(book)) {
          console.log(book.name);
      }
  }

  // Wrong

  for(let book in books) {
      if(books.hasOwnProperty(book)) {
          console.log(book.name);
      }
  }
  ```

  - Always space after `{` and before `}` in inlined object
    - No space for empty objects `{}`
    - One space for empty functions `{ }`

  ```javascript
  // Right

  execute({ name: 'john', email: 'john@example.com' });
  const empty = {};
  const callback = () => { };

  // Wrong

  execute({name: 'john', email: 'john@example.com'});
  const empty = {  };
  const callback = () => {};
  ```

  - No space after `[` and before `]` in inlined arrays
  ```javascript
  // Right
  const numbers = [1, 2, 3];

  // Wrong
  const numbers = [ 1, 2, 3 ];
  ```

  - Always space after `//`
  ```javascript
  // Right
  // Some comment

  // Wrong
  //Some comment
  ```

  - No space before `,`, always after `,` unless end-of-line
  ```javascript
  // Right

  const numbers = [1, 2, 3];
  execute({ name: 'john', email: 'john@example.com' });

  for (let i = 0; i < name.length; ++i) {
      console.log(name[i]);
  }

  // Wrong

  const numbers = [1,2 ,3];
  execute({ name: 'john',email: 'john@example.com' });

  // This for loop violates the style guide, but illustrates incorrect spacing around a comma
  for (let i = 0,il = name.length; i < il; ++i) {
      console.log(name[i]);
  }
  ```

  - Always space before and after operators, unless following an indent or end-of-line

  ```javascript
  // Right

  const a = 1 + 3;
  const b = 'john' +
          ' ' +
          'doe';

  // Wrong

  const a=1+3;
  const b='john'+
        ' '+
        'doe';
  ```

#### Commas

  - Never begin a line with `,` (always at the end of the previous line)
  ```javascript
  // Right
  execute('some error message',
          12345,
          this);

  // Wrong
  execute('some error message'
          ,12345
          ,this);
  ```

#### Operators

  - Never begin a line with an operator (always at the end of the previous line)
  ```javascript
  // Right

  const message = 'Hello ' +
                'Steve, ' +
                'How are you?';

  if (value === 'hello' &&
      result === 'ok') {

      console.log('yes');
  }

  // Wrong

  const message = 'Hello '
                + 'Steve, '
                + 'How are you?';

  if (value === 'hello'
      && result === 'ok') {

      console.log('yes');
  }
  ```

#### Comments

  - Always use `//` unless it's a jsDoc declaration or license header
  - Always begin sentences with an upper case
  - No trailing `.` unless comment contains multiple sentences
  - Formal style, consistent voice, no humor, present tense
  - No developer name or other personal notes
  - No TODOs

  - Line
    - Provides narrative for the following single code line (or single statement broken for readability)
    - One line of comment only
    - One empty line before and none after the comment line
    - No empty line before when following `{` unless other rules require it

  ```javascript
  function execute() {

      // Initialize state
      const position = 0;

      if (condition) {
          // Return message
          return 'hello';
      }
  }
  ```

  - Segment
    - Provides narrative for the following code section (one or more lines of code, with or without line breaks)
    - One or more lines of comments
    - One empty line before and one after comments block

  ```javascript
  function execute() {

      // Print each book's name

      for (let book in books) {

          // Check for valid properties

          if (books.hasOwnProperty(book)) {
              console.log(book.name);
          }
      }
  }
  ```

  - Note
    - Explains the behaviour of a single code statement (can be broken into multiple lines)
    - Used to document unexpected behaviour or non-standard practice
    - Appears immediately at the end of the line (or statement) it describes, following whitespace to separate it from code block

  ```javascript
  function execute(value) {

      if (value !== null &&
          value !== undefined) {      // Explicit check as 'value' can be 0

          console.log(value);
      }
  }
  ```

#### Multi-line statements

  - Statements should only be broken into multiple lines to improve readability
  - Break statements if they are longer than 150 characters long
  - No empty lines in the middle of a single statement
  - Indent multi-line statements

  - Conditions should be indented to the first character of the condition in the first line

  ```javascript
  if (result &&
      result.status &&
      result.status.statusCode === 200) {

      console.log('success');
  }
  ```

  - Variable should be indented to the first character of the value in the first line
  ```javascript
  const message = 'hello' +
                  ' and welcome';
  ```
  
### Variable names

  - `err` is reserved for errors received via promises. Use `error` for local function variables
  - `yarp` is reserved for global variables. Don't use it.

### Callback

  - Use promises. Don't use callbacks.

### Promises

  - Public interfaces should (not must) return a promise
