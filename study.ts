// in TS the variables can be assined with type
const variable: number = 1
// if we dont assign the type it will be inferred with the type of the value
let variable2 = 1

//if we want to assign the type for multiple types, we can set it as any
// but this is not recommended
let variable3: any = 1
variable3 = "1"

// to set multiple types we can use the | operator

let variable4: number | string = 1

//for lists we can set the type of the list
const list: number[] = [1, 2, 3]
//if we dont set any type, it will be inferred with the type of the value
//we can also use it for multiple types
const list2 = [1,'2',true]
//we can set matrix as a list of lists
const matrix: number[][]= [[1,2],[1]]

//we can also set the type of the atributs of an object

const object: {name: string, age: number, email?:string} = {
    name: 'John',
    age: 1,
    //email is optional becaouse of the ?
}


//in return either

function objectFunction(): {name: string, age: number} {
    return {
        name: 'John',
        age: 1
    }
}
console.log(object) 

// To not repeat the type of the object, we can use TYPE ALIAS

type Person = {
    name: string,
    age: number
}

const object2: Person = {
    name: 'John',
    age: 1
}

//we can combine types with the & operator

type Person2 = {
    rule?: string,
    id: number
}

function objectFunction2(): Person & Person2 {
    return {
        name: 'John',
        age: 1,
        rule: 'admin',
        id: 1
    }
}

// tuples are a list of fixed length and fixed type

let tuple: [number, string] = [1, '1']

let [first, second] = tuple


// enum is a type of object that has a fixed set of values
// by default the values are 0, 1, 2, 3...
enum weatherConditions {
    sunny,
    rainy,
    cloudy = 'cloudy' // we can set the value of the enum
}

console.log(weatherConditions) // 0

//we can type classes

class Car{
  readonly name: string
  readonly id: number

    constructor(name: string, id: number){
        this.name = name
        this.id = id
    }

    getName(): string {
        return this.name
    }
}

// instance of the class

let car = new Car('car', 1)
//car.name = 'car2' // this will throw an error because the name is readonly

console.log(car)

// access modifiers
// public: can be accessed from anywhere
// private: can be accessed only from the class
// protected: can be accessed only from the class and its subclasses
type animalType = {
    id: number
    name: string
    specie: string
    age: number
}

class Animal {
    private id: number
    protected name: string
    public specie: string
    public age: number

    constructor(id: number, name: string, specie: string, age: number) {
        this.id = id
        this.name = name
        this.specie = specie
        this.age = age

    }
}

class Dog extends Animal {
    bark() {
        console.log('woof')
    }
}

//we use interfaces for objects
// when you set an interface, the object must have all the properties defined in the interface

interface AnimalInterface {
    id: number
    name: string
    specie: string
    age: number
}

const AnimalInterfaceTeste: AnimalInterface = {
    id: 1,
    name: 'dog',
    specie: 'dog',
    age: 1
}

console.log(AnimalInterfaceTeste)

// we can also use interfaces for functions and classes

interface AnimalInterfaceFunction {
    (id: number, name: string, specie: string, age: number): AnimalInterface
}

const animalFunction: AnimalInterfaceFunction = (id, name, specie, age) => {
    return {
        id,
        name,
        specie,
        age
    }
}
// console.log(animalFunction(1, 'cat', 'cat', 1))

interface GreetRequest {
    firstName: string
    lastName: string
    age: number
    greet(): void
}

function greet(person:GreetRequest){
    console.log(`Hello ${person.firstName} ${person.lastName}, you are ${person.age} years old.`)
    person.greet()
}

const Pablo: GreetRequest = {
    firstName: 'Pablo',
    lastName: 'Escobar',
    age: 50,
    greet() {
        console.log('Hello, how is it going?')
    }
}

const John: GreetRequest = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    greet() {
        console.log('Hello, how are you?')
    }
}

greet(Pablo)
greet(John)

interface Song {
    artist: string
    songName: string
    views: number
    infos(songName: string, artist: string, views:number):string;
}

const envy:Song = {
    artist: 'Chris Gray',
    songName: 'Envy',
    views: 1000000,
    infos(songName, artist, views) {
        return `The song ${songName} by ${artist} has ${views} views.`
    }
}

console.log(envy.infos(envy.songName, envy.artist, envy.views))

//whit classes


interface Computer{
    brand: string
    model: string
    year: number
    specs?(): string;
}

class Computers implements Computer {
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    specs(): string {
        return `This computer is a ${this.brand} ${this.model} from ${this.year}.`;
    }
}

const myCompiuter = new Computers("amd", "ryzen 5", 2023);
console.log(myCompiuter.specs());