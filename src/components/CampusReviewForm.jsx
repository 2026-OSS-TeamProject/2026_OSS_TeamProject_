import React, { useState } from "react";
import styles from "../pages/CampusHome.module.css";

export default function CampusReviewForm({ dialogRef, cafeterias }) {
  const [showPreviewMessage, setShowPreviewMessage] = useState(false);

  function hidePreviewMessage() {
    setShowPreviewMessage(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShowPreviewMessage(true);
  }

  return (
    <dialog
      className={styles.reviewDialog}
      ref={dialogRef}
      aria-labelledby="review-title"
      onClose={hidePreviewMessage}
    >
      <h2 id="review-title">리뷰 작성</h2>
      <form className={styles.reviewForm} onInput={hidePreviewMessage} onSubmit={handleSubmit}>
        <label>
          식당
          <select name="cafeteria" defaultValue="" required>
            <option value="" disabled>식당을 선택해 주세요</option>
            {cafeterias.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <label>
          메뉴 이름
          <input name="menu" type="text" placeholder="메뉴 이름을 입력해 주세요" required />
        </label>
        <label>
          별점
          <select name="rating" defaultValue="" required>
            <option value="" disabled>별점을 선택해 주세요</option>
            {[1, 2, 3, 4, 5].map((score) => (
              <option key={score} value={score}>{score}점</option>
            ))}
          </select>
        </label>
        <label>
          리뷰
          <textarea name="review" rows={4} placeholder="소감을 남겨 주세요" required />
        </label>
        <label>
          사진 첨부 (선택)
          <input name="photo" type="file" accept="image/*" />
        </label>
        {showPreviewMessage && (
          <p className={styles.reviewNotice} role="status">미리보기에서는 리뷰를 저장하지 않아요.</p>
        )}
        <div className={styles.reviewButtons}>
          <button type="button" onClick={() => dialogRef.current.close()}>취소</button>
          <button type="submit" className={styles.writeReview}>리뷰 추가</button>
        </div>
      </form>
    </dialog>
  );
}
