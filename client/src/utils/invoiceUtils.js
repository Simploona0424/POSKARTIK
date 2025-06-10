import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const handleDownloadPDF = async (printRef) => {

    if (!printRef.current) return;

    try {
        const style = document.createElement("style");
        document.head.appendChild(style);

        const canvas = await html2canvas(printRef.current, {
            scale: 4,
            useCORS: true,
            backgroundColor: "#ffffff",
            onclone: (documentClone) => {
                const clonedElement = documentClone.getElementById("printRefId");
                if (clonedElement) {
                    clonedElement.style.fontFamily = "Arial, sans-serif";
                    clonedElement.style.color = "black";
                    clonedElement.style.border = "1px solid #000";
                }
            },
        });

        const dataURL = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(dataURL, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Invoice.pdf");
        document.head.removeChild(style);
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
}