import followPath from "./utils/followPath";

describe("Valid paths", () => {
  test("A basic example", () => {
    expect(
      followPath(
        `
        @---A---+
                |
        x-B-+   C
            |   |
            +---+`
      )
    ).toStrictEqual({
      letters: "ACB",
      pathData: "@---A---+|C|+---+|+-B-x",
    });
  });

  test("Go straight through intersections", () => {
    expect(
      followPath(`
        @
        | +-C--+
        A |    |
        +---B--+
          |      x
          |      |
          +---D--+
      `)
    ).toStrictEqual({
      letters: "ABCD",
      pathData: "@|A+---B--+|+--C-+|-||+---D--+|x",
    });
  });

  test("Letters may be found on turns", () => {
    expect(
      followPath(`
        @---A---+
                |
        x-B-+   |
            |   |
            +---C`)
    ).toStrictEqual({
      letters: "ACB",
      pathData: "@---A---+|||C---+|+-B-x",
    });
  });

  test("Do not collect a letter from the same location twice", () => {
    expect(
      followPath(`
          +-O-N-+
          |     |
          |   +-I-+
      @-G-O-+ | | |
          | | +-+ E
          +-+     S
                  |
                  x
       `)
    ).toStrictEqual({
      letters: "GOONIES",
      pathData: "@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x",
    });
  });

  test("Keep direction, even in a compact space", () => {
    expect(
      followPath(`
        +-L-+
        |  +A-+
       @B+ ++ H
        ++    x
       `)
    ).toStrictEqual({
      letters: "BLAH",
      pathData: "@B+++B|+-L-+A+++A-+Hx",
    });
  });

  test("Ignore stuff after end of path", () => {
    expect(
      followPath(`
        @-A--+
             |
             +-B--x-C--D
      `)
    ).toStrictEqual({
      letters: "AB",
      pathData: "@-A--+|+-B--x",
    });
  });
});

describe("Invalid paths", () => {
  test("Missing start character", () => {
    const errorMsg = "Missing start character";
    expect(
      followPath(`
        -A---+
             |
      x-B-+   C
         |   |
         +---+
      `)
    ).toStrictEqual({ error: errorMsg, steps: 0 });
  });

  test("Missing end character", () => {
    const errorMsg = "Missing end character";
    expect(
      followPath(`
        @--A---+
               |
         B-+   C
           |   |
           +---+
      `)
    ).toStrictEqual({ error: errorMsg, steps: 1 });
  });

  test("Multiple starts 1", () => {
    const errorMsg = "Multiple starting points";
    expect(
      followPath(`
        @--A-@-+
               |
       x-B-+   C
           |   |
           +---+
      `)
    ).toStrictEqual({ error: errorMsg, steps: 1 });
  });

  test("Multiple starts 2", () => {
    const errorMsg = "Multiple starting points";
    expect(
      followPath(`
        @--A---+
               |
               C
               x
           @-B-+
      `)
    ).toStrictEqual({ error: errorMsg, steps: 1 });
  });

  test("Multiple starts 3", () => {
    const errorMsg = "Multiple starting points";
    expect(
      followPath(`
        @--A--x
      
       x-B-+
           |
           @
      `)
    ).toStrictEqual({ error: errorMsg, steps: 1 });
  });

  test("Fork in path", () => {
    const errorMsg = "Fork in path";
    expect(
      followPath(`
              x-B
                |
         @--A---+
                |
           x+   C
            |   |
            +---+
      `)
    ).toStrictEqual({ error: errorMsg, steps: 8 });
  });

  test("Broken path", () => {
    const errorMsg = "Broken path";
    expect(
      followPath(`
        @--A-+
             |
              
             B-x`)
    ).toStrictEqual({ error: errorMsg, steps: 8 });
  });

  test("Multiple starting paths", () => {
    const errorMsg = "Multiple starting paths";
    expect(followPath(`x-B-@-A-x`)).toStrictEqual({
      error: errorMsg,
      steps: 1,
    });
  });

  test("Fake turns", () => {
    const errorMsg = "Fake turn";
    expect(followPath(`@-A-+-B-x`)).toStrictEqual({
      error: errorMsg,
      steps: 5,
    });
  });
});
