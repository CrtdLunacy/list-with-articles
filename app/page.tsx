import './page.css';
import file from '../app/api/data.json';
import {MediaGroupsModel} from "@/types/db.modal";
import {sleep} from "@/helpers/sleep";
import ArticlesWidget from "@/components/ArticlesWidget/ArticlesWidget";
import Image from "next/image";
import Dots from "@/public/dots.svg";



export default async function Home() {
  await sleep(1000);

  return (
    <main className={`main`}>
      <Image className="dots" src={Dots} alt='dotsBachground'/>
      <ArticlesWidget data={file.data as MediaGroupsModel[]} />
    </main>
  )
}
