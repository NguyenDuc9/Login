const questions = [
  // Câu 1
  {
    q: "Theo thuyết photon ánh sáng, phát biểu nào dưới đây là sai?",
    a: [
      "Phân tử, nguyên tử phát xạ hay hấp thụ ánh sáng, cũng có nghĩa là chúng phát xạ hay hấp thụ phôtôn",
      "Ánh sáng được cấu tạo bởi các hạt phôtôn",
      "Năng lượng của các phôtôn ánh sáng là như nhau, không phụ thuộc tần số của ánh sáng",
      "Trong chân không, các phôtôn chuyển động với tốc độ c = 3·10^8 m/s",
    ],
    c: 2,
  },
  // Câu 2
  {
    q: "Khi nói về thuyết photon ánh sáng, phát biểu nào sau đây là đúng?",
    a: [
      "Năng lượng phôtôn càng nhỏ khi cường độ chùm ánh sáng càng nhỏ",
      "Phôtôn có thể chuyển động hay đứng yên tùy thuộc vào nguồn sáng chuyển động hay đứng yên",
      "Năng lượng của phôtôn càng lớn khi tần số của ánh sáng ứng với phôtôn đó càng nhỏ",
      "Ánh sáng được cấu tạo bởi các hạt phôtôn",
    ],
    c: 3,
  },
  // Câu 3
  {
    q: "Trong các phát biểu sau đây, phát biểu nào là sai?",
    a: [
      "Một vật bất kỳ phát xạ yếu hơn vật đen tuyệt đối ở cùng bước sóng và nhiệt độ",
      "Một vật bất kỳ phải có khả năng hấp thụ được bước sóng λ thì mới có khả năng phát xạ ra bước sóng λ",
      "Vật đen tuyệt đối có khả năng hấp thụ hoàn toàn các bước sóng chiếu tới vật",
      "Vật đen tuyệt đối không có khả năng phát xạ ra bức xạ điện từ",
    ],
    c: 3,
  },
  // Câu 4
  {
    q: "Gọi năng lượng của phôtôn ánh sáng đỏ, ánh sáng lục và ánh sáng tím lần lượt là εD, εL và εT thì:",
    a: ["εT > εL > εD", "εT > εD > εL", "εD > εL > εT", "εL > εT > εD"],
    c: 0,
  },
  // Câu 5
  {
    q: "Giới hạn quang điện của mỗi kim loại là:",
    a: [
      "Bước sóng của ánh sáng kích thích chiếu vào kim loại",
      "Công thoát của các êlectron ở bề mặt kim loại đó",
      "Bước sóng giới hạn của ánh sáng kích thích để gây ra hiện tượng quang điện kim loại đó",
      "Hiệu điện thế hãm",
    ],
    c: 2,
  },
  // Câu 6
  {
    q: "Phát biểu nào sau đây khi nói về hiện tượng quang điện là đúng?",
    a: [
      "Là hiện tượng êlectron bứt ra khỏi bề mặt tấm kim loại khi có ánh sáng thích hợp chiếu vào nó",
      "Là hiện tượng êlectron bứt ra khỏi bề mặt tấm kim loại khi tấm kim loại bị nung nóng",
      "Là hiện tượng êlectron bứt ra khỏi bề mặt tấm kim loại bị nhiễm điện do tiếp xúc với một vật nhiễm điện khác",
      "Là hiện tượng êlectron bứt ra khỏi bề mặt tấm kim loại do bất kỳ nguyên nhân nào khác",
    ],
    c: 0,
  },
  // Câu 7
  {
    q: "Trong các công thức nêu dưới đây, công thức nào là công thức của Einstein về hiện tượng quang điện ngoài?",
    a: [
      "hf = A + (mv_max^2)/2",
      "hf = A + (mv_max^2)/4",
      "hf = A - (mv_max^2)/2",
      "hf = 2A + (mv_max^2)/2",
    ],
    c: 0,
  },
  // Câu 8
  {
    q: "Chiếu lần lượt các bức xạ có tần số f1 và f2 vào catốt của một tế bào quang điện, sau đó dùng các hiệu điện thế hãm U1 và U2 để triệt tiêu các dòng quang điện. Hằng số Plăng h có thể tính từ biểu thức nào?",
    a: [
      "h = e(U2 - U1)/(f2 - f1)",
      "h = e(U1 - U2)/(f2 - f1)",
      "h = e(U2 - U1)/(f1 - f2)",
      "h = e(U2 - U1)/(f2 + f1)",
    ],
    c: 0,
  },
  // Câu 9
  {
    q: "Công suất bức xạ của vật đen tuyệt đối tăng lên bao nhiêu lần nếu trong quá trình nung nóng bước sóng ứng với năng suất phát xạ cực đại dịch chuyển từ 0,7 μm đến 0,6 μm?",
    a: ["1,9 lần", "2,9 lần", "3,9 lần", "4,9 lần"],
    c: 0,
  },
  // Câu 10
  {
    q: "Nhiệt độ tuyệt đối của vật đen tăng từ 1000 K đến 3000 K. Năng suất phát xạ toàn phần tăng bao nhiêu lần?",
    a: ["61 lần", "71 lần", "81 lần", "91 lần"],
    c: 2,
  },
  // Câu 11
  {
    q: "Nhiệt độ tuyệt đối của vật đen tăng từ 1000 K đến 3000 K. Bước sóng ứng với năng suất phát xạ cực đại sau thay đổi nhiệt độ là bao nhiêu?",
    a: ["0,87 μm", "0,97 μm", "1,07 μm", "1,17 μm"],
    c: 1,
  },
  // Câu 12
  {
    q: "Giới hạn quang điện của Ge là λ0 = 1,88 μm. Tính năng lượng kích hoạt của Ge:",
    a: ["0,66 eV", "6,6 eV", "0,77 eV", "7,7 eV"],
    c: 0,
  },
  // Câu 13
  {
    q: "Một kim loại có công thoát 2,5 eV, h = 6,625·10^-34 Js, c = 3·10^8 m/s. Tính giới hạn quang điện của kim loại:",
    a: ["0,4969 μm", "0,649 μm", "0,325 μm", "0,229 μm"],
    c: 0,
  },
  // Câu 14
  {
    q: "Công suất bức xạ của vật đen tuyệt đối bằng 10^5 kW. Diện tích bức xạ của vật đó là bao nhiêu nếu bước sóng cực đại bằng 7·10^-7 m?",
    a: ["6,004 m²", "0,419 m²", "0,519 m²", "0,619 m²"],
    c: 0,
  },
  // Câu 15
  {
    q: "Năng lượng gửi đi bởi 1 m² vật đen lý tưởng trong 1 giây nếu cực đại ở bước sóng 500 nm bằng bao nhiêu?",
    a: ["43,9·10^6 J", "53,9·10^6 J", "63,9·10^6 J", "73,9·10^6 J"],
    c: 2,
  },
  // Câu 16
  {
    q: "***Công thoát electron của một kim loại là A0, giới hạn quang điện λ0. Khi chiếu vào bề mặt chùm bức xạ λ = λ0/3 thì động năng cực đại của electron quang điện bằng:",
    a: ["2A0", "A0/4", "4A0", "A0/2"],
    c: 0,
  },
  // Câu 17
  {
    q: "Giới hạn quang điện của kim loại dùng làm Catot là 0,66 μm. Tính vận tốc cực đại của electron quang điện khi ánh sáng chiếu vào λ = 0,5 μm:",
    a: ["5,6·10^5 m/s", "6,6·10^5 m/s", "4,6·10^5 m/s", "7,6·10^5 m/s"],
    c: 2,
  },
  // Câu 18
  {
    q: "Trong chân không, ánh sáng tím có bước sóng 0,4 μm. Mỗi phôtôn mang năng lượng xấp xỉ bằng:",
    a: ["4,97·10^-31 J", "4,97·10^-19 J", "2,49·10^-19 J", "2,49·10^-31 J"],
    c: 1,
  },
  // Câu 19
  {
    q: "Công thoát của kim loại là 7,23·10^-19 J. Chiếu lần lượt các bức xạ có tần số f1 = 2,1·10^15 Hz; f2 = 1,33·10^15 Hz; f3 = 9,375·10^14 Hz; f4 = 8,45·10^14 Hz; f5 = 6,67·10^14 Hz. Những bức xạ nào gây hiện tượng quang điện?",
    a: ["f1, f3 và f4", "f2, f3 và f5", "f1 và f2", "f4, f3 và f2"],
    c: 2,
  },
  // Câu 20
  {
    q: "Công thoát electron của kim loại là 7,64·10^-19 J. Chiếu các bức xạ λ1 = 0,18 μm, λ2 = 0,21 μm, λ3 = 0,35 μm. Bức xạ nào gây hiện tượng quang điện?",
    a: [
      "Hai bức xạ (λ1 và λ2)",
      "Không bức xạ nào",
      "Cả ba bức xạ (λ1, λ2 và λ3)",
      "Chỉ bức xạ λ1",
    ],
    c: 0,
  },
  // Câu 21
  {
    q: "Công thoát electron của kim loại làm catôt là 4,5 eV. Chiếu các bức xạ λ1=0,16 μm, λ2=0,20 μm, λ3=0,25 μm, λ4=0,30 μm, λ5=0,36 μm, λ6=0,40 μm. Các bức xạ gây hiện tượng quang điện là:",
    a: ["λ1, λ2", "λ1, λ2, λ3", "λ2, λ3, λ4", "λ3, λ4, λ5"],
    c: 1,
  },
  // Câu 22
  {
    q: "Chiếu chùm bức xạ đơn sắc vào kẽm giới hạn quang điện 0,35 μm. Hiện tượng quang điện sẽ không xảy ra khi bước sóng:",
    a: ["0,1 μm", "0,2 μm", "0,3 μm", "0,4 μm"],
    c: 3,
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
