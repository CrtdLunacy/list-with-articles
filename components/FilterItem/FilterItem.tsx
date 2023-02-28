'use client'

import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from './FilterItem.module.css';
interface FilterItemProps {
  item: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FilterItem = ({item, onClick}: FilterItemProps) => {

  return (
    <button
      className={styles.filter}
      onClick={onClick}
    >
      {item}
    </button>
  );
};

export default FilterItem;
