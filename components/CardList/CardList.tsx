'use client'

import {MediaGroupsModel} from "@/types/db.modal";
import CardItem from "@/app/components/Card/CardItem";
import styles from './CardList.module.css';
import React, {useEffect, useState} from "react";
import Modal from "@/app/components/Modal/Modal";
import { useSearchParams } from 'next/navigation';

interface CardProps {
  data: MediaGroupsModel[];
}

const CardList = ({data}: CardProps) => {
  const [articles, setArticles] = useState<MediaGroupsModel[]>([]);
  const searchParams = useSearchParams();
  const article = searchParams.get('article') || null;
  console.log(article);

  useEffect(() => {
    if(data.length < 8) {
      setArticles(data);
    }
    setArticles(data.slice(0, 8));
  }, [])

  const handleClickToShow = () => {
    setArticles(data);
  }

  return (
    <div className={styles.listModule}>
      {article && (
        <Modal>
          привет
        </Modal>
      )}
      <div className={styles.listWrapper}>
        {articles.map(item => (
              <CardItem
                key={item.id}
                item={item}
              />
        ))}
      </div>

      {articles.length >= 8 && (
        <button
          className={styles.left}
          onClick={handleClickToShow}
        >
          ПОКАЗАТЬ ВСЕ
          <span className={styles.right}></span>
        </button>
      )}
    </div>
  );
};

export default CardList;
