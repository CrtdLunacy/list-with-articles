import styles from './page.module.css';
import file from '../app/api/data.json';
import {MediaGroupsModel} from "@/types/db.modal";
import {sleep} from "@/helpers/sleep";
import ArticlesWidget from "@/components/ArticlesWidget/ArticlesWidget";
import Image from "next/image";
import Dots from "@/public/dots.svg";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['cyrillic'],
  weight: ['400', '700'],
})

export default async function Home() {
  await sleep(1000);

  return (
    <main className={`${styles.main} ${montserrat.className}`}>
      <Image className={styles.dots} src={Dots} alt='dotsBachground'/>
      <ArticlesWidget data={file.data as MediaGroupsModel[]} />
    </main>
  )
}
