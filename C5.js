const questions = [
  // Câu 1
  {
    q: "Theo lý thuyết tương đối của Einstein, phát biểu nào sau đây là sai?",
    a: [
      "Thời gian phụ thuộc vào chuyển động",
      "Không gian phụ thuộc vào chuyển động",
      "Khoảng không gian không phụ thuộc vào chuyển động",
      "Khối lượng phụ thuộc vào chuyển động",
    ],
    c: 2,
  },
  // Câu 2
  {
    q: "Theo thuyết tương đối hẹp thì:",
    a: [
      "Trạng thái của một vật là giống nhau trong mọi hệ qui chiếu quán tính",
      "Khối lượng của một vật có cùng trị số trong mọi hệ quy chiếu quán tính",
      "Các hiện tượng vật lý diễn ra như nhau trong mọi hệ quy chiếu quán tính",
      "Khái niệm thời gian và không gian là như nhau trong mọi hệ quy chiếu quán tính",
    ],
    c: 2,
  },
  // Câu 3
  {
    q: "Theo thuyết tương đối hẹp thì tốc độ ánh sáng truyền đi trong chân không c = 300.000 km/s:",
    a: [
      "Bằng nhau trong mọi hệ quy chiếu quán tính",
      "Không phụ thuộc vào phương truyền",
      "Chỉ phụ thuộc vào tốc độ của nguồn phát",
      "Là tốc độ giới hạn của mọi chuyển động",
    ],
    c: 2,
  },
  // Câu 4
  {
    q: "Theo thuyết tương đối hẹp khi một vật đứng yên thì:",
    a: [
      "Năng lượng của vật bằng không",
      "Khối lượng của vật bằng không",
      "Động lượng của vật bằng không",
      "Tất cả đều sai",
    ],
    c: 2,
  },
  // Câu 5
  {
    q: "Trong trường hợp nào thì cơ học cổ điển được coi là trường hợp riêng của cơ học tương đối tính?",
    a: [
      "Khi tốc độ vật v = c",
      "Khi tốc độ vật v << c",
      "Khi tốc độ vật v >> c",
      "Không có trường hợp nào",
    ],
    c: 1,
  },
  // Câu 6
  {
    q: "Theo thuyết tương đối hẹp, khi vật chuyển động thì năng lượng của vật:",
    a: [
      "Chỉ có năng lượng nghỉ",
      "Chỉ có động năng",
      "Gồm năng lượng nghỉ và động năng",
      "Có thể có năng lượng nghỉ hoặc động năng",
    ],
    c: 2,
  },
  // Câu 7
  {
    q: "Theo thuyết tương đối hẹp thì đối với hệ kín:",
    a: [
      "Khối lượng nghỉ được bảo toàn",
      "Năng lượng nghỉ được bảo toàn",
      "Khối lượng tương đối tính được bảo toàn",
      "Năng lượng toàn phần được bảo toàn",
    ],
    c: 3,
  },
  // Câu 8
  {
    q: "Phôtôn ứng với một bức xạ có:",
    a: [
      "Khối lượng tương đối tính bằng không",
      "Khối lượng nghỉ bằng không",
      "Năng lượng nghỉ bằng không",
      "Tốc độ v = c",
    ],
    c: 0,
  },
  // Câu 9
  {
    q: "Khối lượng của hạt α tăng thêm bao nhiêu nếu tăng vận tốc từ 0 đến 0,9 lần vận tốc ánh sáng? Biết khối lượng hạt α là 6,67·10⁻²⁷ kg.",
    a: [
      "∆m = 5,6·10⁻²⁷ kg",
      "∆m = 6,6·10⁻²⁷ kg",
      "∆m = 7,6·10⁻²⁷ kg",
      "∆m = 8,6·10⁻²⁷ kg",
    ],
    c: 3,
  },
  // Câu 10
  {
    q: "Người quan sát S gán các tọa độ x=100 km, t=200 μs cho một biến cố. Tọa độ của biến cố này trong hệ S’ chuyển động theo chiều x tăng với vận tốc 0,950c là bao nhiêu?",
    a: ["x' = 117710 m", "x' = 127710 m", "x' = 147710 m", "x' = 137710 m"],
    c: 3,
  },
  // Câu 11
  {
    q: "Một cây sào nằm song song với trục Ox của hệ S, chuyển động dọc trục này với v = 0,630c. Độ dài tĩnh của sào là 1,70 m. Hỏi độ dài đo được trong hệ S?",
    a: ["1,12 m", "1,22 m", "1,32 m", "1,42 m"],
    c: 2,
  },
  // Câu 12
  {
    q: "Một vật phải có vận tốc bằng bao nhiêu để kích thước theo phương chuyển động giảm đi 3 lần?",
    a: [
      "v ≈ 0,83·10⁸ m/s",
      "v ≈ 1,83·10⁸ m/s",
      "v ≈ 2,83·10⁸ m/s",
      "v ≈ 3,83·10⁸ m/s",
    ],
    c: 2,
  },
  // Câu 13
  {
    q: "Khối lượng của hạt α thay đổi bao nhiêu nếu tăng vận tốc từ 0 đến 0,85c?",
    a: ["0,59 lần", "0,69 lần", "0,79 lần", "0,89 lần"],
    c: 3,
  },
  // Câu 14
  {
    q: "Một hành khách ngồi phía sau tên lửa bắn viên đạn vào bia ở đầu mũi tên lửa. Độ dài tên lửa 60 m, vận tốc viên đạn trong hệ hành khách 0,8c. Thời gian bay đối với quan sát viên mặt đất là bao nhiêu khi vận tốc tên lửa đối với mặt đất 0,6c?",
    a: ["4,63·10⁻⁷ s", "5,63·10⁻⁷ s", "6,63·10⁻⁷ s", "7,63·10⁻⁷ s"],
    c: 0,
  },
  // Câu 15
  {
    q: "Sau thời gian bao lâu (theo thời gian hành khách) thì viên đạn đến đích?",
    a: ["2,5·10⁻⁷ s", "3,5·10⁻⁷ s", "4,5·10⁻⁷ s", "5,5·10⁻⁷ s"],
    c: 0,
  },
  // Câu 16
  {
    q: "Khi hai tên lửa A và B bay gặp nhau, hoa tiêu của A thấy tên lửa B đi qua mũi A hết 5·10⁻⁷ s. Vận tốc tương đối của hai tên lửa là:",
    a: ["0,3c", "0,4c", "0,5c", "0,6c"],
    c: 3,
  },
  // Câu 17
  {
    q: "Quan sát viên O thấy tên lửa mất 5·10⁻⁷ s để bay hết quãng đường 90 m giữa hai điểm đứng yên. Vận tốc của tên lửa đối với O là:",
    a: ["0,5c", "0,6c", "0,7c", "0,8c"],
    c: 1,
  },
  // Câu 18
  {
    q: "Tọa độ chớp sáng do O đo x=100 km, t=5·10⁻⁴ s. Tọa độ x’ của chớp sáng đối với O’ chuyển động -0,8c dọc Ox là bao nhiêu?",
    a: ["167 km", "267 km", "367 km", "467 km"],
    c: 2,
  },
  // Câu 19
  {
    q: "Thời gian t’ của chớp sáng đối với O’ chuyển động -0,8c dọc Ox là bao nhiêu?",
    a: ["12,8·10⁻⁴ s", "13,8·10⁻⁴ s", "14,8·10⁻⁴ s", "15,8·10⁻⁴ s"],
    c: 0,
  },
  // Câu 20
  {
    q: "Máy bay chuyển động v=600 m/s. Độ dài riêng của máy bay 60 m. Độ dài bị co ngắn đối với quan sát viên mặt đất là bao nhiêu?",
    a: ["1,20·10⁻¹⁰ m", "1,20·10⁻¹¹ m", "1,20·10⁻¹² m", "1,20·10⁻¹³ m"],
    c: 0,
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
