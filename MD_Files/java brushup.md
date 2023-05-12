# Java
## Data Type
`Data type` is used to represent the type of data like integer, float , char, string.

There are 2 types of datatype
- __Primitive Type__ -  used to store simple values
- __Reference Type__ - used to store complex values link objects array
## primitive type

> Declaration
```java
byte age = 19;
```

| Type  | Bytes  | Range   | 
|---|---|---|
|  byte |  1 | -128to127  |   
| short  | 2  | -32k to 32k  |   
|int  | 4  |  -2B to 2B | 
|long  |8 | | 
|float | 4 | |
| double | 8 | |
| char | 1 | A,B,C ...| 
| boolean | 1 | true/false |
 
### Kutty trick
to read a complex number like 

```java
long indiaPopulation = 1417237051L //dificult to read
long indiaPopulation = 1_417_237_051L // works like a charm
```
## Compiler behaviour while assigning long and float
* when we assign a whole number to the variable, compiler by default it wil consider as a **Interger**/**int**
* When we assign a decimal number to the variable compiler by defalut it will consider as a **double**

If we want to declear a number to the long variable data type then we have to add a ` L ` at the end of the number, In Case of float we have add an ` F `at the end
```java
long indiaPopulation = 1417237051; //compilation error will be thrown 
long indiaPopulation = 1_417_237_051L ; // issuse is rectified here
float radius = 25.5; //Throws compilation error 
float radius = 25.5F
```
## Reference Type 
Used to store complex object  like Date, Array, objects etc
Before the initiation of a object, We should import the package Where the Target Object present
> Declaration 
```java
 Date date = new Date()
```
`new` Keyword will allocate memory. 

## Primitive vs Reference Type
```java 
int x =10;
int y = x;
y =22;
Sytem.out.print(x+" - "+ y) //Output will be 10 - 22

Point point1 = new Point(1, 1 );
Point point2 = point1;
point2.x = 10;
System.out.print(point1.x) // Output wil be 10
```
* In Primitive type - value is stored in the value name
* In Reference type - once the object is created memory will be allocated to the object, that memory location/Address will be stored in the variable name