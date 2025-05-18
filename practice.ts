//tuples is assigning types to the each element of a known array considereing their respective positions

// let mixture: [string, number, boolean] = ["", 32, false];

// function getItems(name: string): boolean {
//   return false;
// }

//funtion to sum

// const sumUp = (numA: number, numB: string): number | string => {
//   return numA + numB;
// };

// interface User {
//   name: string;
//   age: number;
//   email: string;
//   products: [];
// }

// const user = (input: User) => {
//   return input.name;
// };

// type Us = number;
// type Users = {
//   name: string;
//   age: number;
// };

// type User=Us|Users

// function user(user: User) {
//   console.log(user);
// }

// const write= (words:string):string|number=>{
//   return words
// }

//Generics
// function write<T>(words: T): T[] {
//   return [words];
// }

// write(21);

//LITERAL TYPES
// type dropDown = "success" | "failure";

// const dropdown: dropDown = "success";

//ENUM
// enum Roles {
//   admin,
//   vendor,
//   buyers,
// }

// const admin: Roles = Roles.admin;

// const user:Roles = "bola";

// type PetType = "dog" | "fish" | "cat";

// const petType: PetType = "fish";

// const getPetSound = (pet: PetType): string => {
//   if (pet === "dog") {
//     return "bark";
//   } else if (pet === "cat") {
//     return "meow";
//   }
//   return "sound of fish";
// };

// interface Vehicle {
//   name: string;
// }
// type Car = Vehicle & { doors: number };

// function repeat(value, times) {
//   let arr = new Array(times);
//   arr.fill(value);
//   return arr;
// }

// const ourWork: any = "this is good";

// const checkNumber = (ourWork as string).length;
// console.log(checkNumber);

let age = 21;
