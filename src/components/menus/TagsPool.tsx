import Link from "next/link"
import styles from '@styles/tags.module.scss'
import fetchTags from "@lib/fetchdata/fetchTags"
import { Tag } from "@ks/types"


export async function TagsPool() {

  const {tags} = await fetchTags()

  return (
    <ul className={styles.tags}>
      {tags?.map((t:Tag, i:number) => (
        <li key={i}>
          <Link key={t.name} className='tag' href={`/tags/${t.name}`} >{t.name}</Link>
        </li>
      ))}
    </ul>
  )
}