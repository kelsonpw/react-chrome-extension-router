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

interface ILinkProps {
  id: string;
  component: React.ComponentType<any>;
  children: React.ReactNode;
  props: any;
  href: string;
  className: string;
  onClick: (event: React.SyntheticEvent) => void;
}

function Link({
  id = '',
  component,
  children,
  props = {},
  href = '',
  className = '',
  onClick,
  ...restProps
}: ILinkProps & React.HTMLProps<HTMLAnchorElement>) {
  const onClickHandler = React.useCallback(
    evt => {
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

  return React.createElement('a', {
    href,
    className,
    id,
    onClick: onClickHandler,
    ...restProps,
  });
}

interface IRouterProps {
  children: React.ReactNode;
}

const emptyStackComponent: RouterStackItem = {
  component: ({ children }) => children,
  props: {},
};

function Router({ children }: IRouterProps) {
  const update = useForceUpdate();

  React.useEffect(() => {
    forceUpdate = update;
  }, [update]);

  const { component: Component, props } =
    stack[stack.length - 1] || emptyStackComponent;

  return React.createElement(Component, props, children);
}

export { goBack, goTo, popToTop, ILinkProps, IRouterProps, Link, Router };
