'use client';

import { SeparatorProps } from '@base-ui/react/separator';
import {
  Select,
  SelectArrowProps,
  SelectBackdropProps,
  SelectGroupLabelProps,
  SelectGroupProps,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectListProps,
  SelectPopupProps,
  SelectPortalProps,
  SelectPositionerProps,
  SelectRoot,
  SelectScrollDownArrowProps,
  SelectScrollUpArrowProps,
  SelectTriggerProps,
  SelectValueProps,
} from '@base-ui/react/select';

import styles from './select.module.css';
import classNames from 'classnames';

export function SelectRootUi<
  Value,
  Multiple extends boolean | undefined = false,
>(props: SelectRoot.Props<Value, Multiple>) {
  return <Select.Root {...props}>{props.children}</Select.Root>;
}

export function SelectTrigger(props: SelectTriggerProps) {
  return (
    <Select.Trigger
      {...props}
      className={classNames(styles.Select, props.className)}
    >
      {props.children}
    </Select.Trigger>
  );
}

export function SelectValue(props: SelectValueProps) {
  return (
    <Select.Value
      {...props}
      className={classNames(styles.Value, props.className)}
    />
  );
}

export function SelectIcon(props: SelectIconProps) {
  return (
    <Select.Icon
      {...props}
      className={classNames(styles.SelectIcon, props.className)}
    >
      {props.children}
    </Select.Icon>
  );
}

export function SelectPortal(props: SelectPortalProps) {
  return <Select.Portal {...props}>{props.children}</Select.Portal>;
}

export function SelectPopup(props: SelectPopupProps) {
  return (
    <Select.Popup
      {...props}
      className={classNames(styles.Popup, props.className)}
    >
      {props.children}
    </Select.Popup>
  );
}

export function SelectBackdrop(props: SelectBackdropProps) {
  return <Select.Backdrop {...props} />;
}

export function SelectPositioner(props: SelectPositionerProps) {
  return (
    <Select.Positioner
      {...props}
      className={classNames(styles.Positioner, props.className)}
    >
      {props.children}
    </Select.Positioner>
  );
}

export function SelectArrow(props: SelectArrowProps) {
  return <Select.Arrow {...props} />;
}

export function SelectScrollUpArrow(props: SelectScrollUpArrowProps) {
  return <Select.ScrollUpArrow {...props} className={styles.ScrollArrow} />;
}

export function SelectScrollDownArrow(props: SelectScrollDownArrowProps) {
  return <Select.ScrollDownArrow {...props} className={styles.ScrollArrow} />;
}

export function SelectList(props: SelectListProps) {
  return (
    <Select.List
      {...props}
      className={classNames(styles.List, props.className)}
    >
      {props.children}
    </Select.List>
  );
}

export function SelectItem(props: SelectItemProps) {
  return (
    <Select.Item
      {...props}
      className={classNames(styles.Item, props.className)}
    >
      {props.children}
    </Select.Item>
  );
}

export function SelectItemText(props: SelectItemTextProps) {
  return (
    <Select.ItemText
      {...props}
      className={classNames(styles.ItemText, props.className)}
    />
  );
}

export function SelectItemIndicator(props: SelectItemIndicatorProps) {
  return (
    <Select.ItemIndicator
      {...props}
      className={classNames(styles.ItemIndicator, props.className)}
    />
  );
}

export function SelectSeparator(props: SeparatorProps) {
  return (
    <Select.Separator
      {...props}
      className={classNames(styles.Separator, props.className)}
    />
  );
}

export function SelectGroup(props: SelectGroupProps) {
  return (
    <Select.Group
      {...props}
      className={classNames(styles.Group, props.className)}
    >
      {props.children}
    </Select.Group>
  );
}

export function SelectGroupLabel(props: SelectGroupLabelProps) {
  return (
    <Select.GroupLabel
      {...props}
      className={classNames(styles.GroupLabel, props.className)}
    />
  );
}
