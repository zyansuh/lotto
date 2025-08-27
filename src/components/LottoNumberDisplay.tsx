import { FC } from "react";
import { getBallColor } from "../utils/lottoGenerator";

interface LottoNumberDisplayProps {
  numbers: number[];
  bonusNumber?: number;
  showBonus?: boolean;
}

const LottoNumberDisplay: FC<LottoNumberDisplayProps> = ({
  numbers,
  bonusNumber,
  showBonus = true,
}) => {
  return (
    <div className="numbers-grid">
      {numbers.map((number, index) => (
        <div key={index} className={`number-ball ${getBallColor(number)}`}>
          {number}
        </div>
      ))}
      {showBonus && bonusNumber && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0 10px",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#666",
            }}
          >
            +
          </div>
          <div className={`number-ball bonus-ball`}>{bonusNumber}</div>
        </>
      )}
    </div>
  );
};

export default LottoNumberDisplay;
