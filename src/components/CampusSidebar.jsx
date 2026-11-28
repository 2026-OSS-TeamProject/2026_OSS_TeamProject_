import React from "react";
import { NavLink } from "react-router-dom";
import {
  LuHome,
  LuMessageSquare,
  LuTrophy,
  LuUtensils,
} from "react-icons/lu";
import styles from "./CampusSidebar.module.css";

export default function CampusSidebar({ homePath = "/home" }) {
  return (
    <aside className={styles.sidebar} aria-label="HGU 한끼 사이드바">
      <div className={styles.brand}>
        <span className={styles.brandIcon}>
          <LuUtensils aria-hidden="true" />
        </span>
        <div>
          <p className={styles.brandName}>HGU <span>한끼</span></p>
          <p className={styles.brandCaption}>한동대학교 학식 리뷰</p>
        </div>
      </div>

      <ul className={styles.menu} aria-label="메뉴">
        <li>
          <NavLink to={homePath} end className={`${styles.menuItem} ${styles.menuLink}`}>
            <LuHome aria-hidden="true" />홈
          </NavLink>
        </li>
        <li>
          <NavLink to="/campus/ranking" className={`${styles.menuItem} ${styles.menuLink}`}>
            <LuTrophy aria-hidden="true" />리뷰 랭킹
          </NavLink>
        </li>
        <li className={styles.menuItem}><LuMessageSquare aria-hidden="true" />내 리뷰</li>
      </ul>

    </aside>
  );
}
