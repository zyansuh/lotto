import { FC } from "react";
import { LottoNumbers } from "../types/lotto";
import LottoNumberDisplay from "./LottoNumberDisplay";

interface LottoHistoryProps {
  history: LottoNumbers[];
  onClearHistory: () => void;
}

const LottoHistory: FC<LottoHistoryProps> = ({
  history,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="history-section">
      <h2 className="history-title">생성된 번호 기록</h2>
      <div>
        {history
          .slice()
          .reverse()
          .map((draw, index) => (
            <div key={draw.id} className="history-item">
              <div className="history-date">
                {index + 1}회차 -{" "}
                {draw.generatedAt.toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <LottoNumberDisplay
                numbers={draw.numbers}
                bonusNumber={draw.bonusNumber}
              />
            </div>
          ))}
      </div>
      {history.length > 0 && (
        <button className="clear-button" onClick={onClearHistory}>
          기록 전체 삭제
        </button>
      )}
    </div>
  );
};

export default LottoHistory;
