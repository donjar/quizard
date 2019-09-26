export interface IToggleButtonProps {
  isSelected: boolean;
  onClick?: () => void;
}

export interface INavbarProps {
  background: string;
}

export interface IInputFieldProps {
  type: string;
  placeholder: string;
  value?: string;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
