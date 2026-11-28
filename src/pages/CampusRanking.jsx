import React from "react";
import { LuTrophy } from "react-icons/lu";
import CampusSidebar from "../components/CampusSidebar.jsx";
import styles from "./CampusRanking.module.css";

export default function CampusRanking({ homePath }) {
  return (
    <div className={styles.page}>
      <CampusSidebar homePath={homePath} />
      <main className={styles.main}>
        <section className={styles.panel} aria-labelledby="ranking-title">
          <h1 id="ranking-title">리뷰 랭킹</h1>
          <div className={styles.empty}>
            <LuTrophy aria-hidden="true" />
            <p>아직 리뷰가 없어요.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
