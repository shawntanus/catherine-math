
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generator = {
  g1() {
    var a, b, a1;
    do {
      a = getRndInteger(10, 18);
      b = getRndInteger(1, 9);
      a1 = a % 10;
    } while (a1 >= b);

    return { question: a + " - " + b, answer: a - b }
  },
  g2() {
    var a = getRndInteger(11, 98), b, a1, b1;
    a1 = a % 10;
    do {
      b = getRndInteger(1, a - 1);
      b1 = b % 10;
    } while (a1 < b1);

    return { question: a + " - " + b, answer: a - b }
  },
  g3() {
    var a = getRndInteger(11, 98), b, a1, b1;
    a1 = a % 10;
    if (a1 === 9) { a--; a1--; }
    do {
      b = getRndInteger(1, a - 1);
      b1 = b % 10;
    } while (a1 >= b1);

    return { question: a + " - " + b, answer: a - b }
  },
  g4() {
    var a = getRndInteger(21, 98);
    var b = getRndInteger(10, a - 1);

    return { question: a + " - " + b, answer: a - b }
  },
  g5() {
    var a = getRndInteger(200, 999);
    var b = getRndInteger(100, a - 1);

    return { question: a + " - " + b, answer: a - b }
  },
  g6() {
    var a = getRndInteger(1, 9);
    var b = getRndInteger(1, 9);

    return { question: a + " x " + b, answer: a * b }
  }
}

export default generator;