
'use client'
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import { ColorsTheme } from '@ks/types';
import { colorThemeOptions, getColorTheme } from '../../lib/styleHelpers';
import { bg_c_plain } from '../../styles/colors.module.css';

export const card = component({
  label: 'Card',
  schema: {
    content: fields.child({
      kind: 'block',
      placeholder: 'content...',
      formatting: { 
        headingLevels: [2,3,4,5,6],
        inlineMarks: 'inherit', 
        softBreaks: 'inherit', 
        alignment: 'inherit', 
      },
      links: 'inherit',
    }),
    imageSrc: fields.url({
      label: 'Image URL',
      defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    }),
    // backgroundColor: fields.text({
    //   label: 'Background Color',
    // }),
    // color: fields.text({
    //   label: 'Text Color',
    // }),
    colorTheme: fields.select({
      label: 'Color Theme',
      options: colorThemeOptions,
      defaultValue: 'bg_c_plain'
    }),
    padding: fields.integer({
      label: 'Padding',
      defaultValue: 1
    }),
    margin: fields.text({
      label: 'Margin',
    }),
    fontSize: fields.text({
      label: 'Font Size',
      defaultValue: '1'
    }),
    width: fields.select({
      label: 'Verticle Alignment',
      options: [
        { label: 'full width', value: 'initial' },
        { label: 'fit content', value: 'fit-content' },
      ],
      defaultValue: 'initial'
    }),
    verticleAlign: fields.select({
      label: 'Verticle Alignment',
      options: [
        { label: 'start', value: 'start' },
        { label: 'center', value: 'center' },
        { label: 'end', value: 'end' },
      ],
      defaultValue: 'start'
    })
  },
  
  preview: function Preview(props) {

    const clrTheme = getColorTheme(props.fields.colorTheme.value)
    // const clrTheme = bg_c_plain

    return (

      <div style={{
        // ...(props.fields.color ? {color: props.fields.color.value} : {}),
        
        // border: 'solid 3px ' + props.fields.backgroundColor.value,
        // ...(props.fields.backgroundColor ? {backgroundColor: props.fields.backgroundColor.value} : {}),
        padding: props.fields.padding.value + 'rem',
        ...(props.fields.margin ? { margin: props.fields.margin.value} : {}),
        fontSize: props.fields.fontSize.value + 'rem',
        backgroundImage: props.fields.imageSrc.value,
        borderRadius: '5px',
        alignSelf: props.fields.verticleAlign.value,
      }}
      className={clrTheme}>
        {props.fields.content.element}
      </div>
    );
  },
});