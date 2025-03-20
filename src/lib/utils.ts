import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSlugFromUrl = (url: string) => {
  const parts = url.split('/')
  for (let i = 0; i < parts.length; i++)
    if (parts[i] === 'tournament') return parts[i + 1]
  return url
}
