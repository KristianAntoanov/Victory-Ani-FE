export const supportedLanguages = ['bg', 'en'] as const

export type Language = (typeof supportedLanguages)[number]
