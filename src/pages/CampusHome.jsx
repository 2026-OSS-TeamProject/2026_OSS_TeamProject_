import React, { useRef, useState } from "react";
import {
  LuCalendarDays, LuChevronLeft, LuChevronRight, LuClock,
  LuCoffee, LuMoon, LuPencil, LuSearch, LuSun,
} from "react-icons/lu";
import CampusReviewForm from "../components/CampusReviewForm.jsx";
import styles from "./CampusHome.module.css";

const meals = [
  { name: "아침", time: "08:00–09:30", Icon: LuCoffee },
  { name: "점심", time: "11:30–14:00", Icon: LuSun },
  { name: "저녁", time: "17:30–19:00", Icon: LuMoon },
];
const cafeterias = ["든든한동", "따스한동", "H:plate", "맘스키친"];

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
  timeZone: "UTC",
});

export default function CampusHome() {
  const [dayOffset, setDayOffset] = useState(0);
  const [meal, setMeal] = useState(meals[1]);
  const [cafeteria, setCafeteria] = useState("전체");
  const reviewDialog = useRef(null);
  // 미리보기는 2026년 11월 28일에서 시작한다.
  const date = new Date(Date.UTC(2026, 10, 28 + dayOffset));

  return (
    <main className={styles.home}>
      <header className={styles.topbar}>
        <span>한동대학교</span>
        <label className={styles.search}>
          <LuSearch aria-hidden="true" />
          <input type="search" aria-label="메뉴 이름 검색" placeholder="메뉴 이름으로 검색해 보세요" />
        </label>
      </header>

      <div className={styles.content}>
        <section className={styles.panel} aria-labelledby="daily-menu-title">
          <header className={styles.panelHeader}>
            <span className={styles.panelIcon}><LuCalendarDays aria-hidden="true" /></span>
            <div>
              <h1 id="daily-menu-title">오늘의 식단</h1>
              <p>날짜와 식사 시간을 선택해 보세요.</p>
            </div>
            <button
              type="button"
              className={styles.writeReview}
              aria-haspopup="dialog"
              onClick={() => reviewDialog.current.showModal()}
            >
              <LuPencil aria-hidden="true" />
              리뷰 작성
            </button>
          </header>

          <CampusReviewForm dialogRef={reviewDialog} cafeterias={cafeterias} />

          <div className={styles.date}>
            <button type="button" aria-label="이전 날짜" onClick={() => setDayOffset((day) => day - 1)}>
              <LuChevronLeft aria-hidden="true" />
            </button>
            <time dateTime={date.toISOString().slice(0, 10)} aria-live="polite">
              <LuCalendarDays aria-hidden="true" />
              {dateFormatter.format(date)}
            </time>
            <button type="button" aria-label="다음 날짜" onClick={() => setDayOffset((day) => day + 1)}>
              <LuChevronRight aria-hidden="true" />
            </button>
          </div>

          <div className={styles.meals} role="group" aria-label="식사 시간">
            {meals.map((item) => (
              <button
                type="button"
                key={item.name}
                aria-pressed={meal.name === item.name}
                onClick={() => setMeal(item)}
              >
                <item.Icon aria-hidden="true" />
                {item.name}
              </button>
            ))}
          </div>

          <div className={styles.toolbar}>
            <div className={styles.cafeterias} role="group" aria-label="식당">
              {["전체", ...cafeterias].map((name) => (
                <button type="button" key={name} aria-pressed={cafeteria === name} onClick={() => setCafeteria(name)}>
                  {name}
                </button>
              ))}
            </div>
            <span className={styles.hours}><LuClock aria-hidden="true" />{meal.time}</span>
          </div>
        </section>
      </div>
    </main>
  );
}
