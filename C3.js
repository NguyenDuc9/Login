const questions = [
  // ===== CHƯƠNG 3: TRƯỜNG TĨNH ĐIỆN =====

  {
    q: "Câu 1. Hai vật tích điện +16C và –5C trao đổi điện tích với nhau. Điện tích lúc sau của hai vật đó không thể có giá trị nào sau đây?",
    a: ["+5C, +6C", "+4C, +4C", "–3C, +14C", "–9C, +20C"],
    c: 1,
  },
  {
    q: "Câu 2. Điện tích Q = -5×10⁻⁸ C đặt trong không khí. Độ lớn của vector cường độ điện trường do điện tích Q gây ra tại điểm M cách nó 30cm có giá trị nào sau đây?",
    a: ["15 kV/m", "5 kV/m", "15 V/m", "5 V/m"],
    c: 1,
  },
  {
    q: "Câu 3. Hai quả cầu nhỏ giống hệt nhau, tích điện cùng dấu, đặt tại A và B. Mỗi quả cầu gây ra tại trung điểm M của AB điện trường có cường độ E1 = 300 V/m và E2 = 200 V/m. Nếu cho hai quả cầu tiếp xúc nhau rồi đưa về vị trí cũ thì cường độ điện trường tại M là:",
    a: ["500 V/m", "250 V/m", "100 V/m", "0 V/m"],
    c: 3,
  },
  {
    q: "Câu 4. Phát biểu nào sau đây là SAI?",
    a: [
      "Vector cường độ điện trường là đại lượng đặc trưng cho điện trường về phương diện tác dụng lực.",
      "Trong môi trường điện môi đẳng hướng, cường độ điện trường giảm ε lần so với trong chân không.",
      "Đơn vị đo cường độ điện trường là vôn trên mét (V/m).",
      "Điện trường tĩnh là điện trường có cường độ E không đổi tại mọi điểm.",
    ],
    c: 3,
  },
  {
    q: "Câu 5. Hai điện tích điểm Q1, Q2 lần lượt gây ra tại M các vector cường độ điện trường E1 và E2. Phát biểu nào sau đây là đúng?",
    a: [
      "E = E1 + E2 nếu Q1, Q2 cùng dấu.",
      "E = E1 - E2 nếu Q1, Q2 trái dấu.",
      "Luôn tính bởi công thức E = E1 + E2.",
      "E = E1 + E2.",
    ],
    c: 2,
  },
  {
    q: "Câu 6. Mặt phẳng (P) rộng vô hạn, tích điện đều với mật độ điện mặt σ. Cường độ điện trường do mặt phẳng này gây ra tại điểm M trong không khí, cách (P) một khoảng a được tính bởi biểu thức nào?",
    a: ["E = σ/ε0", "E = 2σ/ε0", "E = σ/(2ε0)", "E = σ/(2aε0)"],
    c: 2,
  },
  {
    q: "Câu 7. Một vật dẫn tích điện thì điện tích của vật dẫn đó sẽ phân bố:",
    a: [
      "Đều trong toàn thể tích vật dẫn.",
      "Đều trên bề mặt vật dẫn.",
      "Chỉ bên trong lòng vật dẫn.",
      "Chỉ trên bề mặt vật dẫn, phụ thuộc hình dáng bề mặt.",
    ],
    c: 3,
  },
  {
    q: "Câu 8. Một quả cầu đặc mang điện, phát biểu nào sau đây là sai?",
    a: [
      "Điện tích chỉ tập trung trên bề mặt ngoài quả cầu.",
      "Điện tích phân bố đều trên bề mặt ngoài quả cầu.",
      "Cường độ điện trường ở bên trong quả cầu khác không.",
      "Điện thế bên trong quả cầu khác không.",
    ],
    c: 2,
  },
  {
    q: "Câu 9. Một điện tích điểm dương q, khối lượng m, ban đầu đứng yên. Sau đó được thả vào điện trường đều có vector cường độ điện trường E hướng theo chiều dương Ox. Chuyển động của q là:",
    a: [
      "Thẳng nhanh dần đều theo chiều dương Ox với gia tốc a = qE/m.",
      "Thẳng nhanh dần đều theo chiều âm Ox với gia tốc a = qE/m.",
      "Thẳng đều theo chiều dương Ox.",
      "Thẳng đều theo chiều âm Ox.",
    ],
    c: 0,
  },
  {
    q: "Câu 10. Một vòng dây tròn bán kính R tích điện đều Q. Cường độ điện trường tại điểm M trên trục vòng dây, cách tâm một đoạn R là:",
    a: ["E = k|Q|/R²", "E = k|Q|/2R²", "E = k|Q|/(2√2R²)", "E = 0"],
    c: 2,
  },
  {
    q: "Câu 11. Một vòng dây tròn bán kính R tích điện đều Q đặt trong không khí. Cường độ điện trường tại tâm vòng dây là:",
    a: ["E = k|Q|/R²", "E = k|Q|/2R²", "E = k|Q|/(2√2R²)", "E = 0"],
    c: 3,
  },
  {
    q: "Câu 12. Trong chân không, tại 6 đỉnh của lục giác đều cạnh a đặt 6 điện tích q gồm 3 dương và 3 âm xen kẽ. Cường độ điện trường tại tâm O là:",
    a: ["E = kq/a²", "E = 6kq/a²", "E = 3kq/a²", "E = 0"],
    c: 3,
  },
  {
    q: "Câu 13. Một sợi dây thẳng dài vô hạn tích điện đều với mật độ điện tích dài λ. Cường độ điện trường tại điểm M cách dây một đoạn h là:",
    a: ["E = k|λ|/h", "E = 2k|λ|/h", "E = k|λ|/h²", "E = k|λ|/(2h)"],
    c: 1,
  },
  {
    q: "Câu 14. Một dây thẳng dài vô hạn có λ = -6×10⁻⁹ C/m. Tính cường độ điện trường tại điểm cách dây 20 cm.",
    a: ["270 V/m", "1350 V/m", "540 V/m", "135 V/m"],
    c: 2,
  },
  {
    q: "Câu 15. Một mặt phẳng vô hạn tích điện đều với σ = 17,7×10⁻¹⁰ C/m². Tính cường độ điện trường tại điểm cách mặt phẳng 10 cm.",
    a: ["100 V/m", "10 V/m", "1000 V/m", "200 V/m"],
    c: 0,
  },
  {
    q: "Câu 16. Hai điện tích q và 4q đặt tại A và B cách nhau 30 cm. Đặt điện tích thử tại điểm M trên AB để nó đứng yên. Khoảng cách MA là:",
    a: ["7,5 cm", "10 cm", "20 cm", "22,5 cm"],
    c: 1,
  },
  {
    q: "Câu 17. Hai điện tích điểm q1 = 3 μC và q2 = 12 μC đặt cách nhau 30 cm trong không khí. Lực tương tác giữa chúng là:",
    a: ["0,36 N", "3,6 N", "0,036 N", "36 N"],
    c: 1,
  },
  {
    q: "Câu 18. Hai quả cầu kim loại nhỏ q1 = 2 μC và q2 = -4 μC hút nhau với lực F1 = 16 N. Sau khi cho chúng chạm nhau rồi đưa về vị trí cũ thì:",
    a: [
      "Không tương tác với nhau.",
      "Hút nhau với lực F2 = 2 N.",
      "Đẩy nhau với lực F2 = 2 N.",
      "Tương tác với lực F2 ≠ 2 N.",
    ],
    c: 2,
  },
  {
    q: "Câu 19. Hai điện tích điểm trong chân không cách nhau 10 cm hút nhau lực 10⁻⁶ N. Khi khoảng cách là 2 cm thì lực là:",
    a: ["2,5×10⁻⁵ N", "5×10⁻⁶ N", "8×10⁻⁶ N", "4×10⁻⁸ N"],
    c: 0,
  },
  {
    q: "Câu 20. Hai điện tích bằng nhau nhưng trái dấu đặt trên trục xy. Đặt thêm điện tích Q < 0 thì phát biểu đúng là:",
    a: [
      "Lực hướng về x nếu Q đặt trên đoạn x–q1.",
      "Lực hướng về y nếu Q đặt trên đoạn q2–y.",
      "Lực hướng về q1 nếu Q đặt trên đoạn q1–q2.",
      "có giá trị bằng không, nếu Q đặt tại trung điểm của đoạn q1 – q2.",
    ],
    c: 0,
  },
  {
    q: "Câu 21. Trong hệ SI, đơn vị đo thông lượng điện trường là:",
    a: [
      "vôn trên mét (V/m)",
      "vôn mét (Vm)",
      "coulomb trên mét vuông (C/m²)",
      "coulomb (C)",
    ],
    c: 3,
  },
  {
    q: "Câu 22. Hai điện tích Q1 = 8 μC và Q2 = -5 μC nằm ngoài mặt kín (S). Thông lượng điện trường qua (S) là:",
    a: ["3×10⁻⁶ Vm", "3,4×10⁵ Vm", "0 Vm", "9×10⁵ Vm"],
    c: 2,
  },
  {
    q: "Câu 23. Hai điện tích Q1 = 8 μC và Q2 = -5 μC nằm trong mặt kín (S). Thông lượng điện trường qua (S) là:",
    a: ["3×10⁻⁶ Vm", "3,4×10⁵ Vm", "0 Vm", "9×10⁵ Vm"],
    c: 1,
  },
  {
    q: "Câu 24. Đường sức điện là đường mà:",
    a: [
      "Vuông góc với vector E tại điểm đó.",
      "Tiếp tuyến trùng với phương của vector E tại điểm đó.",
      "Pháp tuyến trùng với phương của vector E tại điểm đó.",
      "Do hạt sắt từ vẽ nên.",
    ],
    c: 1,
  },
  {
    q: "Câu 25. Nếu điện thông qua mặt kín bằng 0 thì:",
    a: [
      "Không có điện tích bên trong.",
      "Tổng điện tích bên trong bằng 0.",
      "Đường sức chỉ đi vào.",
      "Không có điện trường.",
    ],
    c: 1,
  },
  {
    q: "Câu 26. Tích điện Q < 0 cho quả cầu thép. Phát biểu nào sau đây là SAI?",
    a: [
      "Điện tích không phân bố trong lòng quả cầu.",
      "Trong lòng quả cầu E = 0.",
      "Điện tích phân bố đều trên bề mặt.",
      "Điện thế tại tâm O lớn hơn ở bề mặt quả tạ.",
    ],
    c: 3,
  },
  {
    q: "Câu 27. Cho ba điện tích điểm q1 = q2 = q3 = q = 6µC đặt tại ba đỉnh của tam giác đều ABC, cạnh a = 10cm (trong chân không). Tính lực tác dụng lên điện tích q1.",
    a: [
      "F = 2kq²/a² = 64,8 N",
      "F = kq²/a² = 56,1N ",
      "F = kq²/(2a²) = 28,1 N",
      "F = kq²/a² = 32,4 N",
    ],
    c: 1,
  },
  {
    q: "Câu 28. Hai điện tích điểm Q1 = 8µC, Q2 = -6µC đặt tại A và B cách nhau 10cm trong không khí. Tính độ lớn vector cường độ điện trường tại điểm M, biết MA = 8cm, MB = 6cm.",
    a: ["18,75×10⁶ V/m", "7,2×10⁶ V/m", "5,85×10⁶ V/m", "6,48×10⁶ V/m"],
    c: 0,
  },
  {
    q: "Câu 29. Hai điện tích điểm Q1 = 8µC, Q2 = -6µC đặt tại A và B cách nhau 10cm trong không khí. Tính độ lớn vector cường độ điện trường tại điểm M, biết MA = 10cm, MB = 20cm.",
    a: ["3,6×10⁶ V/m", "7,2×10⁶ V/m", "5,85×10⁶ V/m", "8,55×10⁶ V/m"],
    c: 2,
  },
  {
    q: "Câu 30. Hai điện tích điểm Q1 = 8µC, Q2 = -6µC đặt tại A và B cách nhau 10cm trong không khí. Tính độ lớn vector cường độ điện trường tại điểm M, biết MA = MB = 5cm.",
    a: ["50,4×10⁶ V/m", "7,2×10⁶ V/m", "5,85×10⁶ V/m", "0 V/m"],
    c: 0,
  },
  {
    q: "Câu 31. Một mặt cầu (S) bao kín một điện tích q. Nếu giá trị của q tăng lên 3 lần thì điện thông gửi qua (S):",
    a: ["Tăng 3 lần", "Không thay đổi", "Giảm 3 lần", "Tăng 9 lần"],
    c: 0,
  },
  {
    q: "Câu 32. Gọi WM, WN là thế năng của điện tích q tại M, N; VM, VN là điện thế tại M, N; AMN là công của lực điện trường khi q di chuyển từ M đến N. Quan hệ đúng là:",
    a: [
      "AMN = q(VM − VN) = WM − WN",
      "AMN = |q|(VM − VN)",
      "AMN = VM − VN",
      "AMN = q(VN − VM)",
    ],
    c: 0,
  },
  {
    q: "Câu 33. Tại A và B cách nhau 20cm đặt hai điện tích qA = −5×10⁻⁹ C, qB = 5×10⁻⁹ C. Tính điện thông do hệ điện tích này gửi qua mặt cầu tâm B bán kính 10cm.",
    a: ["5×10⁻⁹ Vm", "565 Vm", "4,4×10⁻²⁰ Vm", "0 Vm"],
    c: 1,
  },
  {
    q: "Câu 34. Quả cầu kim loại rỗng bán kính 10cm tích điện Q = 6µC đặt trong không khí. Cường độ điện trường tại tâm O của quả cầu là:",
    a: ["5,4×10⁶ V/m", "5,4×10⁸ V/m", "5,4×10⁹ V/m", "0 V/m"],
    c: 3,
  },
  {
    q: "Câu 35. Hai điểm A, B cùng nằm trên một đường sức điện trường của một điện tích điểm. Biết EA = 400 V/m, EB = 100 V/m. Cường độ điện trường tại trung điểm AB là:",
    a: ["150 V/m", "250 V/m", "177,8 V/m", "189,8 V/m"],
    c: 2,
  },
  {
    q: "Câu 36. Một electron chuyển từ A đến B trong điện trường có VA = 150 V, VB = 50 V. Công của lực điện trường là:",
    a: ["8,1×10⁻¹⁷ J", "−8,1×10⁻¹⁷ J", "1,6×10⁻¹⁷ J", "−1,6×10⁻¹⁷ J"],
    c: 3,
  },
  {
    q: "Câu 37. Hai điện tích điểm trong chân không cách nhau 4cm đẩy nhau lực 10N. Để lực đẩy là 2,5N thì khoảng cách giữa chúng là:",
    a: ["1 cm", "4 cm", "8 cm", "10 cm"],
    c: 2,
  },
  {
    q: "Câu 38. Điện trường giữa hai bản tụ phẳng là E. Nếu tăng khoảng cách giữa hai bản tụ lên gấp đôi thì cường độ điện trường:",
    a: ["Tăng 2 lần", "Giảm 2 lần", "Tăng 4 lần", "Không thay đổi"],
    c: 3,
  },
  {
    q: "Câu 39. Điện tích q di chuyển trong điện trường của điện tích Q từ M đến N, cách Q các khoảng rM, rN. Biểu thức tính công của lực điện trường là:",
    a: [
      "A = qkQ(1/rM − 1/rN)",
      "A = |q|kQ(1/rM − 1/rN)",
      "A = qkQ(1/rN − 1/rM)",
      "A = k|Qq|(1/rM − 1/rN)",
    ],
    c: 0,
  },
  {
    q: "Câu 40. Phát biểu nào sau đây là SAI?",
    a: [
      "Hai điện tích cùng dấu thì đẩy nhau.",
      "Điện tích của hệ cô lập luôn không đổi.",
      "Điện tích của electron là điện tích nguyên tố.",
      "Lực tương tác giữa các điện tích điểm tỉ lệ nghịch với khoảng cách.",
    ],
    c: 3,
  },
  {
    q: "Câu 41. Hai điện tích cùng dấu q1 và q2 (q1 = 4q2) đặt tại A và B cách nhau 3a. Đặt điện tích Q trên đoạn AB, cách B một đoạn a. Lực tổng hợp tác dụng lên Q là:",
    a: [
      "Luôn hướng về A.",
      "Luôn hướng về B.",
      "Luôn bằng 0.",
      "Hướng về A nếu Q trái dấu với q1.",
    ],
    c: 2,
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
