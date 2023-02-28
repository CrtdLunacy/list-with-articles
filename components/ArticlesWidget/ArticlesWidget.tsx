'use client'

import styles from "@/app/page.module.css";
import FilterItem from "@/app/components/FilterItem/FilterItem";
import {nanoid} from "nanoid";
import Image from "next/image";
import FilterButton from "@/public/buttonFilter.svg";
import CardList from "@/app/components/CardList/CardList";
import {MediaGroupsModel} from "@/types/db.modal";
import {mapApplicationData} from "@/helpers/mapApplicationData";
import {sortStringsByCount} from "@/helpers/sortStringsByCount";
import React, {useCallback, useState} from "react";
import {useRouter} from "next/router";
import Modal from "@/app/components/Modal/Modal";

interface ArticlesWidgetProps {
  data: MediaGroupsModel[]
}

const ArticlesWidget = ({data}: ArticlesWidgetProps) => {
  const base = Array.from(data) as MediaGroupsModel[];
  const filtersUnsort = Array.from(mapApplicationData(base));
  const filters = sortStringsByCount(filtersUnsort);
  const [filtred, setFiltred] = useState<string[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFiltred([...filtred, e.currentTarget.innerText]);
  }, [filtred]);

  console.log(filtred);
  return (
    <div className={styles.frame}>
      {/*заголовок*/}
      <h1 className={styles.title}>Заголовок <span className={styles.count}>{`(${base.length})`}</span></h1>

      {/*фильтр модуль*/}
      <div className={styles.filterModule}>
        <div className={styles.listWrapper}>
          {filters.map(item => (
            <FilterItem
              key={nanoid()}
              item={item}
              onClick={handleClick}
            />
          ))}
        </div>
        <button className={styles.button}>
          <Image src={FilterButton} alt={'Filter'} />
          <p>СБРОСИТЬ ВСЕ фильтры</p>
        </button>
      </div>

      {/*блок данных*/}
      <CardList data={base} />
    </div>
  );
};

export default ArticlesWidget;
