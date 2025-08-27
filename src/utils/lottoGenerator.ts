import { LottoNumbers } from "../types/lotto";

// 로또번호 생성 함수 (1-45 중 6개 + 보너스번호 1개)
export const generateLottoNumbers = (): number[] => {
  const numbers: number[] = [];

  while (numbers.length < 6) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }

  return numbers.sort((a, b) => a - b);
};

// 보너스번호 생성 (메인 번호와 중복되지 않게)
export const generateBonusNumber = (mainNumbers: number[]): number => {
  let bonusNumber: number;

  do {
    bonusNumber = Math.floor(Math.random() * 45) + 1;
  } while (mainNumbers.includes(bonusNumber));

  return bonusNumber;
};

// 전체 로또 추첨 생성
export const generateLottoDraw = (): LottoNumbers => {
  const numbers = generateLottoNumbers();
  const bonusNumber = generateBonusNumber(numbers);

  return {
    id: Date.now().toString(),
    numbers,
    bonusNumber,
    generatedAt: new Date(),
  };
};

// 번호에 따른 공 색상 결정
export const getBallColor = (number: number): string => {
  if (number <= 10) return "yellow";
  if (number <= 20) return "blue";
  if (number <= 30) return "red";
  if (number <= 40) return "gray";
  return "green";
};
