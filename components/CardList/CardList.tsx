'use client'

import {MediaGroupsModel} from "@/types/db.modal";
import CardItem from "@/components/Card/CardItem";
import styles from './CardList.module.css';
import React, {useEffect, useRef, useState} from "react";
import Modal from "@/components/Modal/Modal";
import { useSearchParams } from 'next/navigation';
import Article from "@/components/Article/Article";
import {nanoid} from "nanoid";

interface CardProps {
  data: MediaGroupsModel[];
}

const CardList = ({data}: CardProps) => {
  const [articles, setArticles] = useState<MediaGroupsModel[]>([]);
  const [range, setRange] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hideState, setHideState] = useState(false);
  const searchParams = useSearchParams();
  const article = searchParams.get('article') || null;

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if(width < 800) setIsMobile(true)
    });

    observer.observe(document.body);
    }, []);

  useEffect(() => {
    if(data.length < 8) {
      setArticles(data);
    }
    setArticles(data.slice(0, 8));
  }, [data])

  const handleClickToShow = () => {
    if(!isMobile) {
      setArticles(data);
      setHideState(true);
    } else {
      if(articles.length == data.length) {
        setHideState(true);
        return;
      }
      const newData = data.slice(range, range+8);
      setRange(prev => prev + 8);
      setArticles([...articles, ...newData]);
    }
  }


  const handleClickToHide = () => {
    setArticles(data.slice(0, 8));
    setHideState(false);
  }

  return (
    <div className={styles.listModule}>
      {article && (
        <Modal>
          <Article data={data}/>
        </Modal>
      )}
      <div className={styles.listWrapper}>
        {articles.map(item => (
              <CardItem
                key={nanoid()}
                item={item}
              />
        ))}
      </div>

      {articles.length >= 8 && !hideState && !isMobile &&  (
        <button
          className={styles.left}
          onClick={handleClickToShow}
        >
          ПОКАЗАТЬ ВСЕ
          <span className={styles.right}></span>
        </button>
      )}

      {articles.length >= 8 && hideState && (
        <button
          className={styles.left}
          onClick={handleClickToHide}
        >
          СКРЫТЬ ВСЕ
          <span className={styles.right}></span>
        </button>
      )}

      {isMobile && !hideState && (
        <button
          className={styles.left}
          onClick={handleClickToShow}
        >
          ПОКАЗАТЬ ЕЩЕ
          <span className={styles.right}></span>
        </button>
      )}
    </div>
  );
};

export default CardList;
