

export interface IUser {
    _id: string,
    email: string,
    name: string
}

export interface MessageType {
    message: string
}

export interface TextInputInterface {
    type: string,
    name: string,
    value: string | number,
    placeholder: string
    handleChange: React.ChangeEventHandler<HTMLInputElement>,
    labelLogic: string,
    labelStyleLogic: string
}

export interface TypeSectionInterface {
    title: string,
    items: string[],
    handleTypes:React.MouseEventHandler<HTMLButtonElement>,
}

export interface ImageLinkInterface {
    image: string,
    alt: string,
    name: string,
    link: string
}

export interface CheckedInputInterface {
    name: string
}

export interface CartItemInterface {
    cartItem: {
      name: string,
      price: string,
      quantity: string,
      image: string
    }
}

export type CartItemType = {
    _id?: any,
    name: string,
    price: string,
    quantity: string,
    image: string
  }

