import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import InputNumber from 'react-input-number';


import * as PDFJS from 'pdfjs-dist'
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`

export default function Home() {
  const [startPage, setStart] = useState(4)
  const [endPage, setEnd] = useState(5)
  const [file, setFile] = useState()
  function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            // The main trick to obtain the text of the PDF page, use the getTextContent method
            pdfPage.getTextContent().then(function (textContent) {
                let textItems = textContent.items
                let finalString = ""
                let lineString = ""
                let lineY = 0

                // Concatenate the string of the item to the final string
                for (var i = 0; i < textItems.length; i++) {
                    var item = textItems[i]
                    if(Math.abs(item.transform[5]-lineY) >= 10 || i == textItems.length-1){
                      if(lineString.trim() != "") 
                        finalString += lineString + "\n"
                      lineY = item.transform[5]
                      lineString = ""
                    }
                    lineString += item.str
                }
                // Solve promise with the text retrieven from the page
                resolve(finalString)
            });
        });
    });
  }
  const handleFile = (event) =>{
    setFile(event.target.files[0])
  }
  const readPdf = (event) => {
    event.preventDefault()
    const fileReader = new FileReader()
    fileReader.onload = function() {
      var typedarray = new Uint8Array(this.result)
      const loadingTask = PDFJS.getDocument(typedarray)
      loadingTask.promise.then(pdf => {
          const pdfDocument = pdf;
          const pagesPromises = [];
          for(let i=startPage-1; i<endPage; i++){
            (function(pNum){
              pagesPromises.push(getPageText(pNum,pdfDocument))
            })(i+1)
          }
          Promise.all(pagesPromises).then(function (pagesText) {
            for(var i = 0; i < pagesText.length;i++){
              console.log(pagesText[i])
            }
            
        })
      })
    }
    fileReader.readAsArrayBuffer(file)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Team3D</title>
        <meta name="description" content="Get the TABLE!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.div}>
          <form>
            <p>
            목차 시작 페이지:
            <InputNumber min={4} step={1} value={startPage} onChange={setStart}/>
            <br/>
            목차 끝 페이지:
            <InputNumber min={4} step={1} value={endPage} onChange={setEnd} />
            </p>
            <input type='file'
              id='files'
              accept='application/pdf'
              onChange={handleFile}
            />
            <p/>
            <input type='submit' value="목차 추출하기" onClick={readPdf}/>
          </form>
        </div>
      </main>
    </div>
  )
}
