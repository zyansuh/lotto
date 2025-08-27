export interface LottoNumbers {
  id: string;
  numbers: number[];
  bonusNumber: number;
  generatedAt: Date;
}

export interface LottoHistory {
  draws: LottoNumbers[];
}
