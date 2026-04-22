import confetti from "canvas-confetti";

const messages = [
  { title: "เจ๋งมาก! 🔥", subtitle: "คุณเอาชนะตัวเองอีกแล้ว" },
  { title: "สุดยอด! 💪", subtitle: "ความพยายามวันนี้นับเป็นชัยชนะ" },
  { title: "Beast Mode ✨", subtitle: "ก้าวเล็กๆ ที่ยิ่งใหญ่" },
  { title: "Crushed it! 🚀", subtitle: "ร่างกายของคุณจะขอบคุณ" },
  { title: "ไฟแรง! ⚡", subtitle: "Streak กำลังพุ่ง อย่าหยุดนะ" },
  { title: "Champion! 🏆", subtitle: "ทุกหยดเหงื่อคือการลงทุน" },
];

export const getRandomCelebration = () =>
  messages[Math.floor(Math.random() * messages.length)];

export const fireConfetti = () => {
  const orange = ["#FB923C", "#F97316", "#EA580C", "#FFD700", "#FFFFFF"];

  const burst = (originX: number) => {
    confetti({
      particleCount: 80,
      spread: 70,
      startVelocity: 45,
      origin: { x: originX, y: 0.7 },
      colors: orange,
    });
  };

  burst(0.2);
  burst(0.5);
  burst(0.8);

  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 100,
      startVelocity: 55,
      origin: { x: 0.5, y: 0.6 },
      colors: orange,
      scalar: 1.2,
    });
  }, 250);
};
