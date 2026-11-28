const menuUrl = "https://smart.handong.edu/api/service/menu";
const mealNames = ["아침", "점심", "저녁"];

// API 응답에는 코너 이름이 없어 학생식당 배열의 순서로 구분한다.
const studentCafeterias = [
  "든든한동", "든든한동", "든든한동", "H:plate", "Asian Market", "Han's Deli", "따스한동",
];

export async function fetchCampusMenus(date, signal) {
  const response = await fetch(`${menuUrl}?date=${date.replace(/-/g, "")}`, { signal });
  if (!response.ok) throw new Error("식단 조회 실패");

  const { haksik, moms } = await response.json();
  if (!Array.isArray(haksik) || !Array.isArray(moms)) throw new Error("식단 응답 형식 오류");

  return [
    ...haksik.flatMap((entry, index) => {
      const cafeteria = studentCafeterias[index] || "학생식당";
      return readMenu(entry, `${date}-haksik-${index}`, cafeteria, mealNames[index], index < 3);
    }),
    ...moms.flatMap((entry, index) =>
      readMenu(entry, `${date}-moms-${index}`, "맘스키친", mealNames[index], index === 0)
    ),
  ];
}

function readMenu(entry, id, cafeteria, meal, isSet) {
  const lines = (entry?.menu_kor || "").split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !/^-?\s*원산지\s*:/.test(line));
  if (!lines.length) return [];

  if (isSet) {
    let name = lines.shift();
    if (lines[0]?.startsWith("&")) name += " " + lines.shift();
    return [{ id, cafeteria, meal, name, sides: lines.join(" · ") }];
  }

  const sidesIndex = lines.findIndex((line) => line.startsWith("*"));
  const dishes = sidesIndex === -1 ? lines : lines.slice(0, sidesIndex);
  return dishes.map((name, index) => ({ id: `${id}-${index}`, cafeteria, meal, name }));
}
