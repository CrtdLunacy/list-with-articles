import React from 'react';
import Link from "next/link";
import {MediaGroupsModel} from "@/types/db.modal";
import styles from './CardItem.module.css';
import {convertDate} from "@/helpers/convertDate";

interface CardItemProps {
  item: Pick<MediaGroupsModel, 'country' | 'city' | 'title' | 'id' | 'updated' | 'created'>;
}

const CardItem = ({item}: CardItemProps) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <p className={styles.locate}>
          {`${item.country}`}
          {item.city ? <span>{`, ${item.city}`}</span> : null}
        </p>
        <h2 className={styles.title}>{item.title}</h2>
        <Link className={styles.link} href={`/${item.id}`}>Посмотреть</Link>
      </div>
      <span className={styles.date}>
        {item.updated ? `Обновлено ${convertDate(item.updated)}` : `Добавлено ${convertDate(item.created)}`}
      </span>
    </div>
  );
};

export default CardItem;
