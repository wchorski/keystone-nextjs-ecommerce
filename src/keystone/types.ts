// @ts-nocheck
// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/types.ts
// NOTE -- these types are commented out in master because they aren't generated by the build (yet)
// To get full List and GraphQL API type support, uncomment them here and use them below
// import type { KeystoneListsTypeInfo } from './.keystone/schema-types';

import { KeystoneGraphQLAPI, KeystoneListsAPI } from "@keystone-6/core/types"
import type { Permission } from "./schemas/fields"
//todo hopefully types will be auto imported from keystone context.
// for now we will manually import types
// https://github.com/keystonejs/keystone/discussions/8498
import type {
	BookingCreateInput,
	EventCreateInput,
	Lists,
	PostCreateInput,
	ServiceCreateInput,
} from ".keystone/types"

export type CalloutStatus = "info" | "warning" | "error" | "success"

export type Session = {
	user?:
		| {
				name?: string | null | undefined
				email?: string | null | undefined
				image?: string | null | undefined
		  }
		| undefined
	authId: string
	id: string
	itemId: string
	data: {
		role?: Role
	}
	expires: string
}

export type SpaceSize =
	| "xxs"
	| "xs"
	| "s"
	| "ms"
	| "m"
	| "ml"
	| "l"
	| "xl"
	| "xxl"
	| 0
	| "0"
export type ColorsTheme =
	| "bg_c_plain"
	| "bg_c_primary"
	| "bg_c_secondary"
	| "bg_c_tertiary"
	| "bg_c_accent"
	| "bg_c_transparent"
	| "bg_c_reverse_theme"
export type WidthLayoutSize =
	| "layout-full"
	| "layout-wide"
	| "layout-breakout"
	| "layout-content"
export type WidthLayoutSize2 =
	| "layout_full"
	| "layout_wide"
	| "layout_breakout"
	| "layout_content"
	| "layout_site"

export type GridLayout =
	| "1"
	| "1_1"
	| "1_2"
	| "2_1"
	| "1_4"
	| "1_1_1"
	| "1_2_1"
	| "1_1_1_1"

export type SelectOption = {
	value: string
	label: string
}

export type CheckboxOption = {
	value: string
	label: string
	isChecked: boolean
}

export type DayTimes = {
	day: Date
	times: string[]
}

export type TOCLink = {
	type: string
	level: number
	slug: string
	text: string
}
export type KSHeading = {
	type: string
	level: number
	children: { text: string }[]
}

//** Schema Lists START */
//** Schema Lists START */
//** Schema Lists START */

export type Role = Lists.Role.Item & {
	assignedTo: User[]
}

export type User = Lists.User.Item & {
	typeof: "user"
	role: Role
	posts: Post[]
	pages: Page[]
	privatePagesAccess: Page[]
	privatePostsAccess: Post[]
	servicesProvided: Service[]
	bookings: Booking[]
	gigs: Booking[]
	gig_requests: Booking[]
	availability: Availability[]
  //? these are redefined because ks sees them as `Date` but really it's just ISO string
	dateCreated: string
	dateModified: string
}

export type Category = Lists.Category.Item

export type Tag = Lists.Tag.Item

export type Booking = Lists.Booking.Item & {
	typeof: "booking"
	author: User
	details: { document: any }
	service?: Service
	location: Location
	addons: Addon[]
	employees: User[]
	employee_requests: User[]
	customer: User
	//? these are redefined because ks sees them as `Date` but really it's just ISO string
	dateCreated: string
	dateModified: string
	start: string
	end: string
	//? virtual item isn't included
	durationInHours: string
	summary: string
}

export type Page = Lists.Page.Item & {
	categories: Category[]
	tags: Tag[]
	author: User
	content: { document: any }
  //? these are redefined because ks sees them as `Date` but really it's just ISO string
	dateCreated: string
	dateModified: string
}
export type Post = Lists.Post.Item & {
	categories: Category[]
	tags: Tag[]
	author: User
	content: { document: any }
  //? these are redefined because ks sees them as `Date` but really it's just ISO string
	dateCreated: string
	dateModified: string
}

export type Announcement = Lists.Announcement.Item & {
	// link: string
	// start: string
	// end: string
	colorTheme: ColorsTheme
	// type: "MAINTENANCE" | "NORMAL" | "CRITICAL" | "SALE"
	content: {
		document: any
	}
}

export type ListsAPI = KeystoneListsAPI<any /* KeystoneListsTypeInfo */>
export type GraphqlAPI = KeystoneGraphQLAPI<any /* KeystoneListsTypeInfo */>

export type AccessArgs = {
	session?: Session
	item?: any
}

export type AccessControl = {
	[key: string]: (args: AccessArgs) => any
}

export type ListAccessArgs = {
	itemId?: string
	session?: Session
	context?: any
}

export type CartItem = Lists.CartItem.Item & {
	typeof: "cartitem"
	product: Product
	user: User
}

