import React from "react";
import {
  LuHome,
  LuInfo,
  LuMessageSquare,
  LuTrophy,
  LuUtensils,
} from "react-icons/lu";
import styles from "./CampusSidebar.module.css";

const menuItems = [
  { label: "홈", Icon: LuHome, current: true },
  { label: "리뷰 랭킹", Icon: LuTrophy, onClick: () => window.alert("구현해야함") },
  { label: "내 리뷰", Icon: LuMessageSquare },
];

export default function CampusSidebar() {
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

      <ul className={styles.menu} aria-label="메뉴 미리보기">
        {menuItems.map(({ label, Icon, current, onClick }) => {
          const content = <><Icon aria-hidden="true" />{label}</>;

          return onClick ? (
            <li key={label}>
              <button type="button" className={`${styles.menuItem} ${styles.menuButton}`} onClick={onClick}>
                {content}
              </button>
            </li>
          ) : (
            <li className={styles.menuItem} key={label} aria-current={current ? "page" : undefined}>
              {content}
            </li>
          );
        })}
      </ul>

      
    </aside>
  );
}
