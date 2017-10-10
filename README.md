# Osme
Home of the Osme Programming Language.

## Introduction to the Project

This project is the birthplace of the programming language Osme (pronounced "awesome" or "oz-um"). This project contains the standards of the language and the 'compiler' (written in JS). Compiler is in quotes because the program's current goal is only to translate Osme into another langauge that is then compiled by a real compiler. The 'compiler', when finished, should double as a reasonably generic programming language translator with the ability to add new programming languages in a modular fashion.

The input modules consist of a set of regexes that interpret the input language. The output modules consist of a series of toString() functions that output the intermediate representation into the correct string output. The program will use these modules of regexes to read a programming language into a special JS object containing all relevent information about the structure of the program while the output modules will convert it to the output language. 

In this way the need to convert any specific language to another specific language is removed and each language will only need to describe it's own input and output.

## Tenets of Osme
* Readability and maintainability are the responsibility of the programmer 
* The rules of a programming language should at the very least be internally consistant 
* Mathematical operations should be easy and natural to write 
* Artificially limiting the syntax rules of the language is silly 

## Notes on Osme
* Not case sensitive 
* Arrays by default begin indexing at 1 
* Procedure level scoping 
* Matrices (2d arrays) are [col, row] for purposes of matrix math 

## Definitions of Concepts in Osme

Backus-Naur:
```
atom          ::= number | word
number        ::= (\d+(?:[\.][\d]*)?)(i)?
word          ::= [^"']\b([a-zA-Z_]\w*)\b
stringLiteral ::= (["'])[^\1]+?\1
```


### Atom
An atom is a singular unit of information being referenced via a name or literal representation of a native type 

#### Examples
* `real`  (reserved keyword for native type) 
* `x`     (variable name) 
* `Car_T` (type name) 
* `car`   (variable name) 
* `drive` (function name) 
* `574.0` (real literal) 
* `"cat"` (string literal) 
* `true`  (reserved keyword for a boolean value) 
* `/[a-z]/g` (regex literal)

### Expression
An expression is a series of one or more atoms modified by one or more operators 

#### Examples
* `x = y `
* `z = x + y `
* `b = (apple !== banana) `
* `pressure = calcPressure() ` 
* An if statement
```
if(a < b)
   ...
end if
```  

### Native Type
A native type is a basic variable type defined and contained within the programming language of Osme. These words are reserved keywords and are unable to be redefined throughout the execution of the program.

#### Comprehensive List

+ Number 
  * int | integer 
  * real 
  * imaginary 
+ String 
  * char | character 
  * regex | regularExpression 
+ Logical 
  * bool | boolean 

### Native Container|Compound Type
A native container type is a compound variable type defined and contained within the programming language of Osme. The defining characteristic difference from a basic variable type being that a compound variable type contains references to the basic types (and possibly other compound types and/or expressions) within its definition.

#### Comprehensive List

+ type
+ array
+ Procedure
  * fxn | function 
  * sub | subroutine 

### Native Operator
A native operator is a symbol (defined internal to the Osme language) that represents a procedure to act upon one or more atoms to either return a new atom or to modify one or more of the argument atoms

#### Mathematical Native Operator Comprehensive List
| Symbol        | Name                      | example usage   |
| ------------- |---------------------------|-----------------|
| =             | assignment                | a = b           |
| =>            | pointer assignment        | a => b          |
| \+            | addition                  | a \+ b          |
| \+\+          | simple increment          | a++             |
| \+=           | complex increment         | a += b          |
| \-            | addition                  | a -             |
| \-\-          | simple decrement          | a--             |
| \-=           | complex decrement         | a -= b          |
| \*            | multiplication            | a \* b          |
| \*=           | multiplicative assignment | a \*= b         |
| \/            | division                  | a / b           |
| \*=           | divisive assignment       | a /= b          |
| \*\*          | exponent                  | a \*\* b        |
| \/\/          | nth root                  | a \/\/ b        |
| %             | modulus                   | a % b           |
| ()            | parentheses               | a + (b - c)     |
| ~             | smart parse               | ~a              |
| ... [BY a]    | generated sequence        | a ... b by c    |