export type Coupon = Lists.Coupon.Item & {
	products: Product[]
	subscriptionItems: SubscriptionItem[]
	subscriptionPlans: SubscriptionPlan[]
	events: Event[]
	tickets: Ticket[]
	bookings: Booking[]
	services: Service[]
}

export type Event = Lists.Event.Item & {
	typeof: "event"
	location: Location
  description: {
    document: any
  }
	hosts: User[]
	cohosts: User[]
	tickets: Ticket[]
	coupons: Coupon[]
	categories: Category[]
	tags: Tag[]
  //? ks types as date but api gives string
	start: string
	end: string
}

export type Ticket = Lists.Ticket.Item & {
	typeof: "ticket"
	eventSummary: string
	event: Event
	holder: User
	order: Order
	coupons: Coupon[]
}

export type Product = Lists.Product.Item & {
	typeof: "product"
	description: {
		document: any
	}
	tags: Tag[]
	categories: Category[]
	author: User
	rentals: Rental
}

export type Rental = Lists.Rental.Item & {
	typeof: "rental"
	summary: string
	order: Order
	// employees: User[],
	addons?: Addon[]
	customer?: User
	dateCreated?: string
	dateModified?: string
	delivery: boolean
	google?: {
		id?: string
		kind?: string
		status?: string
		message?: string
		htmlLink?: string
	}
}

// export type ProductImage = {
// 	image: any
// 	url: string
// 	altText: string
// 	filename: string
// 	product: Product
// 	subscription: any
// }

// export type Photo = {
// 	id: string
// 	altText: string
// 	image: {
// 		url: string
// 	}
// }


export type Order = Lists.Order.Item & {
	user: User
	items: OrderItem[]
	rental: Rental
	ticketItems: Ticket[]
}

export type OrderItem = Lists.OrderItem.Item & {
	product: Product
	dateCreated: string
	dateModified: string
	order: Order
}

export type Availability = Lists.Availability.Item & {
	typeof: "availability"
	employee: User
	start: string
	end: string
	bookings: Booking[]
	//? virtual "number" is technically a string
	durationInHours: string
}

export type BookingPrevious = {
	bookingId: string
	serviceId: string
	locationId: string
	employeeId: string
	date: string
	time: string
}

export type Service = Lists.Service.Item & {
	typeof: "service"
	description: {
		document: any
	}
	employees: User[]
	bookings: Booking[]
	categories: Category[]
	tags: Tag[]
	locations: Location[]
	addons: Addon[]
	buisnessDays: number[]
}

export type Location = Lists.Location.Item & {
	services: Service[]
	bookings: Booking[]
	categories: Category[]
	tags: Tag[]
	bookings: Booking[]
}

export type Billing_Interval = "day" | "week" | "month" | "year"
export type Duration = "forever" | "once" | "repeating"

export type SubscriptionPlan = Lists.SubscriptionPlan.Item & {
	author: User
	description: {
		document: any
	}
	billing_interval: Billing_Interval
	items: SubscriptionItem[]
	tags: Tag[]
	categories: Category[]
	addons: Addon[]
	coupons: Coupon[]
}

export type SubscriptionItem = Lists.SubscriptionItem.Item & {
	typeof: "subscriptionitem"
	subscriptionPlan: SubscriptionPlan
	billing_interval: Billing_Interval
	user: User
}
export type Addon = Lists.Addon.Item & {
	author?: User
	services?: Service[]
	bookings?: Booking[]
	categories: Category[]
	tags: Tag[]
}

//** Schema Lists END */
//** Schema Lists END */
//** Schema Lists END */

//** Seed mods START */
//? makes it easy to query data with Apollo tool and copy paste json into `seed_data.ts` without any reformatting
export type SeedPost = PostCreateInput & {
	content?: {
		document: any
	}
	tags?: {
		name: string
	}[]
	categories?: {
		name: string
	}[]
	author?: {
		email: string
	}
}

export type SeedBookings = BookingCreateInput & {
	service?: {
		name: string
	}
	location?: {
		name: string
	}
	addons?: {
		slug: string
	}[]
	employees?: {
		email: string
	}[]
	customer?: {
		email: string
	}
}

export type SeedEvents = EventCreateInput & {
	location?: {
		name: string
	}
	hosts?: {
		email: string
	}[]
	cohosts?: {
		email: string
	}[]
	categories?: {
		name: string
	}[]
	tags?: {
		name: string
	}[]
}

export type SeedService = ServiceCreateInput & {
	description?: {
		document: any
	}
	tags?: {
		name: string
	}[]
	categories?: {
		name: string
	}[]
	author?: {
		email: string
	}
	addons?: {
		slug: string
	}[]
}
//** Seed mods END*/

export type AddonCheckboxOptions = {
	name: string
	label: string
	id: string
	isChecked: boolean
	price: number | null
}

export type IDObj = {
	id: string
}

export type DateRange = {
	start: Date
	end: Date
}
export type StringRange = {
	start: string
	end: string
}
