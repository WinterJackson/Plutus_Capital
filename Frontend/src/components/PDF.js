import React from "react";
import jspdf from "jspdf";
import html2canvas from "html2canvas";

const PDF = ({ component, name }) => {
  const ref = React.useRef(null);

  const generatePDF = async () => {
    const canvas = await html2canvas(ref.current);
    const imgData = canvas.toDataURL();

    const pdf = new jspdf();
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save(name + ".pdf");
  };

  return (
    <div ref={ref}>
      {component}
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default PDF;
