import type { ButtonHTMLAttributes } from 'react';

import styles from './button.module.css';

type ButtonProps = {
  primary?: boolean;
  info?: boolean;
  danger?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ primary, info, danger, ...props }: ButtonProps) => {
  let className = styles.button;

  if (primary) className += ` ${styles.primary}`;
  if (info) className += ` ${styles.info}`;
  if (danger) className += ` ${styles.danger}`;

  return <button className={className} {...props} />;
};
