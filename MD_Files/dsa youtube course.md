# Java

## Types of language
* **procedural** - follows a sequence of code
* **Functional** - the program can be split into functions
* **object-oriented** - can create custom data types that can bundle functions and property in the single data type / Variable 

`Java, Python, C++` - follows procedural, functional, and oop 

`c` - follows the procedural and functional type

## Static Vs Dynamic Languages
- **Static** 
     - Type checking is done in compile time
     - We have to specify the Data type before initializing a variable
     - `Java,C,C++`     
     - Exmaple
```java 
String name = "Harish";
```
    
- **Dynamic**
     - Type checking is done in run time
     - We don't have to specify the data type before initilizing a variable
     - `Javascript, Python`
     - Exmaple
```javascript 
let name = "Harish";
```

## Memory Management
* **Stack**
* **Head**
```java
int a =10 
```
In the above code `a` is the **reference variable** , And `10` is the **object**.
-  reference Variable will be stored in `stack`
- Objects will be stored in `Heap`

**Reference variable** will pointing to the **Object** which is present in the heap
        
### What happens if a object don't have any reference variable ?
Then the object will be removed from memory by garbage collector
```java
Point point1 = new Point(1,2);
Point point2 = new Point(2,3);
point1 = point2;
```
* Here in the above example in 1st line point1 is point to a object with (1,2)
* In the 2nd line we have another reference variable point2 which is pointing to new object with (2,3)
* int the 3rd line the poin1 reference variable is pointing to the point2 object
* now the object (1,2) doesn't have any variables referring to them. So it will be removed automatically by **Garbage Collector** in java. But in c++ we have remove them by **destructor**

## How Java Code Executes

**.java File (Human Readable)**   -`Compiler`->**.calss file (Byte Code)** -`Interperter`-> **Machine Code (0 and 1)**

### JDK - Java development kit
* Provides environment to develop and run the program
* It is a package that includes
     * Development tools
     * **JRE (Java Runtime Environment)** -  To execute your program
     *  **java compiler** - javac
     * **archiver** - jar
     * **docs generator** - javadoc
     * interpreter/ loader

## JRE - its like a box , JVM is one of the content in the box
* We can only run the program 
* Consists of 
     *  Deployemnet technologies
     * User interface toolkits
     * Intergration libraries
      * base libraries
      * JVM
After we get the .class file 
* **Class loader** loads all classes needed to execute the program
* **JVM**  sends the byte code to verifer to check the format of code


## JVM Execution 
* `Interpreter`  - Convert the byte to machine code
    - line by line execution
    - when one function is repeated over many time then every time jvm will interpret/ convert the byte code every single time.

`To Rectify this issue JIT comes into the picture`
### JIT Just in time compiler 
      - repeated function are not re-interpred 
      - It makes the execution faster 

### working of **JVM** - Java virtual machine 
* **loading:** 
   *reads the .class file and generate the binary data
   * An object of this class is created on  the heap memory
* **Linking**
   * JVM verifies the .class file (Looks for error)
   * allocate memory for the variables / default values
   * Replace symbolic reference form the type with direct reference
* `Initialization`  
    * All the static variables are assigned with their values in the static block


## Anatomy of JAVA
```java
public class Main{
public static void main(String [] args){
       System.out.println(args[0])
}
}
```
File name and Class name should be same when we use class name with public.
we are declaring out class as public because we use any where in the program
`Static` method will be executed without creating a object

* Above code is our source code(human readable code)
* now we need to convert source code to byte code by `javac`
```bash
javac main.java
```
*  Byte code will be created in the current dir 
*  If we want to save all the byte code (.class) in separate dir
```bash
javac -d PATH main.java
```
 `In one java file we are allowed to declare only one public class the name of the public class should be the same as the name of the Java file.`

### Input and Output
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scannerObj = new Scanner(System.in);
        System.out.println(scannerObj.nextLine());
    }
}
```
### Scanner Class methods
|Method	|Description |
|----|------|
|nextBoolean()|	Reads a boolean value from the user|
|nextByte()|	Reads a byte value from the user|
|nextDouble()|	Reads a double value from the user|
|nextFloat()|	Reads a float value from the user|
|nextInt()	|Reads a int value from the user|
|nextLine()|	Reads a String value from the user|
|nextLong()|	Reads a long value from the user|
|nextShort()|	Reads a short value from the user|
 
## Data Type
`Data type` is used to represent the type of data like integer, float , char, string.

There are 2 types of datatype
- __Primitive Type__ -  used to store simple values / We cannot break into smaller data types
- __Reference Type__ - used to store complex values link objects array / we Can break into smaller data types

### primitive type

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
### Compiler behaviour while assigning long and float
* when we assign a whole number to the variable, compiler by default it wil consider as a **Interger**/**int**
* When we assign a decimal number to the variable compiler by defalut it will consider as a **double**

If we want to declear a number to the long variable data type then we have to add a ` L ` at the end of the number, In Case of float we have add an ` F `at the end
```java
long indiaPopulation = 1417237051; //compilation error will be thrown 
long indiaPopulation = 1_417_237_051L ; // issuse is rectified here
float radius = 25.5; //Throws compilation error 
float radius = 25.5F
```
### Reference Type 
Used to store complex object  like Date, Array, objects etc
Before the initiation of a object, We should import the package Where the Target Object present
> Declaration 
```java
 Date date = new Date()
```
`new` Keyword will allocate memory.

 
