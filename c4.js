const questions = [
  {
    //Câu 1
    q: "Khi một electron bay vào vùng từ trường theo quỹ đạo song song với các đường sức từ, thì",
    a: [
      "Chuyển động của electron tiếp tục không bị thay đổi",
      "Hướng chuyển động của electron bị thay đổi",
      "Vận tốc của electron bị thay đổi",
      "Năng lượng của electron bị thay đổi",
    ],
    c: 0,
  },
  //Câu 2
  {
    q: "Khi một electron bay vào vùng từ trường theo quỹ đạo vuông góc với các đường sức thì:",
    a: [
      "Chuyển động của electron tiếp tục không bị thay đổi",
      "Hướng chuyển động của electron bị thay đổi",
      "Độ lớn vận tốc của electron bị thay đổi",
      "Năng lượng của electron bị thay đổi",
    ],
    c: 1,
  },
  //Câu 3
  {
    q: "Một proton chuyển động thẳng đều trong một miền có từ trường đều và điện trường đều. Xét trong hệ tọa độ Oxyz, nếu proton chuyển động theo chiều dương của trục Ox và đường sức từ hướng theo chiều dương của trục Oy thì đường sức điện hướng theo chiều",
    a: ["Dương trục Oz", "Âm trục Oz", "Dương trục Ox", "Âm trục Ox"],
    c: 1,
  },
  //Câu 4
  {
    q: "Định luật Lenz khẳng định chiều của dòng điện cảm ứng phải",
    a: [
      "Cùng chiều với dòng điện sinh ra nó",
      "Ngược chiều với dòng điện sinh ra nó",
      "Sinh ra từ trường làm tăng từ thông ban đầu",
      "Sinh ra từ trường chống lại nguyên nhân sinh ra nó",
    ],
    c: 3,
  },
  //Câu 5
  {
    q: "Phát biểu nào sau đây là đúng về từ trường và đường sức từ?",
    a: [
      "Đường sức của điện trường tĩnh là đường khép kín",
      "Lực từ tĩnh là lực thế. Trường lực từ tĩnh là một trường thế",
      "Các đường cảm ứng từ là những đường cong khép kín",
      "Đường sức của điện trường xoáy xuất phát từ điện tích (+) và kết thúc ở điện tích (-)",
    ],
    c: 2,
  },
  //Câu 6
  {
    q: "Khi nói về vectơ cảm ứng từ do dòng điện I chạy trong vòng dây dẫn tròn, bán kính R, gây ra tại điểm M trên trục vòng dây, cách tâm O một khoảng h, phát biểu nào sau đây là SAI?",
    a: [
      "Phương: là trục của vòng dây",
      "Chiều: luôn hướng xa tâm O",
      "Độ lớn: B = μ0 I R^2 / (2 (R^2 + h^2)^(3/2))",
      "Điểm đặt: tại điểm khảo sát M",
    ],
    c: 1,
  },
  //Câu 7
  {
    q: "Công thức nào sau đây tính cường độ từ trường do dòng điện I thẳng dài vô hạn gây ra tại điểm M cách dòng điện I một khoảng R?",
    a: ["H = I / (2 R)", "H = I / 2π R", "H = n I", "H = μ0 I / (2 π R)"],
    c: 1,
  },
  //Câu 8
  {
    q: "Công thức nào sau đây tính cường độ từ trường do dòng điện I chạy trong vòng dây tròn bán kính R gây ra tại tâm O của vòng dây?",
    a: [
      "H = I / (2 R)",
      "H = I / 2π R",
      "H = μμ0 I / (2 π R)",
      "H = μμ0 I  / 2πR",
    ],
    c: 0,
  },
  //Câu 9
  {
    q: "Dòng điện I chạy trên đoạn dây dẫn thẳng AB. Công thức nào sau đây tính cường độ từ trường do dòng điện này gây ra tại điểm M?",
    a: [
      "H = I / 4πh (cos θ1 − cos θ2)",
      "H = I / 2πh (cos θ1 − cos θ2)",
      "H = μμ0 I / 4πh (cos θ1 − cos θ2)",
      "H = I / 2πh (cos θ1 + cos θ2)",
    ],
    c: 0,
  },
  //Câu 10
  {
    q: "Khi nói về đường cảm ứng từ, phát biểu nào sau đây là SAI?",
    a: [
      "Đường cảm ứng từ là đường mà tiếp tuyến với nó tại mỗi điểm trùng với phương của vectơ cảm ứng từ tại điểm đó",
      "Tập hợp các đường cảm ứng từ cho ta cảm nhận trực quan về phân bố từ trường trong không gian",
      "Độ lớn của vectơ cảm ứng từ tỉ lệ thuận với mật độ đường cảm ứng từ tại nơi khảo sát",
      "Nơi nào các đường cảm ứng từ đồng dạng với nhau thì tại đó có từ trường đều",
    ],
    c: 3,
  },
  //Câu 11
  {
    q: "Gọi n→ là pháp vectơ đơn vị của yếu tố diện tích dS, B→ là vectơ cảm ứng từ tại đó, α là góc giữa n→ và B→. Biểu thức nào sau đây tính từ thông gởi qua yếu tố diện tích dS?",
    a: ["dΦm = B · dS", "dΦm = B · dS · sin α", "dΦm = B · dS · n", "Φm = 0"],
    c: 2,
  },

  //Câu 12
  {
    q: "Xét một mặt kín (S) bất kì, nằm trong không gian có từ trường. Phát biểu nào sau đây là đúng?",
    a: [
      "Nếu có một đường cảm ứng từ chui vào (S) thì nó sẽ chui ra khỏi (S).",
      "Nếu trong mặt kín có nam châm thì đường cảm ứng từ chui ra khỏi (S) sẽ đi ra xa mà không chui vào (S).",
      "Từ thông gởi qua (S) sẽ khác không nếu trong mặt kín có nam châm.",
      "Từ thông gởi qua mặt kín bất kì bằng tổng các dòng điện xuyên qua mặt kín đó.",
    ],
    c: 0,
  },

  //Câu 13
  {
    q: "Có 3 dây dẫn thẳng song song, vuông góc với mặt phẳng hình vẽ, có dòng điện I1, I2, I3 chạy qua như hình. Dòng I1 và I2 được giữ chặt. Dòng I3 sẽ chuyển động:",
    a: ["Lên trên", "Xuống dưới", "Sang phải", "Sang trái"],
    c: 3,
  },

  //Câu 14
  {
    q: "Biểu thức nào sau đây diễn đạt định lý O – G đối với từ trường?",
    a: [
      "∮ B→ · dS→(S) = 0",
      "∮ E→ · dS→(S) = 0",
      "∮ B→ · dS→(S) = ∑ qi",
      "∮ H→ · dℓ→(C) = ∑ k Ii",
    ],
    c: 0,
  },
  // Câu 15
  {
    q: "Trong 3 vectơ: vận tốc hạt mang điện 𝑣→, cảm ứng từ 𝐵→ và lực Lorentz 𝐹→ thì:",
    a: [
      "𝐹→ và 𝑣→ có thể hợp với nhau một góc tuỳ ý",
      "𝑣→ và 𝐵→ luôn vuông góc với nhau",
      "𝐵→ và 𝐹→ luôn vuông góc với nhau",
      "𝐹→, 𝑣→ và 𝐵→ đôi một vuông góc nhau",
    ],
    c: 2,
  },
  // Câu 16
  {
    q: "Trong 3 vectơ: vận tốc hạt mang điện 𝑣→, cảm ứng từ 𝐵→ và lực Lorentz 𝐹→ thì:",
    a: [
      "𝐹→ và 𝑣→ có thể hợp với nhau một góc tuỳ ý",
      "𝑣→ và 𝐵→ luôn vuông góc với nhau",
      "𝐵→ và 𝐹→ luôn vuông góc với nhau",
      "𝐹→, 𝑣→ và 𝐵→ đôi một vuông góc nhau",
    ],
    c: 2,
  },

  // Câu 17
  {
    q: "Một electron bay vào trong từ trường đều, bỏ qua ảnh hưởng của trọng lực, chọn phát biểu đúng:",
    a: [
      "Quỹ đạo của electron luôn là đường tròn",
      "Quỹ đạo của electron luôn là đường xoắn ốc",
      "Động năng của electron sẽ tăng dần",
      "Tốc độ của electron không đổi",
    ],
    c: 3,
  },

  // Câu 18
  {
    q: "Một electron bay vào từ trường đều B = 10⁻⁵ T, theo hướng vuông góc với đường sức từ. Nó vạch ra một đường tròn bán kính 91 cm. Tính chu kì quay của electron.",
    a: ["T = 6,55 μs", "T = 7,14 μs", "T = 3,57 μs", "T = 91 μs"],
    c: 2,
  },

  // Câu 19
  {
    q: "Một electron bay vào không gian có từ trường đều có cảm ứng từ B = 10⁻⁴ T với vận tốc ban đầu vo = 3,2·10⁶ m/s vuông góc với vectơ cảm ứng từ, khối lượng electron là 9,1·10⁻³¹ kg. Bán kính quỹ đạo của electron là:",
    a: ["R = 16 cm", "R = 18,2 cm", "R = 15 cm", "R = 17,5 cm"],
    c: 1,
  },

  // Câu 20
  {
    q: "Một khung dây tròn bán kính 10 cm, đặt trong không khí, trên đó quấn 100 vòng dây mảnh. Cường độ dòng điện qua mỗi vòng dây là 1A. Cảm ứng từ tại tâm khung dây là:",
    a: ["B = 6,28·10⁻⁴ T", "B = 500 T", "B = 5 T", "B = 2·10⁻⁴ T"],
    c: 0,
  },

  // Câu 21
  {
    q: "Một đoạn dây dẫn mảnh được uốn thành một cung tròn bán kính R, góc ở tâm bằng 60°. Trong dây dẫn có dòng điện cường độ I chạy qua. Độ lớn của cảm ứng từ tại tâm của cung tròn là:",
    a: [
      "B = μμ₀·I / 6πR",
      "B = μμ₀·I / 6R",
      "B = μμ₀·I / 12πR",
      "B = μμ₀·I / 12R",
    ],
    c: 3,
  },

  // Câu 22
  {
    q: "Một sợi dây dẫn mảnh, được gấp thành hình vuông, cạnh a = 4 cm, đặt trong chân không. Cho dòng điện I = 10 A chạy qua sợi dây. Tính cảm ứng từ tại tâm hình vuông.",
    a: ["B = 0 T", "B = 2·10⁻⁴ T", "B = 1,4·10⁻⁴ T", "B = 2,8·10⁻⁴ T"],
    c: 3,
  },

  // Câu 23
  {
    q: "Một dây dẫn có chiều dài L = 300 m, được quấn đều thành một ống dây có chiều dài l = 80 cm, đường kính d = 20 cm. Cường độ dòng điện qua ống dây là 0,5 A. Cảm ứng từ trong lòng ống dây là:",
    a: ["275 μT", "375 μT", "475 μT", "575 μT"],
    c: 1,
  },

  // Câu 24
  {
    q: "Trong từ trường đều có cường độ H = 1000 A/m, xét một diện tích phẳng S = 50 cm², sao cho các đường sức từ tạo với mặt phẳng của diện tích S một góc 30°. Tính từ thông gởi qua diện tích đó.",
    a: ["2,5 Wb", "4,3 Wb", "3,14·10⁻⁶ Wb", "5,4·10⁻⁶ Wb"],
    c: 2,
  },

  // Câu 25
  {
    q: "Dòng điện I = 10 A chạy qua đoạn dây dẫn thẳng AB đặt trong không khí. Tính cường độ từ trường tại điểm M cách AB một khoảng h = 10 cm, biết θ₁ = 30° và θ₂ = 60°.",
    a: ["H = 34,2 A/m", "H = 10,9 A/m", "H = 21,8 A/m", "H = 2,9 A/m"],
    c: 1,
  },

  // Câu 26
  {
    q: "Một hạt có điện tích 3,2·10⁻¹⁹ C, khối lượng 6,67·10⁻²⁷ kg được tăng tốc bởi hiệu điện thế U = 1000 V. Sau khi tăng tốc hạt này bay vào trong từ trường đều có B = 2 T theo phương vuông góc với các đường sức từ. Tính lực Lorentz tác dụng lên hạt đó.",
    a: [
      "F = 1,98·10⁻¹³ N",
      "F = 1,75·10⁻¹³ N",
      "F = 2,25·10⁻¹³ N",
      "F = 2,55·10⁻¹³ N",
    ],
    c: 0,
  },

  // Câu 27
  {
    q: "Hai hạt có điện tích lần lượt là q₁ và q₂, biết q₁ = -4q₂, bay vào từ trường với cùng tốc độ theo phương vuông góc với đường sức từ, bán kính quỹ đạo của hai hạt tương ứng là R₁ = 2R₂. So sánh khối lượng m₁, m₂ tương ứng của hai hạt:",
    a: ["m₁ = 8 m₂", "m₁ = 2 m₂", "m₁ = 6 m₂", "m₁ = 4 m₂"],
    c: 0,
  },

  // Câu 28
  {
    q: "Trong mặt phẳng hình vẽ, một electron và một hạt α khi được các điện trường tăng tốc bay vào trong từ trường đều theo phương vuông góc với các đường sức từ. Đường sức từ hướng từ sau ra trước như mặt phẳng hình vẽ. Coi rằng vận tốc của các hạt sau khi tăng tốc là bằng nhau. Quỹ đạo:",
    a: [
      "(1) là của e và (2) của hạt α",
      "(1) là của hạt α và (3) của e",
      "(2) là của e và (4) của hạt α",
      "(2) là của e và (3) của hạt α",
    ],
    c: 2,
  },

  // Câu 29
  {
    q: "Hai dây dẫn dài, đặt song song trong không khí, cách nhau d = 20 cm, có dòng điện cùng chiều cường độ I = 2 A chạy qua. Cảm ứng từ tại điểm M cách đều mỗi dây 10 cm là bao nhiêu:",
    a: ["0 T", "10⁻⁶ T", "2·10⁻⁶ T", "3·10⁻⁶ T"],
    c: 0,
  },

  // Câu 30
  {
    q: "Hai dây dẫn dài, đặt song song trong không khí, cách nhau d = 20 cm, có dòng điện cùng chiều cường độ I = 2 A chạy qua. Cảm ứng từ tại điểm N cách đều mỗi dây 20 cm là bao nhiêu:",
    a: ["1,46·10⁻⁶ T", "2,46·10⁻⁶ T", "3,46·10⁻⁶ T", "4,46·10⁻⁶ T"],
    c: 2,
  },

  // Câu 31
  {
    q: "Khung dây hình chữ nhật có diện tích S = 100 cm² quay đều trong từ trường B = 0,1 T với tốc độ 5 vòng/giây. Trục quay của khung dây vuông góc với các đường sức từ. Xác định từ thông gởi qua khung dây ở thời điểm t bất kì. Biết lúc t = 0 pháp tuyến n⃗ của khung dây song song và cùng chiều với vectơ cảm ứng từ B⃗.",
    a: [
      "Φₘ(t) = 10 sin(10πt + π/2) Wb",
      "Φₘ(t) = 10 sin(10πt) Wb",
      "Φₘ(t) = 10⁻³ sin(10πt + π/2) Wb",
      "Φₘ(t) = 0,1 sin(10πt) Wb",
    ],
    c: 2,
  },
  {
    q: "Một proton (m = 1,67·10⁻²⁷ kg) bay vào từ trường đều B = 10⁻⁴ T, theo hướng vuông góc với đường sức từ. Nó vạch ra một đường tròn, bán kính 167 cm. Tính động năng của proton.",
    a: ["4·10⁻¹⁶ J", "8·10⁻¹⁶ J", "16·10⁻¹⁶ J", "2,14·10⁻¹⁹ J"],
    c: 3,
  },

  // Câu 33
  {
    q: "Hai dây dẫn thẳng dài vô hạn đặt cách nhau d = 10 cm trong không khí, có dòng điện I1 = I2 = 10 A cùng chiều chạy qua. Tính cảm ứng từ tại điểm M cách hai dây lần lượt là 8 cm và 6 cm.",
    a: ["33,1·10⁻⁵ T", "13,2·10⁻⁵ T", "4,2·10⁻⁵ T", "2,5·10⁻⁵ T"],
    c: 2,
  },

  // Câu 34
  {
    q: "Cho dây dẫn thẳng rất dài, bị bẻ gấp khúc 45° như hình, có dòng điện I = 10 A chạy qua. Biết AM = BM = 5 cm. Tính độ lớn của vectơ cảm ứng từ tại điểm M.",
    a: ["4·10⁻⁵ T", "4,8·10⁻⁵ T", "6·10⁻⁵ T", "2·10⁻⁵ T"],
    c: 2,
  },

  // Câu 35
  {
    q: "Cho dòng điện I = 10 A chạy qua dây dẫn thẳng và qua vòng dây tròn. Biết bán kính vòng tròn là 2 cm và hệ thống đặt trong không khí. Tính cảm ứng từ tại tâm O của vòng tròn.",
    a: ["B = 10⁻⁴ T", "B = 3,14·10⁻⁴ T", "B = 2,14·10⁻⁴ T", "B = 4,14·10⁻⁴ T"],
    c: 2,
  },

  // Câu 36
  {
    q: "Một dây dẫn rất dài, đặt trong không khí, có dòng điện I = 10 A chạy qua. Sợi dây được uốn làm 3 phần như hình vẽ. Tính cảm ứng từ tại tâm O của cung tròn. Biết bán kính cung tròn là 5 cm.",
    a: ["B = 0 T", "B = 5·10⁻⁶ T", "B = 1,26·10⁻⁴ T", "B = 3,14·10⁻⁵ T"],
    c: 3,
  },

  // Câu 37
  {
    q: "Hạt α có động năng 500 eV bay theo hướng vuông góc với đường sức của một từ trường đều có cảm ứng từ 0,01 T. Tính bán kính quỹ đạo của hạt α. Biết khối lượng hạt α là m = 6,6·10⁻²⁷ kg.",
    a: ["R = 32 m", "R = 32 cm", "R = 16 cm", "R = 16 m"],
    c: 1,
  },

  // Câu 38
  {
    q: "Một electron bay vào từ trường đều có phương vuông góc với các đường sức từ với vận tốc 10⁷ m/s. Electron chuyển động theo đường tròn bán kính 1 cm, khối lượng me = 9,1·10⁻³¹ kg, điện tích e = 1,6·10⁻¹⁹ C. Cảm ứng từ của từ trường là:",
    a: [
      "B = 5,68·10⁻³ T",
      "B = 6,68·10⁻³ T",
      "B = 7,68·10⁻³ T",
      "B = 8,68·10⁻³ T",
    ],
    c: 0,
  },

  // Câu 39
  {
    q: "Hai dòng điện song song và cùng chiều dài, các cường độ điện là I1 và I2, cách nhau một đoạn l. Lực từ tác dụng lên một đơn vị chiều dài (1 m) của mỗi dây có biểu thức nào sau đây:",
    a: [
      "4·10⁻⁷ I1 / l",
      "4·10⁻⁷ I2 / l",
      "2·10⁻⁷ I1 I2 / l",
      "2·10⁻⁷ I1 I2  l",
    ],
    c: 2,
  },

  // Câu 40
  {
    q: "Một khung dây tròn đường kính 20 cm, được quấn bởi 200 vòng dây đồng rất mảnh. Khung dây đặt trong từ trường đều vuông góc với mặt phẳng vòng dây, độ lớn cảm ứng từ biến thiên theo thời gian: B = 0,02t + 0,005t² (SI). Suất điện động cảm ứng trên cuộn dây vào lúc t = 8 s có độ lớn là:",
    a: ["0,628 V", "2,512 V", "0,125 V", "0,502 V"],
    c: 0,
  },

  // Câu 41
  {
    q: "Một proton (m = 1,67·10⁻²⁷ kg) bay vào từ trường đều B = 10⁻⁴ T, theo hướng vuông góc với đường sức từ. Tính số vòng quay của proton trong một giây.",
    a: ["1,526", "1526", "486", "4800"],
    c: 1,
  },

  // Câu 42
  {
    q: "Hai dây dẫn song song cách nhau d = 8 cm, dòng điện chạy trong hai dây I = 10 A cùng chiều. Cảm ứng từ tại những điểm nằm cách đều hai dây dẫn là bao nhiêu?",
    a: ["0", "10⁻⁴ T", "2·10⁻⁴ T", "3·10⁻⁴ T"],
    c: 0,
  },

  // Câu 43
  {
    q: "Hai dây dẫn song song cách nhau d = 8 cm, dòng điện chạy trong hai dây I = 10 A ngược chiều. Cảm ứng từ tại những điểm nằm cách đều hai dây dẫn là bao nhiêu?",
    a: ["10⁻⁴ T", "2·10⁻⁴ T", "3·10⁻⁴ T", "4·10⁻⁴ T"],
    c: 0,
  },

  // Câu 44
  {
    q: "Hai dây dẫn thẳng dài đặt song song cách nhau d = 50 cm, dòng điện I1 = 3 A, I2 = 2 A, cùng chiều. Cảm ứng từ tại điểm M cách I1 30 cm và I2 40 cm là bao nhiêu?",
    a: ["1,24·10⁻⁴ T", "2,24·10⁻⁴ T", "3,24·10⁻⁴ T", "4,24·10⁻⁴ T"],
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