#### Comparison Native Operator Comprehensive List
| Symbol        | Name                      | example usage       |
| ------------- |---------------------------|---------------------|
| ==            | equivalence               | a == b              |
| !             | not                       | !a                  |
| =!=           | not equivalent            | a =!= b             |
| ~=            | truthy equivalence        | a ~= b              |
| <             | less than                 | a < b               |
| <=            | less than or equal to     | a <= b              |
| \>            | greater than              | a \> b              |
| \>=           | greater than or equal to  | a \>= b             |
| a?b:c         | ternary                   | e = (a < b) ? c : d |
| a<[=]b<[=]c   | between (less than)       | a < b <= c          |
| a>[=]b>[=]c   | between (greater than)    | a >= b > c          |
| ?:            | contained within          | a ?: b              |




### Syntax Operator
A syntax operator is a symbol and/or keyword defined internal to
the osme language that allows for readable grammar, templating, or other misc
uses

#### Comprehensive List
| Symbol        | Name                     | Notes           |
| ------------- |--------------------------|-----------------|
| \#            | inline comment           |                 |
| \#\*  \*\#    | multiline comment        |                 |
| []            | brackets                 | for array usage |
| {}            | brace                    | for expansion templating |
| &             | expansion and            | for expansion templating |
| \|            | expansion or             | for expansion templating |
| ,             | comma                    | for list separation |
| ;             | semi-colon               | for list separation |
| ""            | quotation marks          | for string literals |
| ''            | single quotation marks   | for string literals |
| $             | variable name escape     | for use within string literals|
| .             | concatentation           |                            |
| :             | field of                 |                            |
| ::            | instance of              | for use with declaring variables|

### Reserved Keyword
A reserved keyword is a word that has meaning internal to the language Osme
that is unable to be used in different context while writing in the language

#### Comprehensive List
* all internal types
* by "optional argument for the generated sequence operator" 
* do [while|until] "loop logic structure" 
* foreach "loop logic structure (tentative)"
* if/else if/else "conditional logic structure (if)" 
* select case "conditional logic structure (select)" 
* return 
* break 
* cycle 
* stop 
* error 
* new 
* module 
* use 
* true 
* false 
* in 
* out 
* inout 
* this "always refers to the encompassing scope (one level up from current)" 
* end "modifier to loop and conditional keywords to close them" 


## Declaration Syntax of Osme

type[, options]* :: name 

### Examples 
`real :: x        # x is declared as an instance of the real number type`  
`int[3] :: y      # y is declared as an instance of an array of length 3 of the integer type`  
`real[:] :: z     # z is declared as an instance of an array of variable length of the real number type`  
`Car_T :: car     # car is declared as an instance of the compound type Car_T (which happens to be an object)`  
`Drive_F :: drive # drive is declared as an instance of the compound type Drive_F (which happens to be an function)`  


## Definitions of Simple Types
### Number
regex: 
```javascript
/[<operators>\s]([\+-])?(?:(\d+(?:[\.][\d]*)?)|([\.][\d]+)|(\d+[\.]))(?:i(?:(\d+(?:[\.][\d]*)?)|([\.][\d]+)|(\d+[\.])))?(?=[<operators>\s])/g
```  

### Non-Imaginary Number
regex: 
```javascript
/\b(\d+(?:[\.][\d]*)?)\b/g
```  

### Integer
regex: 
```javascript
/[<operators>\s](\d+)(?![i\.])\b/g
```  

### Real
regex: 
```javascript
/()/g
```  

### Complex
regex: 
```javascript
/()/g
```  

### Character
regex: 
```javascript
/()/g
```  
### Regex
regex: 
```javascript
/()/g
```  

### Boolean
regex: 
```javascript
/()/g
```  

## Definitions of Container|Compound Types
### Type (object)
regex: 
```javascript
/type\s+(.+)([\s\S]*)end\s*type\s+(.*)/gmi
```

Example:

#define Car_T as a compound type (object) that has the following fields
contained within it: instances of real numbers named year, distance, and
speed; instance of integer named id; instance of a length 10 character array
named vin; instances of variable length character arrays named make and model;
an instance of the compound type Motor_T named motor; a function named
getYear; and an instance of the subroutine Drive_S named drive

```
type Car_T
  real :: year
  real :: distance, speed
  int  :: id
  char[10] :: vin
  char[:] :: make, model
  Motor_T :: motor

  Drive_S :: drive
  
  fxn getYear() return(year)
    year = this:year
  end fxn getYear

end type Car_T 
```

### Array

define x to be an array of integers that is length 5 and the values increment from 1 to 5 incrementing by 1 each time 

