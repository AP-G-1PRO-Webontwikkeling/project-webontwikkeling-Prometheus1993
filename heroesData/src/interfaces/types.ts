export interface Power {
  [key: string]: any;
  id: number;
  type: string;
  strength: number;
  isHuman: boolean;
  specialMove: string;
  imageUrl: string;
}

export interface Character {
  [key: string]: any;
  id: number;
  name: string;
  description: string;
  age: number;
  isActive: boolean;
  birthDate: string;
  imageUrl: string;
  role: string;
  hobbies: string[];
  powers: Power[]; // Nu gedefinieerd als een array van Power
}

export {};
