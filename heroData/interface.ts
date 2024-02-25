export interface Power {
    id: number;
    type: string;
    strength: number;
    isAlien?: boolean;
    isHuman?: boolean;
    isHeroicSpirit?: boolean;
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
    powers: Power;
  }
  
  export {};