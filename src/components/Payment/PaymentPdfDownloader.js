import React  from 'react';
import { PDFDocument, StandardFonts,  } from 'pdf-lib';
import { saveAs } from 'file-saver';
import buttonSvgrepo from '../../assets/img/download-button-svgrepo-com.svg'

const MyComponent = (props) => {
  const handleDownloadPdf = async () => {

    var myReason = ""

    if (typeof (props.data.Reason) == 'string') {
      myReason = props.data.Reason
    } else if (typeof (props.data.Reason == 'object')) {
      for (var i in props.data.Reason) {
        myReason += props.data.Reason[i].reason + ", "
      }
    } else {
      myReason = "-"
    }

    const pdfDoc = await PDFDocument.create();
    const headerPage = pdfDoc.addPage();
    const { width, height } = headerPage.getSize();
    const headerFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pngFile = 'https://aliresa1998.github.io/smpassLogo/mylogopdf.png'
    const smpassLogo = await fetch(pngFile).then(res => res.arrayBuffer())
    const smpassLogo2 = await pdfDoc.embedPng(smpassLogo)
    headerPage.drawImage(smpassLogo2, {
      x: (width - 200) / 2,
      y: height - 800,
      width: 200,
      height: 40,
    });
    const contentFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    headerPage.drawText("Invoice", {
      x: ((width - contentFont.widthOfTextAtSize("Invoice", 24)) / 2),
      y: height - 100,
      size: 24,
      font: contentFont,
    });

    var longestValue = props.data.Name
    if (props.data.Email.length > longestValue)
      longestValue = props.data.Email
    if (props.data.Phone.length > longestValue)
      longestValue = props.data.Phone
    if (myReason.length > longestValue)
      longestValue = myReason
    if (props.data.Amount.length > longestValue)
      longestValue = props.data.Amount
    if (props.data.Clinic.length > longestValue)
      longestValue = props.data.Clinic


    headerPage.drawText("Name", {
      x: ((width - contentFont.widthOfTextAtSize("Name", 12)) / 2) - 200,
      y: height - 250,
      size: 12,
      font: contentFont,
    });

    headerPage.drawText(props.data.Name, {
      x: ((width - contentFont.widthOfTextAtSize(longestValue, 14)) / 2) + 50,
      y: height - 250,
      size: 12,
      font: contentFont,
    });


    headerPage.drawText("Email", {
      x: ((width - contentFont.widthOfTextAtSize("Email", 12)) / 2) - 200,
      y: height - 300,
      size: 12,
      font: contentFont,
    });

    headerPage.drawText(props.data.Email, {
      x: ((width - contentFont.widthOfTextAtSize(longestValue, 14)) / 2) + 50,
      y: height - 300,
      size: 12,
      font: contentFont,
    });

    headerPage.drawText("Phone", {
      x: ((width - contentFont.widthOfTextAtSize("Phone", 12)) / 2) - 200,
      y: height - 350,
      size: 12,
      font: contentFont,
    });

    headerPage.drawText(props.data.Phone, {
      x: ((width - contentFont.widthOfTextAtSize(longestValue, 14)) / 2) + 50,
      y: height - 350,
      size: 12,
      font: contentFont,
    });

    headerPage.drawText("Reason", {
      x: ((width - contentFont.widthOfTextAtSize("Reason", 12)) / 2) - 200,
      y: height - 400,
      size: 12,
      font: contentFont,
    });

    headerPage.drawText(myReason, {
      x: ((width - contentFont.widthOfTextAtSize(longestValue, 14)) / 2) + 50,
      y: height - 400,
      size: 12,
      font: contentFont,
    });
    headerPage.drawText("Amount", {
      x: ((width - contentFont.widthOfTextAtSize("Amount", 12)) / 2) - 200,
      y: height - 450,
      size: 12,
      font: contentFont,
    });

    headerPage.drawText(props.data.Amount, {
      x: ((width - contentFont.widthOfTextAtSize(longestValue, 14)) / 2) + 50,
      y: height - 450,
      size: 12,
      font: contentFont,
    });
    headerPage.drawText("Clinic", {
      x: ((width - contentFont.widthOfTextAtSize("Clinic", 12)) / 2) - 200,
      y: height - 500,
      size: 12,
      font: contentFont,
    });

    headerPage.drawText(props.data.Clinic, {
      x: ((width - contentFont.widthOfTextAtSize(longestValue, 14)) / 2) + 50,
      y: height - 500,
      size: 12,
      font: contentFont,
    });


    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'y-document.pdf');
  };

  return (

    <img onClick={handleDownloadPdf} style={{ width: "20px", marginTop: "-10px" , cursor:"pointer" }} src={buttonSvgrepo} />

  );
};

export default MyComponent;