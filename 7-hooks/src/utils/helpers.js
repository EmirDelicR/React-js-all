export const mockApiCall = (success, timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        const MOCK_DATA = [
          { id: Math.random().toString(), title: "Test_1", amount: 5 },
          { id: Math.random().toString(), title: "Test_2", amount: 3 }
        ];
        resolve({ isResolved: true, data: MOCK_DATA });
      } else {
        reject({ message: "Error occurred" });
      }
    }, timeout || 2000);
  });
};
