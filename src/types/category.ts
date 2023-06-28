export interface IImage {
  createdAt: string
  updatedAt: string
  id: string
  originalName: string
  filename: string
  path: string
  mimetype: string
  size: number
  order: number
}

export interface ILang {
  am: string
  en: string
  ru: string
}

export interface ICategory {
  id: string
  name: ILang
  sortOrder: number
  isActive: boolean
  metaTagTitle: ILang
  metaTagDescription: ILang
  metaTagKeyword: ILang
  mainImage: IImage
  children: ICategory[]
}
