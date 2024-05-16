import { ObjectId } from "mongodb";

export interface Power {
  id: number;
  type: string;
  strength: number;
  isHuman: boolean;
  specialMove: string;
  imageUrl: string;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  age: number;
  isActive: boolean;
  birthDate: string;
  imageUrl: string;
  role: string;
  hobbies: string[];
  powers: Power[];
}

export interface User {
  _id?: ObjectId;
  username: string;
  password?: string;
  role?: "ADMIN" | "USER";
}

export {};
