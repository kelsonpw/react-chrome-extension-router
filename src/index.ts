import * as React from 'react';
import { useForceUpdate } from './utils';

type RouterStackItem = {
  component: React.ComponentType<any>;
  props: any;
};

let stack: RouterStackItem[] = [];

let forceUpdate: Function;

function goTo(comp: React.ComponentType<any>, props: any = {}): void {
  stack.push({ component: comp, props });
  forceUpdate && forceUpdate();
}

function goBack(): void {
  if (stack.length) {
    stack.pop();
  }
  forceUpdate && forceUpdate();
}

function popToTop(): void {
  stack = [];
  forceUpdate && forceUpdate();
}

function getCurrent(): RouterStackItem {
  return stack[stack.length - 1] || { component: false, props: null };
}

function getComponentStack(): RouterStackItem[] {
  return stack;
}

interface LinkProps {
  id?: string;
  component: React.ComponentType<any>;
  children?: React.ReactNode;
  props?: any;
  href?: string;
  className?: string;
  tag?: React.ComponentType<any> | keyof JSX.IntrinsicElements;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

function Link({
  id = '',
  component,
  children,
  props = {},
  href = '',
  className = '',
  tag = 'a',
  onClick,
  ...restProps
}: LinkProps & React.HTMLProps<HTMLElement>) {
  const onClickHandler = React.useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      if (component) {
        goTo(component, props);
      }
      if (!component && href) {
        window.open(href);
      }
      onClick && onClick(evt);
    },
    [component, props, href, onClick]
  );

  return React.createElement(
    tag,
    {
      href,
      className,
      id,
      onClick: onClickHandler,
      ...restProps,
    },
    children
  );
}

interface RouterProps {
  children: React.ReactNode;
}

const emptyStackComponent: RouterStackItem = {
  component: ({ children }: any) => children,
  props: {},
};

function Router({ children }: RouterProps) {
  const update = useForceUpdate();

  React.useEffect(() => {
    forceUpdate = update;
  }, [update]);

  const { component: Component, props } =
    stack[stack.length - 1] || emptyStackComponent;

  return React.createElement(Component, props, children);
}

export {
  goBack,
  getCurrent,
  getComponentStack,
  goTo,
  popToTop,
  LinkProps,
  RouterProps,
  Link,
  Router,
};
