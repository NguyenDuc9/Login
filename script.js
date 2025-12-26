const questions = [
  // Câu 1
  {
    q: "Tính chất nào sau đây không phải là chuyển động của phân tử vật chất ở thể khí?",
    a: [
      "Chuyển động hỗn loạn.",
      "Chuyển động hỗn loạn và không ngừng.",
      "Chuyển động không ngừng.",
      "Chuyển động hỗn loạn xung quanh các vị trí cân bằng cố định",
    ],
    c: 3,
  },
  // Câu 2
  {
    q: "Nhận xét nào sau đây không phù hợp với khí lí tưởng?",
    a: [
      "Thể tích các phân tử có thể bỏ qua.",
      "Các phân tử chỉ tương tác với nhau khi va chạm.",
      "Các phân tử chuyển động càng nhanh khi nhiệt độ càng cao.",
      "Khối lượng các phân tử có thể bỏ qua.",
    ],
    c: 3,
  },
  // Câu 3
  {
    q: "Quá trình biến đổi trạng thái trong đó nhiệt độ được giữ không đổi gọi là quá trình",
    a: ["Đẳng nhiệt", "Đẳng áp", "Đẳng tích", "Đoạn nhiệt"],
    c: 0,
  },
  // Câu 4
  {
    q: "Một lượng khí xác định, được xác định bởi bộ ba thông số gồm",
    a: [
      "Áp suất, thể tích, khối lượng",
      "Thể tích, khối lượng, nhiệt độ",
      "Áp suất, nhiệt độ, thể tích",
      "Áp suất, nhiệt độ, khối lượng",
    ],
    c: 2,
  },
  // Câu 5
  {
    q: "Độ biến thiên nội năng của n mol khí lí tưởng đơn nguyên tử từ trạng thái (1) sang trạng thái (2) được tính bởi công thức nào?",
    a: [
      "ΔU = n.R.ΔT/2",
      "ΔU = 5.n.R.ΔT/2",
      "ΔU = 3.n.R.ΔT/2",
      "ΔU = n.R.ΔT.i/2",
    ],
    c: 2,
  },
  // Câu 6
  {
    q: "Trong quá trình biến đổi đoạn nhiệt với γ là hệ số Poisson, công thức nào sau đây là sai?",
    a: [
      "P.V^γ = const",
      "T^γ.p^(γ-1) = const",
      "T.V^(γ-1) = const",
      "T.V^γ = const",
    ],
    c: 3,
  },
  // Câu 7
  {
    q: "Khi làm nóng một lượng khí có thể tích không đổi thì",
    a: [
      "Áp suất khí không đổi",
      "Số phân tử trong đơn vị thể tích tăng tỉ lệ với nhiệt độ",
      "Số phân tử trong đơn vị thể tích không đổi",
      "Số phân tử trong đơn vị thể tích giảm tỉ lệ nghịch với nhiệt độ",
    ],
    c: 2,
  },
  // Câu 8
  {
    q: "Hệ thức nào sau đây phù hợp với định luật Bôilơ - Mariốt?",
    a: ["p1V1 = p2V2", "p1/p2 = V1/V2", "p1/V1 = p2/V2", "p ~ V"],
    c: 0,
  },
  // Câu 9
  {
    q: "Trong hệ toạ độ (p,T) đường biểu diễn nào sau đây là đường đẳng tích?",
    a: [
      "Đường hypebol",
      "Đường thẳng kéo dài thì đi qua gốc toạ độ",
      "Đường thẳng kéo dài thì không đi qua gốc toạ độ",
      "Đường thẳng cắt trục p tại điểm p = p0",
    ],
    c: 2,
  },
  // Câu 10
  {
    q: "Có 6,5g hyđrô ở nhiệt độ 27oC, nhận nhiệt lượng giãn nở gấp đôi, trong điều kiện áp suất không đổi. Tính công mà khí sinh ra.",
    a: ["6,4.10^3 J", "7,8.10^3 J", "8,1.10^3 J", "8,6.10^3 J"],
    c: 2,
  },
  // Câu 11
  {
    q: "Ở điều kiện tiêu chuẩn: 1 mol khí ở 0 oC có áp suất 1 atm và thể tích là 22,4 lít. Hỏi một bình có dung tích 5 lít chứa 0,5 mol khí ở nhiệt độ 0 oC có áp suất là bao nhiêu?",
    a: ["1,12 at", "2,24 at", "2,04 at", "2,56 at"],
    c: 0,
  },
  // Câu 12
  {
    q: "Hệ thức nào sau đây không phù hợp với quá trình đẳng áp?",
    a: ["V/T = const", "V ~ T", "V ~ 1/T", "V1/T1 = V2/T2"],
    c: 2,
  },
  // Câu 13
  {
    q: "Một khối ban đầu có V1 = 2,4 m3, p1 = 1 kN/m2 biến đổi đẳng nhiệt đến áp suất 0,5 kN/m2 thì thể tích của khối khí bằng:",
    a: ["3,6 m3", "4,8 m3", "3,6 m3", "4,8 m3"],
    c: 0,
  },
  // Câu 14
  {
    q: "Nén một khối khí theo quá trình đẳng nhiệt từ thể tích 10 lít đến thể tích 4 lít thì áp suất của khí tăng lên bao nhiêu lần?",
    a: ["2,5 lần", "1,5 lần", "2 lần", "4 lần"],
    c: 2,
  },
  // Câu 15
  {
    q: "Nén một khối khí theo quá trình đẳng nhiệt từ thể tích 9 lít đến thể tích 6 lít thì áp suất tăng một lượng Δp = 50 kPa. Áp suất ban đầu của khí đó là:",
    a: ["40 kPa", "80 kPa", "60 kPa", "100 kPa"],
    c: 2,
  },
  // Câu 16
  {
    q: "Có 10 g khí oxy ở 10 oC, áp suất 3.10^5 Pa. Sau khi hơ nóng đẳng áp, thể tích khí tăng đến 10 l. Nhiệt lượng mà khối khí nhận được là?",
    a: ["7,9.10^3 J", "6,9.10^3 J", "8,8.10^3 J", "7,5.10^3 J"],
    c: 0,
  },
  // Câu 17
  {
    q: "Nén 10g khí oxy từ điều kiện tiêu chuẩn tới thể tích 4l. Tìm áp suất và nhiệt lượng của khối khí trong quá trình nén đẳng nhiệt?",
    a: [
      "1,7.10^5 Pa và 397 J",
      "1,8.10^5 Pa và 420 J",
      "1,8.10^5 Pa và 397 J",
      "1,7.10^5 Pa và 380 J",
    ],
    c: 2,
  },
  // Câu 18
  {
    q: "Dưới áp suất p1 = 10^5 Pa một lượng khí có thể tích là V1 = 10 lít. Nếu nhiệt độ được giữ không đổi và áp suất tăng lên p2 = 1,25.10^5 Pa thì thể tích của lượng khí này là:",
    a: ["V2 = 7 lít", "V2 = 9 lít", "V2 = 8 lít", "V2 = 10 lít"],
    c: 2,
  },
  // Câu 19
  {
    q: "Một xilanh chứa 100 cm3 khí ở áp suất 2.10^5 Pa. Pit tông nén đẳng nhiệt khí trong xilanh xuống còn 50 cm3. Áp suất của khí trong xilanh lúc này là:",
    a: ["2.10^5 Pa", "4.10^5 Pa", "3.10^5 Pa", "5.10^5 Pa"],
    c: 1,
  },
  // Câu 20
  {
    q: "Một lượng khí ở 0 oC có áp suất là 1,50.10^5 Pa nếu thể tích khí không đổi thì áp suất ở 273 oC là:",
    a: ["10^5 Pa", "3.10^5 Pa", "2.10^5 Pa", "4.10^5 Pa"],
    c: 2,
  },
  {
    q: "Một bình chứa một lượng khí ở nhiệt độ 27 oC và ở áp suất 2.10^5 Pa. Nếu áp suất tăng gấp đôi thì nhiệt độ của khối khí là:",
    a: ["T = 300 K", "T = 13,5 K", "T = 54 K", "T = 600 K"],
    c: 0,
  },

  // Câu 22
  {
    q: "Một cái bơm chứa 100 cm3 không khí ở nhiệt độ 27 oC và áp suất 10^5 Pa. Khi không khí bị nén xuống còn 20 cm3 và nhiệt độ tăng lên tới 327 oC thì áp suất của không khí trong bơm là:",
    a: ["7.10^5 Pa", "9.10^5 Pa", "8.10^5 Pa", "10.10^5 Pa"],
    c: 2,
  },

  // Câu 23
  {
    q: "Một lượng khí đựng trong một xilanh có pittông chuyển động được. Các thông số trạng thái của lượng khí này là: 2 at, 15 lít, 300 K. Khi pittông nén khí, áp suất của khí tăng lên tới 3,5 at, thể tích giảm còn 12 lít. Nhiệt độ của khí nén là:",
    a: ["400 K", "420 K", "600 K", "150 K"],
    c: 1,
  },

  // Câu 24
  {
    q: "Khi thở ra dung tích của phổi là 2,4 lít và áp suất của không khí trong phổi là 101,7.10^3 Pa. Khi hít vào áp suất của phổi là 101,01.10^3 Pa. Coi nhiệt độ của phổi là không đổi, dung tích của phổi khi hít vào bằng:",
    a: ["2,416 lít", "2,4 lít", "2,384 lít", "1,327 lít"],
    c: 0,
  },

  // Câu 25
  {
    q: "Để bơm đầy một khí cầu đến thể tích 100 m3 có áp suất 0,1 at ở nhiệt độ không đổi người ta dùng các ống khí Hêli có thể tích 50 lít ở áp suất 100 at. Số ống khí Hêli cần để bơm khí cầu bằng:",
    a: ["1", "2", "3", "4"],
    c: 2,
  },

  // Câu 26
  {
    q: "Một bọt khí có thể tích 1,5 cm3 được tạo ra từ khoang tàu ngầm đang lặn ở độ sâu 100 m dưới mực nước biển. Hỏi khi bọt khí này nổi lên mặt nước thì sẽ có thể tích bao nhiêu? Giả sử nhiệt độ của bọt khí là không đổi, biết khối lượng riêng của nước biển là 10^3 kg/m3, áp suất khí quyển là p0 = 10^5 Pa và g = 10 m/s2.",
    a: ["15 cm3", "15,5 cm3", "16 cm3", "16,5 cm3"],
    c: 2,
  },

  // Câu 27
  {
    q: "Một ống thủy tinh tiết diện đều S, một đầu kín một đầu hở, chứa một cột thủy ngân dài h = 16 cm. Khi đặt ống thẳng đứng, đầu hở ở trên thì chiều dài của cột không khí là l1 = 15 cm, áp suất khí quyển bằng p0 = 76 cmHg. Khi đặt ống thủy tinh nghiêng một góc α = 30° đối với phương thẳng đứng, đầu hở ở trên thì chiều cao của cột không khí trong ống bằng:",
    a: ["14,5 cm", "15,4 cm", "16,0 cm", "22,7 cm"],
    c: 2,
  },

  // Câu 28
  {
    q: "Một chiếc lốp ô tô chứa không khí có áp suất 5 at và ở nhiệt độ 25 oC. Khi xe chạy nhanh nhiệt độ lốp xe tăng lên đến giá trị 50 oC. Tính áp suất không khí trong lốp xe lúc này.",
    a: ["5,42 at", "4,26 at", "2,68 at", "6,54 at"],
    c: 0,
  },

  // Câu 29
  {
    q: "Một bình chứa một lượng khí ở nhiệt độ 27 oC và ở áp suất 2.10^5 Pa. Nếu áp suất tăng gấp đôi thì nhiệt độ của khối khí là:",
    a: ["300 K", "13,5 K", "54 K", "600 K"],
    c: 0,
  },

  // Câu 30
  {
    q: "Một bình kín chứa khí Ôxi ở nhiệt độ 27 oC và áp suất 10^5 Pa. Nếu đem bình phơi nắng ở nhiệt độ 177 oC thì áp suất trong bình sẽ là:",
    a: ["1,5.10^5 Pa", "2.10^5 Pa", "2,5.10^5 Pa", "3.10^5 Pa"],
    c: 0,
  },

  // Câu 31
  {
    q: "Có 5 mol khí ôxi được nung nóng để nhiệt độ tăng thêm 10 oC. Nếu quá trình biến đổi là đẳng áp thì nhiệt lượng mà khí nhận được là giá trị nào sau đây:",
    a: ["145,452.000 J", "145,200 J", "165,520 J", "155,452 J"],
    c: 0,
  },

  // Câu 32
  {
    q: "Một khối khí lí tưởng xác định có áp suất 1 at được làm tăng áp suất đến 4 at ở nhiệt độ không đổi thì thể tích biến đổi một lượng 3 lít. Thể tích ban đầu của khối khí đó là:",
    a: ["4 lít", "8 lít", "12 lít", "16 lít"],
    c: 2,
  },

  // Câu 33
  {
    q: "Một bình kín đựng khí Heli chứa N = 1,505.10^23 nguyên tử khí Heli ở 0 oC và có áp suất trong bình là 1 atm. Thể tích của bình đựng khí là:",
    a: ["5,6 lít", "11,2 lít", "22,4 lít", "28 lít"],
    c: 2,
  },

  // Câu 34
  {
    q: "Một bình nạp khí ở nhiệt độ 33 oC dưới áp suất 300 kPa. Tăng nhiệt độ cho bình đến nhiệt độ 37 oC đẳng tích thì độ tăng áp suất của khí trong bình là:",
    a: ["3,92 kPa", "3,24 kPa", "5,64 kPa", "4,32 kPa"],
    c: 2,
  },

  // Câu 35
  {
    q: "Ở điều kiện tiêu chuẩn: 1 mol khí ở 0 oC có áp suất 1 at và thể tích là 22,4 lít. Hỏi một bình có dung tích 5 lít chứa 0,5 mol khí ở nhiệt độ 0 oC có áp suất là bao nhiêu:",
    a: ["1,12 at", "2,04 at", "2,24 at", "2,56 at"],
    c: 2,
  },

  // Câu 36
  {
    q: "Một bình chứa có dung tích 20 lít chứa khí Ôxi ở nhiệt độ 17 °C và áp suất 1,03.10^7 Pa. Khối lượng khí Ôxi trong bình là:",
    a: ["2,735 g", "27,35 g", "273,5 g", "2,735 kg"],
    c: 2,
  },

  // Câu 37
  {
    q: "Một khí lí tưởng có thể tích 10 lít ở 27 oC áp suất 1 atm, biến đổi qua hai quá trình: quá trình đẳng tích áp suất tăng gấp 2 lần; rồi quá trình đẳng áp, thể tích sau cùng là 15 lít. Nhiệt độ sau cùng của khối khí là:",
    a: ["81 oC", "427 oC", "627 oC", "900 oC"],
    c: 2,
  },

  // Câu 38
  {
    q: "Nung nóng 160g khí oxy từ nhiệt độ 50 oC đến 60 oC. Nhiệt lượng mà khí nhận được trong quá trình đẳng tích là:",
    a: ["1025 J", "1038 J", "1050 J", "1150 J"],
    c: 1,
  },

  // Câu 39
  {
    q: "Có 6,5g hyđrô ở nhiệt độ 27 oC, nhận nhiệt lượng giãn nở gấp đôi, trong điều kiện áp suất không đổi. Tính độ biến thiên nội năng của khối khí ?",
    a: ["18,8.10^3 J", "19,4.10^3 J", "20,2.10^3 J", "22,4.10^3 J"],
    c: 2,
  },
];

// 👉 Bạn có thể tiếp tục thêm các câu còn lại theo đúng file

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
