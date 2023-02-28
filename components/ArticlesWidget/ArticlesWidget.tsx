'use client'

import styles from "@/app/page.module.css";
import FilterItem from "@/components/FilterItem/FilterItem";
import {nanoid} from "nanoid";
import Image from "next/image";
import FilterButton from "@/public/buttonFilter.svg";
import CardList from "@/components/CardList/CardList";
import {MediaGroupsModel} from "@/types/db.modal";
import {mapApplicationData} from "@/helpers/mapApplicationData";
import {sortStringsByCount} from "@/helpers/sortStringsByCount";
import React, {useCallback, useEffect, useState} from "react";

interface ArticlesWidgetProps {
  data: MediaGroupsModel[]
}

const ArticlesWidget = ({data}: ArticlesWidgetProps) => {
  const [base, setBase] = useState<MediaGroupsModel[]>(Array.from(data))
  const filtersUnsort: string[] = Array.from(mapApplicationData(Array.from(data)));
  const filters = sortStringsByCount(filtersUnsort);
  const [filtred, setFiltred] = useState<string[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newFilter = Array.from(new Set([...filtred, e.currentTarget.innerText]));
    setFiltred(newFilter);
  }, [filtred]);

  useEffect(() => {
    if(filtred.length){
      let newData = filtred.map(item => Array.from(data).filter(el => el.application === item));
      let newBase = ([] as MediaGroupsModel[]).concat(...newData);
      setBase(newBase);
    }
  }, [filtred, data])

  const handleDropFilters = useCallback(() => {
    setBase(Array.from(data));
    setFiltred([]);
  }, [data]);
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
        <button
          className={styles.button}
          onClick={handleDropFilters}
        >
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
