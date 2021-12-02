

let mockDateTime: string | null = null;


export const getDateTime = () => {
    if (mockDateTime) {
      return mockDateTime;
    }
}