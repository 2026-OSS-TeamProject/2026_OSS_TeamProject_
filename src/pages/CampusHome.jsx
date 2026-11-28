import React, { useEffect, useRef, useState } from "react";
import {
  LuCalendarDays, LuChevronLeft, LuChevronRight, LuClock,
  LuCoffee, LuMoon, LuPencil, LuSearch, LuSun,
} from "react-icons/lu";
import CampusReviewForm from "../components/CampusReviewForm.jsx";
import { fetchCampusMenus } from "../data/campusMenus";
import styles from "./CampusHome.module.css";

const meals = [
  { name: "아침", time: "08:00–09:30", Icon: LuCoffee },
  { name: "점심", time: "11:30–14:00", Icon: LuSun },
  { name: "저녁", time: "17:30–19:00", Icon: LuMoon },
];
const cafeterias = ["든든한동", "따스한동", "H:plate", "맘스키친"];
const seoulDate = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul" });

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
  timeZone: "UTC",
});

export default function CampusHome() {
  const [meal, setMeal] = useState(meals[1]);
  const [cafeteria, setCafeteria] = useState("전체");
  const [search, setSearch] = useState("");
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [menus, setMenus] = useState(null);
  const [date, setDate] = useState(() => new Date(seoulDate.format(new Date())));
  const reviewDialog = useRef(null);
  const dateKey = date.toISOString().slice(0, 10);
  const currentMenus = menus?.date === dateKey ? menus : null;

  useEffect(() => {
    const controller = new AbortController();

    fetchCampusMenus(dateKey, controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) setMenus({ date: dateKey, items });
      })
      .catch(() => {
        if (!controller.signal.aborted) setMenus({ date: dateKey, items: [], error: true });
      });

    return () => controller.abort();
  }, [dateKey]);

  function changeDate(days) {
    setMenus(null);
    setSelectedMenuId(null);
    setDate((previous) => new Date(previous.getTime() + days * 86400000));
  }

  const mealMenus = (currentMenus?.items || []).filter((menu) =>
    menu.meal === meal.name || (!menu.meal && meal.name !== "아침")
  );
  const menuList = mealMenus.filter((menu) =>
    (cafeteria === "전체" || menu.cafeteria === cafeteria) &&
    (menu.name + " " + (menu.sides || "")).toLowerCase().includes(search.trim().toLowerCase())
  );
  const selectedMenu = menuList.find((menu) => menu.id === selectedMenuId);

  return (
    <main className={styles.home}>
      <header className={styles.topbar}>
        <span>한동대학교</span>
        <label className={styles.search}>
          <LuSearch aria-hidden="true" />
          <input
            type="search"
            aria-label="메뉴 이름 검색"
            placeholder="메뉴 이름으로 검색해 보세요"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
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
          </header>

          <div className={styles.date}>
            <button type="button" aria-label="이전 날짜" onClick={() => changeDate(-1)}>
              <LuChevronLeft aria-hidden="true" />
            </button>
            <time dateTime={dateKey} aria-live="polite">
              <LuCalendarDays aria-hidden="true" />
              {dateFormatter.format(date)}
            </time>
            <button type="button" aria-label="다음 날짜" onClick={() => changeDate(1)}>
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
          {!currentMenus ? (
            <p className={styles.emptyMenu} role="status">스마트캠퍼스 식단을 불러오는 중이에요.</p>
          ) : currentMenus.error ? (
            <p className={styles.emptyMenu} role="status">스마트캠퍼스 식단을 불러오지 못했어요.</p>
          ) : menuList.length === 0 ? (
            <p className={styles.emptyMenu} role="status">조건에 맞는 메뉴가 없어요.</p>
          ) : (
            <ul className={styles.menuList} aria-label="식단 메뉴">
              {menuList.map((menu) => (
                <li key={menu.id} className={styles.menuCard}>
                  <button
                    type="button"
                    className={styles.menuButton}
                    aria-expanded={selectedMenuId === menu.id}
                    onClick={() => setSelectedMenuId(selectedMenuId === menu.id ? null : menu.id)}
                  >
                    <span>
                      <small>{menu.cafeteria}</small>
                      <strong>{menu.name}</strong>
                      {menu.sides && <small>{menu.sides}</small>}
                    </span>
                    <LuChevronRight aria-hidden="true" />
                  </button>
                  {selectedMenuId === menu.id && (
                    <div className={styles.menuDetail}>
                      <p className={styles.menuRating}>평균 별점 — · 리뷰 0개</p>
                      <h2>최근 리뷰</h2>
                      <p>아직 작성된 리뷰가 없어요.</p>
                      <button
                        type="button"
                        className={styles.writeReview}
                        aria-haspopup="dialog"
                        onClick={() => reviewDialog.current.showModal()}
                      >
                        <LuPencil aria-hidden="true" />
                        리뷰 작성
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          {selectedMenu && (
            <CampusReviewForm key={selectedMenu.id} dialogRef={reviewDialog} menu={selectedMenu} />
          )}
        </section>
      </div>
    </main>
  );
}
