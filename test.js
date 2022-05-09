const answersData = {
  "Вопрос 1 из 2": [
    { playerID: "qNbHr4dqBXoSM67JAAAy", answer: "a1" },
    { playerID: "MpIPx3fv7arMncvQAAAx", answer: "s1" },
  ],
  "Вопрос 2 из 2": [
    { playerID: "qNbHr4dqBXoSM67JAAAy", answer: "a2" },
    { playerID: "MpIPx3fv7arMncvQAAAx", answer: "s2" },
  ],
  "Вопрос 3 из 2": [
    { playerID: "qNbHr4dqBXoSM67JAAAy", answer: "a3" },
    { playerID: "MpIPx3fv7arMncvQAAAx", answer: "s3" },
  ],
  "Вопрос 4 из 2": [
    { playerID: "qNbHr4dqBXoSM67JAAAy", answer: "a4" },
    { playerID: "MpIPx3fv7arMncvQAAAx", answer: "s4" },
  ],
  "Вопрос 5 из 2": [
    { playerID: "qNbHr4dqBXoSM67JAAAy", answer: "a5" },
    { playerID: "MpIPx3fv7arMncvQAAAx", answer: "s5" },
  ],
};

{
  Object.values(answersData).map((i, value) => {
    // console.log(i);
    // console.log(value);

    i.map((is, item) => {
      console.log(is);
      console.log(item);
    });
  });
}
