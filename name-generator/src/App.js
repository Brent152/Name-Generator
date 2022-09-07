import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import translate from 'translate';


function App() {


  // Set up translator
  translate.engine = "google";

  let languages = [
    'Spanish',
    'French',
    'German',
    'Italian',
  ];

  let words = [
    'Write',
    'Book',
    'Person'
  ];


  const translateWords = async (words, languages) => {
    let curTranslations = {};
    languages.forEach(async (language) => {
      curTranslations[language] = {};
      await words.forEach(async (word) => {
        curTranslations[language][word] = await translate(word, language)
      });
    });
    // console.log(curTranslations);
    // setTranslations(curTranslations);
  }

  // const [translations, setTranslations] = useState(translateWords(words, languages));


  return (
    <div className="App" >
      <div className=''>
        <Table>

          <thead>
            <tr>
              <th>#</th>
              {words.map((word) => {
                return (
                  <th key={word}>{word}</th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {/* {languages.map((language) => { // Map language headers
              return (
                <tr key={language + ' Row'}>
                  <td key={language + ' Header'}>{language}</td>

                  {translations.map((word) => { // Map words to their translations
                    return (<td key={language + ' : ' + word}>{word}</td>)
                  })}
                </tr>
              )
            })} */}
          </tbody>

        </Table>
      </div>
    </div>
  );
}

export default App;
