// @ts-nocheck
// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/types.ts
// NOTE -- these types are commented out in master because they aren't generated by the build (yet)
// To get full List and GraphQL API type support, uncomment them here and use them below
// import type { KeystoneListsTypeInfo } from './.keystone/schema-types';

import { KeystoneGraphQLAPI, KeystoneListsAPI } from '@keystone-6/core/types';
import type { Permission } from './schemas/fields';

export type DateRange = {
  start: Date,
  end: Date,
}

export type StringRange = {
  start:string,
  end:string,
}

export type DayTimes = {
  day: Date,
  times: string[]
}

export type Session = {
  itemId: string;
  listKey: string;
  data: {
    name: string;
    role?: {
      id: string;
      name: string;
    } & {
      [key in Permission]: boolean;
    };
  };
};

export type ListsAPI = KeystoneListsAPI<any /* KeystoneListsTypeInfo */>;
export type GraphqlAPI = KeystoneGraphQLAPI<any /* KeystoneListsTypeInfo */>;

export type AccessArgs = {
  session?: Session;
  item?: any;
};

export type AccessControl = {
  [key: string]: (args: AccessArgs) => any;
};

export type ListAccessArgs = {
  itemId?: string;
  session?: Session;
};

export type CartItem = {
  id: string,
  name: string,
  price: number,
  quantity: number,
  product: Product

}

export type Product = {
  id: string,
  price: number,
  name: string,
  slug: string,
  status: string,
  stockCount: string,
  description: string,
  photo: Photo,
  stripeProductId: string,
  stripePriceId: string,
  tags: Tag[],
  categories: Category[],
  dateCreated: string,
  dateModified: string,
}

export type ProductImage = {
  image: any,
  url: string,
  altText: string,
  filename: string,
  product: Product,
  subscription: any,
}

export type Photo = {
  id: string,
  altText: string,
  image: {
    url: string
  }
}

export type Orders = {
  Orders: [Order]
}

export type Order = {
  id: string,
  charge: string,
  total: number,
  createdAt: string,
  user: {
    id: string,
  }
  items: [OrderItem]
}

export type OrderItem = {
  id: string,
  name: string,
  description: string,
  price: number,
  quantity: number,
  productId: string,
  photo: Photo,
  dateCreated: string,
  dateModified: string,
}

export type User = {
  id: string,
  name?: string,
  nameLast?:string,
  image?:string,
  email?: string,
  phone?: string,
  password?: string,
  isAdmin?: boolean,
  isActive?: boolean,
  stripeCustomerId?: string,
  posts?: any[],
  pages?: any[],
  servicesProvided?: Service[],
  bookings?: any[],
  gigs?: any[],
  availability?: Availability[],
  cart?: CartItem[],
  createdAt?: string,
  products?: Product[],
  subscriptionPlans?: any[],
  subscriptions?: any[],
  orders?: OrderItem[],
  role?: {
    name:string,
    canManageCart?:boolean,
    canManageOrders?:boolean,
    canManageProducts?:boolean,
    canManageRoles?:boolean,
    canManageUsers?:boolean,
    canSeeOtherUsers?:boolean,
    canManageTickets?:boolean,
    canManageEvents?:boolean,
  }
  dateCreated?: string,
  dateModified?: string,
  tickets?:Ticket[],
}

export type Availability = {
  id: string,
  start: string,
  end: string,
  durationInHours: string,
  employee: User,
  type: string,
  status: string,
  dateCreated: string,
  dateModified: string,
}

export type Booking = {
  id: string,
  start: string,
  end: string,
  summary: string,
  durationInHours: string,
  service: Service,
  price: number,
  employees: User[],
  customer: User,
  notes: string,
  dateCreated: string,
  dateModified: string,
  addons:Addon[],
  location:Location,
}

export type Category = {
  id: string,
  name: string,
  description: string,
  pages: Page[],
  posts: Post[],
  products: Product[],
  subscriptions: any[],
  services: Service[],
}

export type Tag = {
  id: string,
  name: string,
  pages: Page[],
  posts: Post[],
  products: Product[],
  subscriptions: any[],
  services: Service[],
}

