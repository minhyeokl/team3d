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
  const [printPage, setPrintPage] = useState(true)
  const [caseFlag, setCaseFlag] = useState(false)
  const [printSubSection, setPrintSubSection] = useState(true)

  const [resultText, setResultText] = useState("")

  function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function (resolve, reject) {
      PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
        // The main trick to obtain the text of the PDF page, use the getTextContent method
        pdfPage.getTextContent().then(function (textContent) {
          let textItems = textContent.items
          let finalString = []
          let lineString = ""
          let lineY = 0

          const whitespaceRegex = /\s/g
          const partRegex = /^PART /gi
          const chapterRegex = /^CHAPTER /gi
          const sectionRegex = /^\d+\.\d+ /gi
          const subsectionRegex = /^\d+\.\d+\.\d+ /gi
          const hasPageRegex = /\.{5,} ?\d+/g

          // Concatenate the string of the item to the final string
          for (var i = 0; i < textItems.length; i++) {
            var item = textItems[i]
            if (Math.abs(item.transform[5] - lineY) >= 10 || i == textItems.length - 1) {
              lineY = item.transform[5]
              if (lineString.trim() != "") {
                let strCategory = null
                lineString.replace(whitespaceRegex, ' ')
                if (lineString.match(partRegex)) {
                  strCategory = 'part'
                }
                else if (lineString.match(chapterRegex)) {
                  strCategory = 'chapter'
                }
                else if (lineString.match(sectionRegex)) {
                  strCategory = 'section'
                }
                else if (lineString.match(subsectionRegex)) {
                  strCategory = 'subsection'
                }
                else if (lineString.match(hasPageRegex)) {
                  strCategory = 'hasPage'
                }

                if (strCategory != null) {
                  const splitRegex = /\.{5,} ?/g
                  const splitedStr = lineString.split(splitRegex)
                  let titleStr = splitedStr[0]
                  let pageNum = splitedStr[1]
                  let resultStr = titleStr
                  if (caseFlag == true){
                    resultStr = titleStr.toUpperCase()
                  }
                  finalString.push({ category: strCategory, title: resultStr, page: pageNum | null })
                }
              }
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
  const handleFile = (event) => {
    setFile(event.target.files[0])
  }
  const readPdf = (event) => {
    event.preventDefault()
    const fileReader = new FileReader()
    let finalTable = []
    fileReader.onload = function () {
      var typedarray = new Uint8Array(this.result)
      const loadingTask = PDFJS.getDocument(typedarray)
      loadingTask.promise.then(pdf => {
        const pdfDocument = pdf;
        const pagesPromises = [];
        for (let i = startPage - 1; i < endPage; i++) {
          (function (pNum) {
            pagesPromises.push(getPageText(pNum, pdfDocument))
          })(i + 1)
        }
        Promise.all(pagesPromises).then(function (pagesText) {
          for (var i = 0; i < pagesText.length; i++) {
            for (var j = 0; j < pagesText[i].length; j++) {
              finalTable.push(pagesText[i][j])
            }
          }
          let resultStr = ""
          for(var i=0; i < finalTable.length; i++){
            if (finalTable[i].category == 'subsection' && printSubSection == false){
              continue
            }
            else {
              if(finalTable[i].category == 'part' || finalTable[i].category == 'chapter'){
                resultStr += '\n'
              }
              else if(finalTable[i].category == 'section'){
                resultStr += '_'
              }
              else if(finalTable[i].category == 'subsection'){
                resultStr += '__'
              }
              resultStr += finalTable[i].title
              if(printPage == true && finalTable[i].page != 0){
                resultStr += ' '
                resultStr += finalTable[i].page
              }
              resultStr += '\n'
            }        
          }
          
          setResultText(resultStr)
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
              <InputNumber min={4} step={1} value={startPage} onChange={setStart} />
              <br />
              목차 끝 페이지:
              <InputNumber min={4} step={1} value={endPage} onChange={setEnd} />
            </p>
            <input type='file'
              id='files'
              accept='application/pdf'
              onChange={handleFile}
            />

            <p>
              <input
                type="checkbox"
                checked={printSubSection}
                onChange={e => setPrintSubSection(e.target.checked)}
              />
              세부절(1.1.1) 포함
              <br />
              <input
                type="checkbox"
                checked={printPage}
                onChange={e => setPrintPage(e.target.checked)}
              />
              페이지 포함
              <br />
              <input
                type="checkbox"
                checked={caseFlag}
                onChange={e => setCaseFlag(e.target.checked)}
              />
              영문을 모두 대문자로 변환
              
            </p>

            <input type='submit' value="목차 추출하기" onClick={readPdf} />
          </form>
        </div>
        <div className={styles.result}>
          {resultText}
        </div>
      </main>
    </div>
  )
}
