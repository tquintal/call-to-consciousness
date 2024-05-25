export const getFullDate = () => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getMonthYear = () => {
  const date = new Date();

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${year}`;
};

function fileToBase64(input: string | FileList): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof input === "string") {
      resolve(input);
    } else if (input instanceof FileList) {
      if (input.length === 0) {
        reject(new Error("FileList is empty"));
      }

      const file = input[0];
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    } else {
      reject(new Error("Invalid input type"));
    }
  });
}

export async function processImage(image: string | FileList): Promise<string> {
  if (!image) {
    throw new Error("Image is not provided");
  }
  return fileToBase64(image);
}
