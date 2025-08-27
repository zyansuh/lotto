import React, { useState, useEffect } from "react";
import { Dices, Sparkles } from "lucide-react";
import { LottoNumbers } from "./types/lotto";
import { generateLottoDraw } from "./utils/lottoGenerator";
import LottoNumberDisplay from "./components/LottoNumberDisplay";
import LottoHistory from "./components/LottoHistory";

const STORAGE_KEY = "lotto-history";

function App() {
  const [currentDraw, setCurrentDraw] = useState<LottoNumbers | null>(null);
  const [history, setHistory] = useState<LottoNumbers[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // 로컬 스토리지에서 기록 불러오기
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        const historyWithDates = parsed.map((item: any) => ({
          ...item,
          generatedAt: new Date(item.generatedAt),
        }));
        setHistory(historyWithDates);
      } catch (error) {
        console.error("기록 불러오기 오류:", error);
      }
    }
  }, []);

  // 기록 저장하기
  const saveToHistory = (draw: LottoNumbers) => {
    const newHistory = [...history, draw];
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  // 로또번호 생성
  const handleGenerateNumbers = async () => {
    setIsGenerating(true);

    // 애니메이션 효과를 위한 딜레이
    setTimeout(() => {
      const newDraw = generateLottoDraw();
      setCurrentDraw(newDraw);
      saveToHistory(newDraw);
      setIsGenerating(false);
    }, 1000);
  };

  // 기록 전체 삭제
  const handleClearHistory = () => {
    if (window.confirm("정말로 모든 기록을 삭제하시겠습니까?")) {
      setHistory([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="app">
      <div>
        <h1 className="title">
          <Sparkles
            size={40}
            style={{ display: "inline", marginRight: "10px", color: "#667eea" }}
          />
          로또번호 생성기
        </h1>
        <p className="subtitle">
          행운의 번호를 찾아보세요! 1부터 45까지의 숫자 중 6개와 보너스번호
          1개를 생성합니다.
        </p>
      </div>

      <button
        className="generate-button"
        onClick={handleGenerateNumbers}
        disabled={isGenerating}
      >
        <Dices size={24} />
        {isGenerating ? "번호 생성 중..." : "로또번호 생성하기"}
      </button>

      {currentDraw && (
        <div className="numbers-container">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#2d3748",
              marginBottom: "20px",
            }}
          >
            🎯 생성된 번호
          </h2>
          <LottoNumberDisplay
            numbers={currentDraw.numbers}
            bonusNumber={currentDraw.bonusNumber}
          />
          <p
            style={{ marginTop: "15px", color: "#718096", fontSize: "0.9rem" }}
          >
            생성 시간: {currentDraw.generatedAt.toLocaleString("ko-KR")}
          </p>
        </div>
      )}

      <LottoHistory history={history} onClearHistory={handleClearHistory} />

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#f7fafc",
          borderRadius: "15px",
          fontSize: "0.9rem",
          color: "#4a5568",
        }}
      >
        <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
          💡 사용 방법
        </h3>
        <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
          <li>위의 "로또번호 생성하기" 버튼을 클릭하세요</li>
          <li>
            1-45 범위에서 중복되지 않는 6개 번호와 보너스번호 1개가 생성됩니다
          </li>
          <li>생성된 모든 번호는 자동으로 기록에 저장됩니다</li>
          <li>번호는 로컬 스토리지에 저장되어 브라우저를 닫아도 유지됩니다</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
