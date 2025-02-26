// utils/serialization.ts
import type { NinjaCharacter } from '../types/naruto';

export function serializeCharacter(character: NinjaCharacter): string {
  return JSON.stringify(character);
}

// utils/serialization.ts
export function deserializeCharacter(data: string): NinjaCharacter | null {
  try {
    const character = JSON.parse(data);
    // You may want to add validation here to ensure the character is of the correct type
    return character;
  } catch (error) {
    console.error("Failed to deserialize character:", error);
    return null;
  }
}
