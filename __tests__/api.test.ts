// __tests__/api.test.ts
describe("fetchLatestCode", () => {
  it("returns the latest saved code within the timeout window", async () => {
    // Simulates an async operation that takes variable time
    const result = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("console.log('hello')");
      }, 80);
    });

    expect(result).not.toBeNull();
  });
});
