export interface DropdownItem {
  label: string
  icon: string
  command: () => void
}

export interface TableContextItem {
  label: string
  items: DropdownItem[]
}

export interface NavSubItem {
  label?: string
  icon?: string
  command?: () => void
}

export interface NavItem {
  separator?: boolean
  label?: string
  icon?: string
  items?: NavSubItem[]
  command?: () => void
}
