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

export function fileToBase64(fileList: FileList): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const file = fileList[0];

    if (!file) {
      reject(new Error("Nenhum ficheiro selecionado"));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = () => {
      reject(new Error("Erro ao ler o ficheiro"));
    };

    reader.readAsDataURL(file);
  });
}
