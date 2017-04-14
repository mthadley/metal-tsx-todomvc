declare namespace Metal {
  interface ConfigAttr<T> {
    internal: boolean
    required: boolean
    valueFn: () => T
    value: T
  }

  type StateConfig<T> = {
    [K in keyof T]: Partial<ConfigAttr<T[K]>>
  }

  interface BaseProps extends ClassAttributes {
    children: Array<JSX.Element>
    elementClasses: string
    element: HTMLElement | null
  }

  interface ClassAttributes {
    key?: string | number
    ref?: string
  }

  interface ComponentCtor<T> {
    new(): Component<T, any>
  }

  type ComponentProps<T> = T & Partial<BaseProps>

  abstract class Component<T, U> {
    context: any
    props: Readonly<ComponentProps<T>>
    state: U

    static render<T>(ctor: ComponentCtor<T>, options: ComponentProps<T>): void

    protected created(): void
    protected attached(): void
    protected detached(): void
    protected disposed(): void

    protected setState(nextState: Partial<U>): void

    abstract render(): JSX.Element
  }

  interface HtmlEvent {
    [attrName: string]: any
  }

  type EventHandler = (event: HtmlEvent) => void

  interface DOMAttributes {
    class?: string
    id?: string
    onClick?: EventHandler
    onDblclick?: EventHandler
    onKeyPress?: EventHandler
  }

  interface HTMLProps extends ClassAttributes, DOMAttributes {
  }

  interface HTMLInputProps {
    autofocus?: boolean
    checked?: boolean
    onChange?: EventHandler
    onInput?: EventHandler
    placeholder?: string
    type?: string
    value?: string
  }

  interface HTMLLabelProps {
    for?: string
  }

  interface HTMLLinkProps {
    href?: string
  }
}

declare namespace JSX {
  interface ElementClass extends Metal.Component<any, any> {}

  interface Element {
    jsxElement: true
  }

  interface ElementAttributesProperty<T> {
    props: T
  }

  interface IntrinsicElements {
    a: Metal.HTMLProps & Metal.HTMLLinkProps
    button: Metal.HTMLProps
    div: Metal.HTMLProps
    h1: Metal.HTMLProps
    header: Metal.HTMLProps
    input: Metal.HTMLProps & Metal.HTMLInputProps
    label: Metal.HTMLProps & Metal.HTMLLabelProps
    li: Metal.HTMLProps
    footer: Metal.HTMLProps
    section: Metal.HTMLProps
    span: Metal.HTMLProps
    strong: Metal.HTMLProps
    ul: Metal.HTMLProps
  }
}

declare module 'metal-jsx' {
  export type StateConfig<T> = Metal.StateConfig<T>
  export default Metal.Component
}
