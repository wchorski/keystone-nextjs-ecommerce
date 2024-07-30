import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { relationship, text, } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";



export const Tag:Lists.Tag = list({

  access: {
    filter: {
      query: () => true,
      update: rules.canManageTags,
      delete: rules.canManageTags,
    },
    operation: {
      create: permissions.canManageTags,
      query: () => true,
      update: permissions.canManageTags,
      delete: permissions.canManageTags,
    }
  },

  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  // todo hide these again
  // ui: {
  //   isHidden: true,
  // },

  // this is the fields for our Tag list
  fields: {
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    // todo make status 'DRAFT' 'PUBLIC' etc
    posts: relationship({ ref: 'Post.tags', many: true }),
    pages: relationship({ ref: 'Page.tags', many: true }),
  },
})