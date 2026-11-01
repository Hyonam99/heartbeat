import { toJpeg, toPng } from "html-to-image";

export type ImageFormat = "png" | "jpeg";

const renderOptions = { pixelRatio: 2, backgroundColor: "#ffffff", cacheBust: true };

const download = (dataUrl: string, filename: string) => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
};

export const exportImage = async (node: HTMLElement, format: ImageFormat, name: string) => {
  const dataUrl =
    format === "png"
      ? await toPng(node, renderOptions)
      : await toJpeg(node, { ...renderOptions, quality: 0.92 });
  download(dataUrl, `${name}.${format === "png" ? "png" : "jpg"}`);
};

export const exportPdf = async (node: HTMLElement, name: string) => {
  const { jsPDF } = await import("jspdf");
  const dataUrl = await toPng(node, renderOptions);
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 10;
  const width = pageWidth - margin * 2;
  const height = (node.offsetHeight / node.offsetWidth) * width;
  pdf.addImage(dataUrl, "PNG", margin, margin, width, height);
  pdf.save(`${name}.pdf`);
};
