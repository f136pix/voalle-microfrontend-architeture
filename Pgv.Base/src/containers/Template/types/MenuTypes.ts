interface MenuItemType {
  name: string
  slug: string
  content: (props: any) => JSX.Element
}
export interface MenuListType {
  cadastros: MenuItemType
  operacoes: MenuItemType
  relatorios: MenuItemType
  analises: MenuItemType
  utilitarios: MenuItemType
  integracoes: MenuItemType
  configuracoes: MenuItemType
}

export type MenuListKeyType = keyof MenuListType