```
int[5] :: x = [1,2,3,4,5]
int[5] :: x = [1...5]
int[5] :: x = [1...5 by 1]
```

do the same as above except 0 index the array
```
int[0:4] :: x = [1...5]
```

define x to be an array of real numbers of length 10 (indexed from -5 to 5) that go from values -10.0 to 10.0 incrementing by 2.0
```
real[-5:5] :: x = [-10.0 ... 10.0 by 2.0]
real[-5:5] :: x = ~[-10 ... 10 by 2]
```

define x to be an integer array of variable length that the values increment from 1 to 9 by 2 (ie. 1,3,5,7,9)
```
int[:] :: x = [1...9 by 2]
```

define x to be the sequence of y followed by the sequence of z where y and z are arrays of the same type
```
x = [y, z]
x = y .concatenation. z
```

define x to be a integer 3x3 2-dimensional array that increments from 1 to 9 as the indices increment by 1 (first dimension increments first)
```
                                            y1 y2 y3 
int[3,3] :: x = [1...9]                  # |1, 4, 7| x1
int[:,:] :: x = [1...]                   # |2, 5, 8| x2
int[3,3] :: x = [1,2,3;4,5,6;7,8,9]      # |3, 6, 9| x3

int[3,3] :: x
x[:,1] = [1,2,3]
x[:,2] = [4,5,6]
x[:,3] = [7,8,9]

int[3,3] :: x
x[1,:] = [1,4,7]
x[2,:] = [2,5,8]
x[3,:] = [3,6,9]
```
### Function
regex: 
```javascript
/fxn\s+(.+?)\(([\s\S]*?)\)\s*return\((.+?)\)([\s\S]*)end\s*fxn\s+(.*)/gmi
```
Example:
```
fxn add(a, b) return(c)
  
  #arguments
  int :: a, b

  #output
  int :: c

  c = a + b

end fxn add
```


### Subroutine
regex: 
```javascript
/sub\s+(.+?)\(([\s\S]*?)\)([\s\S]*)end\s*sub\s+(.*)/gmi
```

Example:

```
sub Drive_S(dt)

  #arguments
  real :: dt

  this:distance += this:speed * dt

end sub Drive_S
```
## Definitions of Control Structures

### Do Loop `do`
regex:
```javascript
/do\s+(\w)\s*(=\s*\d+\s*\.\.\.\s*\d+)([\s\S]*)end\s+do(.*)/gmi
```

### if statement `if [else if]* [else]`
regex:
```javascript
/if\s*\(([\s\S]*?)\)([\s\S]*?)(?:else\s*if\s*\(([\s\S]*?)\)([\s\S]*?))*(?:else([\s\S]*?))?end\s*if/gmi
```

## Definitions of Operators

### Assignment Operator `=`
regex: 
```javascript
/()/gi
```  

### Pointer Assignment Operator `=>`
regex: 
```javascript
/()/gi
```  

### Addition Operator `+`
regex: 
```javascript
/()/gi
```  

### Simple Increment Operator `++`
regex: 
```javascript
/()/gi
```  

### Complex Increment Operator `+=`
regex: 
```javascript
/()/gi
```  

### Subtraction Operator `-`
regex: 
```javascript
/()/gi
```  

### Simple Decrement Operator `--`
regex: 
```javascript
/()/gi
```  

### Complex Decrement Operator `-=`
regex: 
```javascript
/()/gi
```  

### Mutiplication Operator `*`
regex: 
```javascript
/()/gi
```  

### Multiplicative Assignment Operator `*=`
regex: 
```javascript
/()/gi
```  

### Division Operator `/`
regex: 
```javascript
/()/gi
```  

### Divisive Assignment Operator `/=`
regex: 
```javascript
/()/gi
```  

### Exponent Operator `**`
regex: 
```javascript
/()/gi
```  


### nth Root Operator `//`
regex: 
```javascript
/()/gi
```  

### Modulus Operator `%`
regex: 
```javascript
/()/gi
```  

### Parentheses Operator `()`
regex: 
```javascript
/()/gi
```  

### Smart Parse Operator `~`
regex: 
```javascript
/()/gi
```  


### Generated Sequence Operator `...`
regex: 
```javascript
/(\d+(?:[\.][\d]*)?)\s*\.\.\.\s*(\d+(?:[\.][\d]*)?)\s*(?:by\s*(\d+(?:[\.][\d]*)?))?/gi
```  
