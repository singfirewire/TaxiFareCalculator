export const calculateFare = (km: number, slowMinutes: number): number => {
  let totalFare = 35; // ค่าแรกขึ้น
  let remainingKm = Math.max(0, km - 1); // หักระยะทาง 1 กม. แรกที่รวมในค่าแรกขึ้น

  if (remainingKm > 0) {
    // 1-10 กม.
    const firstRate = Math.min(remainingKm, 9);
    totalFare += firstRate * 5.5;
    remainingKm -= firstRate;

    // 10-20 กม.
    if (remainingKm > 0) {
      const secondRate = Math.min(remainingKm, 10);
      totalFare += secondRate * 6.5;
      remainingKm -= secondRate;
    }

    // 20-40 กม.
    if (remainingKm > 0) {
      const thirdRate = Math.min(remainingKm, 20);
      totalFare += thirdRate * 7.5;
      remainingKm -= thirdRate;
    }

    // 40-60 กม.
    if (remainingKm > 0) {
      const fourthRate = Math.min(remainingKm, 20);
      totalFare += fourthRate * 8;
      remainingKm -= fourthRate;
    }

    // 60-80 กม.
    if (remainingKm > 0) {
      const fifthRate = Math.min(remainingKm, 20);
      totalFare += fifthRate * 9;
      remainingKm -= fifthRate;
    }

    // 80+ กม.
    if (remainingKm > 0) {
      totalFare += remainingKm * 10.5;
    }
  }

  // เพิ่มค่าธรรมเนียมรถติด
  totalFare += slowMinutes * 2;

  return Math.round(totalFare);
};