export type Page = {
  id: string,
  title: string,
  slug: string,
  dateCreated: string,
  dateModified: string,
  status: string,
  template: string,
  pinned: number,
  excerpt: string,
  featured_image: string,
  featured_video: string,
  content: any,
  author: User,
  categories: Category[],
  tags: Tag[],
}

export type Post = {
  id: string,
  title: string,
  slug: string,
  dateCreated: string,
  dateModified: string,
  status: string,
  template: string,
  pinned: number,
  excerpt: string,
  featured_image: string,
  featured_video: string,
  content: any,
  author: User,
  categories: Category[],
  tags: Tag[],
}

export type Role = {
  id: string,
  name: string,
  assignedTo: User,
}

export type Service = {
  id: string,
  name: string,
  description: string,
  price: number,
  durationInHours: string,
  buisnessHourOpen: string,
  buisnessHourClosed: string,
  buisnessDays: number[],
  employees: User[],
  bookings: Booking[],
  status: string,
  categories: Category[],
  tags: Tag[],
  locations: Location[],
  addons: Addon[],
}

export type SubscriptionPlan = {
  id: string,
  photo: ProductImage,
  author: User,
  name: string,
  slug: string,
  description: string,
  status: string,
  price: number,
  stripeProductId: string,
  stripePriceId: string,
  billing_interval: string,
  items: any[]
  stockCount: number,
  tags: Tag[],
  categories: Category[],
}

export type SubscriptionItem = {
  id: string,
  custom_price: number,
  subscriptionPlan: SubscriptionPlan,
  isActive: boolean,
  isDelinquent: boolean,
  user: User,

}

export type Addon = {
  id: string,
  name: string,
  description: string,
  price: number,
  services: Service[],
  bookings: Booking[],
  categories: Category[],
  tags: Tag[],
}

export type IDObj = {
  id: string,
}

export type Location = {
  id:string,
  name?: string,
  address?:string,
  rooms?:number,
  services?: Service[],
  bookings?:Booking[],
  events?:Event[],
  tags?: Tag[],
  categories?: Category[],
}

export type Event = {
  id?:string,
  summary?:string,
  location?:Location,
  start?: string,
  end?:string,
  price?:number,
  hosts?:User[],
  tickets?: Ticket[],
  seats?:number,
  photo?:string,
  description?: string,
  status?:string,
  dateCreated?:string,
  dateModified?:string,
  tags?: Tag[],
  categories?: Category[],
}

export type Ticket = {
  id:string,
  qrcode:string,
  event: Event,
  holder: User,
  status: string,
}

enum TICKET_STATUS {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  ATTENDED = 'ATTENDED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
}

export const TicketStatus = [
  {
    label: TICKET_STATUS.PENDING,
    value: TICKET_STATUS.PENDING,
  },
  {
    label: TICKET_STATUS.CONFIRMED,
    value: TICKET_STATUS.CONFIRMED,
  },
  {
    label: TICKET_STATUS.ATTENDED,
    value: TICKET_STATUS.ATTENDED,
  },
  {
    label: TICKET_STATUS.CANCELED,
    value: TICKET_STATUS.CANCELED,
  },
  {
    label: TICKET_STATUS.REJECTED,
    value: TICKET_STATUS.REJECTED,
  },
]

export enum INPUT_TYPES {
  TEXT = 'text',
  EMAIL = 'email',
  TEXTAREA = 'textarea',
  TIME = 'time',
  DATE = 'date',
  SELECT = 'select',
  NUMBER = 'number',
  DATETIME= 'datetime-local',
}

export type InputObj = {
  name:string,
  disabled?:boolean,
  type: 'text'|'email'|'textarea'|'time'|'date'|'select'|'number'|'datetime-local',
  label: string,
  placeholder?:string,
  pattern?:string,
  minLength?:string,
  maxLength?:string
  errorMessage:string,
  required: boolean,
  initial: string|number,
  options?: {
    label:string,
    value:string,
  }[]
}

export type Announcment = {
  link:string,
  start:string,
  end:string,
  content:{
    document:any
  }
}