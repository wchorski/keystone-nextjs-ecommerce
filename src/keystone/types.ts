// @ts-nocheck
// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/types.ts
// NOTE -- these types are commented out in master because they aren't generated by the build (yet)
// To get full List and GraphQL API type support, uncomment them here and use them below
// import type { KeystoneListsTypeInfo } from './.keystone/schema-types';

import { KeystoneGraphQLAPI, KeystoneListsAPI } from '@keystone-6/core/types';
import type { Permission } from './schemas/fields';


export type Session = {
  user?: {
    name?:string | null | undefined,
    email?:string | null | undefined,
    image?:string | null | undefined,
  } | undefined,
  authId:string,
  id:string,
  itemId: string;
  data: {
    role?: Role,
  };
  expires: string,
}

export type GridLayout = '1'|'1_1'|'1_2'|'2_1'|'1_4'|'1_1_1'|'1_2_1'

export type SelectOption  = {
  value:string,
  label:string,
}

export type CheckboxOption  = {
  value:string,
  label:string,
  isChecked:boolean,
}

export type DayTimes = {
  day: Date,
  times: string[]
}

// ? didn't like "[key in Permission]: boolean;"
// export type Session = {
//   itemId?: string;
//   listKey?: string;
//   data?: {
//     name: string;
//     isAdmin?: boolean;
//     role?: {
//       id?: string;
//       name?: string;
//     } & {
//       [key in Permission]: boolean;
//     };
//   };
// }|null

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
  context?: any,
};

export type CartItem = {
  id: string,
  quantity: number,
  product: Product

}

export type Coupon = {
  name:string,
  amount_off:number,
  percent_off:number,
  duration_in_months:number,
  duration:'once'|'repeating'|'forever',

}

export type Event = {
  id:string,
  summary:string,
  location:Location,
  start: string,
  end:string,
  price:number,
  hosts:User[],
  tickets: Ticket[],
  seats:number,
  description: {
    document: any,
  }
  excerpt:string,
  image:string,
  status:string,
  dateCreated:string,
  dateModified:string,
  tags: Tag[],
  categories: Category[],
}

export type Ticket = {
  id:string,
  email:string,
  qrcode:string,
  event: Event,
  holder: User,
  status: string,
  orderCount: string,
}

export type Product = {
  id: string,
  price: number,
  name: string,
  slug: string,
  status: string,
  stockCount: number,
  excerpt: string,
  description:{
    document:any,
  }
  photo: Photo,
  image:string,
  stripeProductId: string,
  stripePriceId: string,
  tags: Tag[],
  categories: Category[],
  dateCreated: string,
  dateModified: string,
  author:User,
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
  dateCreated: string,
  user: User,
  items: [OrderItem],
  ticketItems:Ticket[],
  status:'OPEN'|'COMPLETE'|'EXPIRED'
}

export type OrderItem = {
  id: string,
  name: string,
  description: string,
  price: number,
  quantity: number,
  productId: string,
  product:Product,
  photo: Photo,
  image:string,
  dateCreated: string,
  dateModified: string,
}

export type User = {
  id: string,
  name: string,
  nameLast:string,
  email: string,
  phone:string,
  image:string,
  password: string,
  url:string,
  isAdmin: boolean,
  isActive: boolean,
  stripeCustomerId: string,
  posts: any[],
  pages: any[],
  servicesProvided: Service[],
  bookings: any[],
  gigs: any[],
  availability: Availability[],
  cart: CartItem[],
  dateCreated: string,
  dateModified: string,
  products: Product[],
  subscriptionPlans: any[],
  subscriptions: any[],
  orders: OrderItem[],
  role: Role,
  tickets: Ticket[]
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
  service?: Service,
  price: number,
  employees: User[],
  addons:Addon[],
  customer: User,
  location:Location,
  email:string,
  phone:string,
  name:string,
  notes: string,
  status: 'ACTIVE'|'POSTPONED'|'CANCELED'|'LEAD'|'PAID'|'DOWNPAYMENT'|'HOLD',
  dateCreated: string,
  dateModified: string,
  google?:{
    id?:string,
    kind?:string,
    status?:string,
    message?:string,
    htmlLink?:string,
  }
}

export type BookingPrevious = {
  bookingId:string,
  serviceId:string,
  date:string,
  time:string,
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
  id?: string,
  title?: string,
  slug?: string,
  dateCreated?: string,
  dateModified?: string,
  status?: string,
  template: string,
  pinned: number,
  excerpt?: string,
  featured_image?: string,
  featured_video?: string,
  content?: {
    document: any,
  } | any,
  allow_comments?:boolean,
  author?: User,
  // |{connect:any},
  categories?: Category[]|{connect:any},
  tags?: Tag[],
    // |{connect:any},
} 

export type Announcement = {
  link:string,
  start:string,
  end:string,
  type:'MAINTENANCE'|'NORMAL'|'CRITICAL'|'SALE',
  content: {
    document: any,
  }
}

export type Role = {
  id: string,
  name: string,
  assignedTo: User,
  name: string;
  canManageProducts:boolean
  canManageAddons:boolean
  canManageBookings:boolean
  canManageAvailability:boolean
  canManageEvents:boolean
  canManageAnnouncements:boolean
  canManageTickets:boolean
  canSeeOtherUsers:boolean
  canManagePosts:boolean
  canManageUsers:boolean
  canManageRoles:boolean
  canManageCart:boolean
  canManageOrders:boolean
  canManageCategories:boolean
  canManageTags:boolean
  canManageLocations:boolean
  canManagePages:boolean
  canManageServices:boolean
  canManageSubscriptionPlans:boolean
  canManageSubscriptionItems:boolean
  canManageCoupons:boolean
}

export type Service = {
  id: string,
  name: string,
  image:string,
  description: string,
  price: number,
  durationInHours: string,
  buisnessHourOpen: string,
  buisnessHourClosed: string,
  buisnessDays: number[],
  employees: User[],
  bookings: Booking[],
  categories: Category[],
  tags: Tag[],
  locations: Location[],
  addons:Addon[],
}

export type Location = {
  id: string,
  name: string,
  address: string,
  rooms: number,
  services: Service[],
  bookings: Booking[],
  categories: Category[],
  tags: Tag[],
  bookings:Booking[],
}

export type SubscriptionPlan = {
  id: string,
  image: string,
  author: User,
  name: string,
  slug: string,
  excerpt:string,
  description: {
    document: any
  },
  status: string,
  price: number,
  stripeProductId: string,
  stripePriceId: string,
  billing_interval: string,
  items: SubscriptionItem[]
  stockMax: number,
  tags: Tag[],
  categories: Category[],
}

export type SubscriptionItem = {
  id: string,
  status:'ACTIVE'|'TRIAL'|'EXPIRED'|'CANCELED'|'SUSPENDED'|'PAUSED'|'DELINQUENT',
  custom_price: number,
  billing_interval: 'day'|'week'|'month'|'year',
  subscriptionPlan: SubscriptionPlan,
  isActive: boolean,
  isDelinquent: boolean,
  user: User,
  stripeSubscriptionId:string,
  stripeChargeId:string,
  dateCreated:string,
  dateModified:string,
  notes:string,
}

export type Addon = {
  id: string,
  name: string,
  image:string,
  description: string,
  price: number,
  services: Service[],
  bookings: Booking[],
  categories: Category[],
  tags: Tag[],
  excerpt:string,
}

export type IDObj = {
  id: string,
}

export type DateRange = {
  start:Date,
  end:Date,
}
export type StringRange = {
  start:string,
  end:string,
}