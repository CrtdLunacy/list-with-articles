import styles from './page.module.css';
import file from '../app/api/data.json';
import {MediaGroupsModel} from "@/types/db.modal";
import {sleep} from "@/helpers/sleep";
import ArticlesWidget from "@/components/ArticlesWidget/ArticlesWidget";


export default async function Home() {
  await sleep(1000);

  return (
    <main className={styles.main}>
      <ArticlesWidget data={file.data as MediaGroupsModel[]} />
    </main>
  )
}
