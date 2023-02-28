import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {MediaGroupsModel} from "@/types/db.modal";
import styles from "./Article.module.css";

interface ArticleProps {
  data: MediaGroupsModel[]
}

const Article = ({data}: ArticleProps) => {
  const searchParams = useSearchParams();
  const articleId = searchParams.get('article') || null;
  const article = data.filter(item => item.id === articleId)[0];
  const router = useRouter();

  const handleClosing = () => {
    router.push('/')
  }

  return (
    <article>
      <div className={styles.artHeader}>
        <button
          className={styles.close}
          onClick={handleClosing}
        ></button>
        <p className={styles.application}>{article.application}</p>
        <p className={styles.locate}>
          {`${article.country}`}
          {article.city ? <span>{`, ${article.city}`}</span> : null}
        </p>
        <h3 className={styles.title}>{article.title}</h3>
      </div>

      <div className={styles.artBody}>
        {article.object && (
          <p className={styles.details}>
            <span className={styles.detailsName}>ОБЪЕКТ ВНЕДРЕНИЯ</span>
            {article.object}
          </p>
        )}

        {article?.solution?.description && (
          <p className={styles.details}>
            <span className={styles.detailsName}>ПРИМЕНЯЕМОЕ РЕШЕНИЕ</span>
            {article.solution.description}
          </p>
        )}

        {article.developer && (
          <p className={styles.details}>
            <span className={styles.detailsName}>РАЗРАБОТЧИК</span>
            {article.developer}
          </p>
        )}
      </div>

      <div className={styles.artFoot}>
        <p className={styles.detailsName}>ОПИСАНИЕ</p>
        <p className={styles.description}>{String(article.description)
          .replace(/(<([^>]+)>)/ig, '')}</p>
      </div>


    </article>
  );
};

export default Article;
