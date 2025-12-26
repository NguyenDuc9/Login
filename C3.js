const questions = [
  // ===== CHƯƠNG 3: TRƯỜNG TĨNH ĐIỆN =====

  // Câu 1
  {
    q: "Hai vật tích điện +16C và –5C trao đổi điện tích với nhau. Điện tích sau đó không thể là:",
    a: ["+5C, +6C", "+4C, +4C", "–3C, +14C", "–9C, +20C"],
    c: 0,
  },

  // Câu 2
  {
    q: "Điện tích Q = –5·10⁻⁸ C đặt trong không khí. Cường độ điện trường tại điểm cách Q 30cm là:",
    a: ["15 kV/m", "5 kV/m", "15 V/m", "5 V/m"],
    c: 1,
  },

  // Câu 3
  {
    q: "Hai quả cầu nhỏ giống nhau tích điện cùng dấu. Sau khi cho tiếp xúc rồi đưa về vị trí cũ, cường độ điện trường tại trung điểm là:",
    a: ["500 V/m", "250 V/m", "100 V/m", "0 V/m"],
    c: 3,
  },

  // Câu 4
  {
    q: "Phát biểu nào sau đây là SAI?",
    a: [
      "Vector cường độ điện trường đặc trưng tác dụng lực",
      "Trong điện môi E giảm ε lần",
      "Đơn vị E là V/m",
      "Điện trường tĩnh có E không đổi tại mọi điểm",
    ],
    c: 3,
  },

  // Câu 5
  {
    q: "Vector cường độ điện trường tổng hợp tại M được tính bởi:",
    a: [
      "E = E1 + E2 nếu Q1,Q2 cùng dấu",
      "E = E1 − E2 nếu Q1,Q2 trái dấu",
      "Luôn: E = E1 + E2",
      "E = E1 + E2 (độ lớn)",
    ],
    c: 2,
  },

  // Câu 6
  {
    q: "Cường độ điện trường do mặt phẳng tích điện đều gây ra:",
    a: ["E = σ/ε₀", "E = 2σ/ε₀", "E = σ/(2ε₀)", "E = σ/(2aε₀)"],
    c: 2,
  },

  // Câu 7
  {
    q: "Điện tích của vật dẫn tích điện phân bố:",
    a: [
      "Đều trong thể tích",
      "Đều trên bề mặt",
      "Chỉ trong lòng",
      "Trên bề mặt phụ thuộc hình dạng",
    ],
    c: 3,
  },

  // Câu 8
  {
    q: "Phát biểu SAI về quả cầu đặc mang điện:",
    a: [
      "Điện tích trên bề mặt",
      "Phân bố đều trên bề mặt",
      "E trong lòng ≠ 0",
      "Điện thế trong lòng ≠ 0",
    ],
    c: 2,
  },

  // Câu 9
  {
    q: "Điện tích dương trong điện trường đều hướng Ox chuyển động:",
    a: [
      "Thẳng nhanh dần đều theo Ox",
      "Thẳng nhanh dần đều ngược Ox",
      "Thẳng đều theo Ox",
      "Thẳng đều ngược Ox",
    ],
    c: 0,
  },

  // Câu 10
  {
    q: "Cường độ điện trường tại điểm trên trục vòng dây (cách tâm R):",
    a: ["k|Q|/R²", "k|Q|/(√2 R²)", "k|Q|/(2√2 R²)", "0"],
    c: 2,
  },

  // Câu 11
  {
    q: "Cường độ điện trường tại tâm vòng dây tích điện đều:",
    a: ["k|Q|/R²", "k|Q|/(√2 R²)", "k|Q|/(2√2 R²)", "0"],
    c: 3,
  },

  // Câu 12
  {
    q: "6 điện tích ±q đặt xen kẽ tại lục giác đều. E tại tâm O là:",
    a: ["kq/a²", "6kq/a²", "3kq/a²", "0"],
    c: 3,
  },

  // Câu 13
  {
    q: "Cường độ điện trường do dây thẳng dài vô hạn:",
    a: ["k|λ|/h", "2k|λ|/h", "k|λ|/h²", "k|λ|/(2h)"],
    c: 1,
  },

  // Câu 14
  {
    q: "Dây tích điện λ = –6·10⁻⁹ C/m, h = 20cm. E bằng:",
    a: ["270 V/m", "1350 V/m", "540 V/m", "135 V/m"],
    c: 3,
  },

  // Câu 15
  {
    q: "Mặt phẳng tích điện σ = 17,7·10⁻¹⁰ C/m². E bằng:",
    a: ["100 V/m", "10 V/m", "1000 V/m", "200 V/m"],
    c: 0,
  },

  // Câu 16
  {
    q: "Hai điện tích q và 4q cách nhau 30cm. Điểm đứng yên cách A:",
    a: ["7,5cm", "10cm", "20cm", "22,5cm"],
    c: 1,
  },

  // Câu 17
  {
    q: "Hai điện tích 3µC và 12µC cách 30cm. Lực tương tác:",
    a: ["0,36 N", "3,6 N", "0,036 N", "36 N"],
    c: 0,
  },

  // Câu 18
  {
    q: "Hai quả cầu sau khi chạm nhau rồi đưa về vị trí cũ:",
    a: ["Không tương tác", "Hút nhau 2N", "Đẩy nhau 2N", "F ≠ 2N"],
    c: 3,
  },

  // Câu 19
  {
    q: "Hai điện tích hút nhau 10⁻⁶ N ở 10cm. Ở 2cm lực là:",
    a: ["2,5·10⁻⁵ N", "5·10⁻⁶ N", "8·10⁻⁶ N", "4·10⁻⁸ N"],
    c: 0,
  },

  // Câu 20
  {
    q: "Hai điện tích bằng nhau trái dấu. Lực tác dụng lên Q < 0:",
    a: ["Về x", "Về y", "Về q1", "Bằng 0 tại trung điểm"],
    c: 3,
  },

  // Câu 21
  {
    q: "Đơn vị của thông lượng điện cảm ΦD:",
    a: ["V/m", "Vm", "C/m²", "C"],
    c: 2,
  },

  // Câu 22
  {
    q: "Hai điện tích nằm ngoài mặt kín (S). ΦE bằng:",
    a: ["3·10⁻⁶", "3,4·10⁵", "0", "9·10⁵"],
    c: 2,
  },

  // Câu 23
  {
    q: "Hai điện tích nằm trong mặt kín (S). ΦE bằng:",
    a: ["3·10⁻⁶", "3,4·10⁵", "0", "9·10⁵"],
    c: 0,
  },

  // Câu 24
  {
    q: "Đường sức điện là đường:",
    a: [
      "Vuông góc E",
      "Tiếp tuyến trùng phương E",
      "Pháp tuyến trùng E",
      "Do mạt sắt",
    ],
    c: 1,
  },

  // Câu 25
  {
    q: "Điện thông qua mặt kín bằng 0 thì:",
    a: [
      "Không có điện tích",
      "Tổng điện tích = 0",
      "Không có đường ra",
      "Không có điện trường",
    ],
    c: 1,
  },

  // Câu 26
  {
    q: "Phát biểu SAI về quả cầu kim loại tích điện:",
    a: [
      "Không có điện tích trong lòng",
      "E trong lòng = 0",
      "Điện tích đều trên bề mặt",
      "Điện thế tâm lớn hơn bề mặt",
    ],
    c: 3,
  },

  // Câu 27
  {
    q: "Ba điện tích q đặt tại tam giác đều. Lực tác dụng lên q1:",
    a: ["64,8 N", "56,1 N", "28,1 N", "32,4 N"],
    c: 1,
  },

  // Câu 28
  {
    q: "E tại M (MA=8cm, MB=6cm):",
    a: ["18,75·10⁶", "7,2·10⁶", "5,85·10⁶", "6,48·10⁶"],
    c: 2,
  },

  // Câu 29
  {
    q: "E tại M (MA=10cm, MB=20cm):",
    a: ["3,6·10⁶", "7,2·10⁶", "5,85·10⁶", "8,55·10⁶"],
    c: 0,
  },

  // Câu 30
  {
    q: "E tại M (MA=MB=5cm):",
    a: ["50,4·10⁶", "7,2·10⁶", "5,85·10⁶", "0"],
    c: 3,
  },

  // Câu 31
  {
    q: "Điện tích trong mặt cầu tăng 3 lần thì điện thông:",
    a: ["Tăng 3 lần", "Không đổi", "Giảm 3 lần", "Tăng 9 lần"],
    c: 0,
  },

  // Câu 32
  {
    q: "Quan hệ công – điện thế:",
    a: [
      "A = q(VM − VN)",
      "A = |q|(VM − VN)",
      "A = (WM − WN)/q",
      "A = q(VN − VM)",
    ],
    c: 0,
  },

  // Câu 33
  {
    q: "Điện thông qua mặt cầu tâm B:",
    a: ["5·10⁻⁹", "565", "4,4·10⁻²⁰", "0"],
    c: 3,
  },

  // Câu 34
  {
    q: "Cường độ điện trường tại tâm quả cầu kim loại rỗng:",
    a: ["5,4·10⁶", "5,4·10⁸", "5,4·10⁹", "0"],
    c: 3,
  },

  // Câu 35
  {
    q: "Cường độ điện trường tại trung điểm AB:",
    a: ["150", "250", "177,8", "189,8"],
    c: 2,
  },

  // Câu 36
  {
    q: "Công của lực điện trường tác dụng lên electron:",
    a: ["8,1·10⁻¹⁷", "−8,1·10⁻¹⁷", "1,6·10⁻¹⁷", "−1,6·10⁻¹⁷"],
    c: 3,
  },

  // Câu 37
  { q: "Khoảng cách để lực còn 2,5N:", a: ["1cm", "4cm", "8cm", "10cm"], c: 2 },

  // Câu 38
  {
    q: "Kéo khoảng cách bản tụ tăng gấp đôi, E:",
    a: ["Tăng 2 lần", "Giảm 2 lần", "Tăng 4 lần", "Không đổi"],
    c: 3,
  },

  // Câu 39
  {
    q: "Công của lực điện trường:",
    a: [
      "q(kQ/rM − kQ/rN)",
      " |q|(kQ/rM − kQ/rN)",
      "q(kQ/rN − kQ/rM)",
      "k|Qq|(1/rM − 1/rN)",
    ],
    c: 0,
  },

  // Câu 40
  {
    q: "Phát biểu SAI:",
    a: [
      "Cùng dấu đẩy nhau",
      "Điện tích hệ cô lập bảo toàn",
      "Electron có điện tích nguyên tố",
      "Lực tỉ lệ nghịch khoảng cách",
    ],
    c: 3,
  },

  // Câu 41
  {
    q: "Lực tổng hợp tác dụng lên Q:",
    a: ["Luôn về A", "Luôn về B", "Luôn bằng 0", "Về A nếu Q trái dấu q1"],
    c: 1,
  },
];
let score = 0;
let answered = new Array(questions.length).fill(false);

const quizDiv = document.getElementById("quiz");
const scoreDiv = document.getElementById("score");

questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.className = "p-4 border rounded-lg";

  div.innerHTML = `
    <p class="font-semibold mb-3">Câu ${i + 1}: ${q.q}</p>
    <div class="space-y-2">
      ${q.a
        .map(
          (ans, j) =>
            `<button class="w-full text-left px-4 py-2 border rounded hover:bg-indigo-100"
             onclick="check(${i}, ${j}, this)">
             ${ans}
             </button>`
        )
        .join("")}
    </div>
  `;

  quizDiv.appendChild(div);
});

function check(qi, ai, btn) {
  if (answered[qi]) return;

  const buttons = btn.parentElement.children;
  buttons[questions[qi].c].classList.add("bg-green-200", "border-green-500");

  if (ai === questions[qi].c) {
    score++;
  } else {
    btn.classList.add("bg-red-200", "border-red-500");
  }

  for (let b of buttons) {
    b.disabled = true;
    b.classList.add("opacity-70");
  }

  answered[qi] = true;
  scoreDiv.innerText = `Điểm: ${score} / ${questions.length}`;
}
