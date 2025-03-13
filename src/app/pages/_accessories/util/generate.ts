import { v4 as uuidv4 } from 'uuid';

export function getUuid(): string {
  return uuidv4();
}

export function getUuidsArr(length: number): string[] {
  return Array.from(Array(length)).map(() => {
    return getUuid();
  });
}
