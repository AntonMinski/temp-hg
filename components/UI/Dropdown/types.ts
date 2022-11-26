export type DropdownPlacement = 'top' | 'bottom' | 'left' | 'right'

export type DropdownItem = {
  name: string;
  handle: string;
};

export type DropdownItemParent = {
  name: string;
  handle: string;
  child: DropdownItem[];
};

export type MenuItemChild = { handle: string };


export type MenuType = 'text' | 'checkbox' | 'group';

export type MenuGrouping = 'parent' | 'child';

