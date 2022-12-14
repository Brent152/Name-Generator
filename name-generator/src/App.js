import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import translate from 'translate';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './App.css';

const GetSynonyms = require('synonyms');


function App() {


  // Set up translator
  translate.engine = "google";

  const ourLanguages = [
    'Afrikaans',
    'Dutch',
    'Finnish',
    'Gaelic',
    'German',
    'Hungarian',
    'Icelandic',
    'Indonesian',
    'Irish',
    'Kurdish',
    'Latin',
    'Latvian',
    'Norwegian',
    'Polish',
    'Romanian',
    'Sundanese',
    'Swedish'

  ]

  const englishAlphabetLanguages = [
    'Afrikaans',
    'Albanian',
    'Azerbaijani',
    'Basque',
    'Bosnian',
    'Catalan',
    'Corsican',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'Esperanto',
    'Estonian',
    'Finnish',
    'French',
    'Galician',
    'German',
    'Haitian Creole',
    'Hausa',
    'Hungarian',
    'Icelandic',
    'Igbo',
    'Indonesian',
    'Irish',
    'Italian',
    'Javanese',
    'Kinyarwanda',
    'Kurdish',
    'Latin',
    'Latvian',
    'Lithuanian',
    'Luxembourgish',
    'Malagasy',
    'Malay',
    'Maltese',
    'Maori',
    'Norwegian',
    'Nyanja',
    'Polish',
    'Portuguese',
    'Romanian',
    'Samoan',
    'Gaelic',
    'Shona',
    'Slovak',
    'Slovenian',
    'Somali',
    'Spanish',
    'Sundanese',
    'Swahili',
    'Swedish',
    'Tagalog',
    'Turkish',
    'Turkmen',
    'Uzbek',
    'Vietnamese',
    'Welsh',
    'Xhosa',
    'Yoruba',
    'Zulu',
  ]

  const languages = [
    'Afrikaans',
    'Albanian',
    'Amharic',
    'Arabic',
    'Armenian',
    'Azerbaijani',
    'Basque',
    'Belarusian',
    'Bengali',
    'Bosnian',
    'Bulgarian',
    'Catalan',
    'Chinese',
    'Corsican',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'Esperanto',
    'Estonian',
    'Finnish',
    'French',
    'Galician',
    'Georgian',
    'German',
    'Greek',
    'Gujarati',
    'Haitian Creole',
    'Hausa',
    'Hebrew',
    'Hindi',
    'Hungarian',
    'Icelandic',
    'Igbo',
    'Indonesian',
    'Irish',
    'Italian',
    'Japanese',
    'Javanese',
    'Kannada',
    'Kazakh',
    'Kinyarwanda',
    'Korean',
    'Kurdish',
    'Kyrgyz',
    'Lao',
    'Latin',
    'Latvian',
    'Lithuanian',
    'Luxembourgish',
    'Macedonian',
    'Malagasy',
    'Malay',
    'Malayalam',
    'Maltese',
    'Maori',
    'Marathi',
    'Mongolian',
    'Nepali',
    'Norwegian',
    'Nyanja',
    'Pashto',
    'Persian',
    'Polish',
    'Portuguese',
    'Punjabi',
    'Romanian',
    'Russian',
    'Samoan',
    'Gaelic',
    'Serbian',
    'Shona',
    'Sindhi',
    'Sinhala',
    'Slovak',
    'Slovenian',
    'Somali',
    'Spanish',
    'Sundanese',
    'Swahili',
    'Swedish',
    'Tagalog',
    'Tajik',
    'Tamil',
    'Tatar',
    'Telugu',
    'Thai',
    'Turkish',
    'Turkmen',
    'Ukrainian',
    'Urdu',
    'Uyghur',
    'Uzbek',
    'Vietnamese',
    'Welsh',
    'Xhosa',
    'Yiddish',
    'Yoruba',
    'Zulu',
  ];

  const [words, setWords] = useState(() => {
    return [
      'Enter',
      'Custom',
      'Words',
      'Above',
    ]
  });

  const [synonyms, setSynonyms] = useState(() => {
    return []
  });



  const [showFilter, setShowFilter] = useState(() => {
    return false;
  });

  const [showSynonyms, setShowSynonyms] = useState(() => {
    return false;
  });

  const [languageSelection, setLanguageSelection] = useState(() => {
    let temp = {};
    for (const language of languages) {
      if (englishAlphabetLanguages.includes(language)) {
        temp[language] = 1;
      } else {
        temp[language] = 0;
      }
    }
    return temp;
  });


  const [translations, setTranslations] = useState(() => {
    return null;
  });

  useEffect(() => {
    async function translateWords(languages, words) {
      let curTranslations = {};
      languages.forEach(async (language) => {
        curTranslations[language] = {};
        words.forEach(async (word) => {
          curTranslations[language][word] = await translate(word, language);
        });
      });
      setTranslations(curTranslations)

    }
    translateWords(languages, words);
  }, [words, languageSelection]);

  const clearSelection = () => {
    let temp = {};
    for (const language in (languageSelection)) {
      temp[language] = 0;
    }
    if (showFilter) {
      setShowFilter(false);
      setTimeout(() => {
        setShowFilter(true);
      }, 10)
    }
    setLanguageSelection(temp);
  }

  const setOurSelection = () => {
    let temp = {};
    for (const language of (languages)) {
      if (ourLanguages.includes(language)) {
        temp[language] = 1;
      } else {
        temp[language] = 0;
      }
    }
    if (showFilter) {
      setShowFilter(false);
      setTimeout(() => {
        setShowFilter(true);
      }, 10)
    }
    setLanguageSelection(temp);
  }

  const formatGivenSynonyms = (list) => {
    let result = "- ";
    list.forEach((synonym) => {
      result += synonym + ", "
    })
    return result.slice(0, -2);
  }


  return (
    <div className='App bg-dark'>


      <div className='container'>

        <Button variant='outline-primary' className='justify-content-end mt-3 mb-3' onClick={() => { showFilter ? setShowFilter(false) : setShowFilter(true) }}>Show Language Filter</Button>
        <Button variant='outline-primary' className='justify-content-end ms-3 mt-3 mb-3' onClick={() => { setOurSelection(); }}>Filter To Favorite Languages</Button>
        <Button variant='outline-primary' className='justify-content-end ms-3 mt-3 mb-3' onClick={() => { clearSelection(); }}>Clear Language Selection</Button>

        {showFilter &&
          <div className='row-1 container mt-2 mb-3'>
            <hr className='mb-3' style={{ color: 'white' }} />
            <div className='row'>
              {languages.map((language, index) => {
                if (englishAlphabetLanguages.includes(language)) {

                  return (
                    <Form className='col-3' key={index}>
                      <Form.Check
                        className='text-white'
                        onClick={() => {
                          let temp = languageSelection;
                          temp[language] = languageSelection[language] ? 0 : 1;
                          setLanguageSelection(temp)
                        }}
                        defaultChecked={languageSelection[language]}
                        type='switch'
                        id={language + 'Switch'}
                        label={language}
                      />
                    </Form>
                  )

                } else {

                  return (
                    <Form className='col-3' key={index}>
                      <Form.Check
                        className='text-white'
                        onClick={() => {
                          let temp = languageSelection;
                          temp[language] = languageSelection[language] ? 0 : 1;
                          setLanguageSelection(temp)
                        }}
                        defaultChecked={languageSelection[language]}
                        type='switch'
                        id={language + 'Switch'}
                        label={language}
                      />
                    </Form>
                  )
                }

              })}
              <hr className='mt-3' style={{ color: 'white' }} />
            </div>
          </div>
        }

        <Form.Group className='mb-4'>
          <Form.Label className='styled-white'>Enter List of Words (Comma Seperated)</Form.Label>
          <Form.Control id='wordsControl' className='styled-white mb-3' />
          <Button variant='outline-primary' className=' ' style={{ width: '' }} onClick={() => {
            let input = []
            let rawInput = document.getElementById('wordsControl').value;
            rawInput !== "" && rawInput.split(',').forEach(word => input.push(word.trim()));
            setWords(input);
            // (setTranslations(translateWords(languages, input)));
          }}>Translate</Button>

          <Button variant='outline-primary' className='ms-3' style={{ width: '' }} onClick={() => {
            let input = []
            let rawInput = document.getElementById('wordsControl').value;
            rawInput !== "" && rawInput.split(',').forEach(word => input.push(word.trim()));
            setWords(input);
            let curSynonyms = {};
            input.forEach((word) => {
              try {
                curSynonyms[word] = (Object.values(GetSynonyms(word)))[0];
              } catch {
                curSynonyms[word] = [word, 'No synonyms found']
              }
            });
            setSynonyms(curSynonyms);
            showSynonyms ? setShowSynonyms(false) : setShowSynonyms(true);
          }}>Show Synonyms</Button>
        </Form.Group>

        {showSynonyms &&
          <div className=''>
            <hr className='mb-3' style={{ color: 'white' }} />
            
            <div className='row'>
              {words.map((word, index) => {
                return (
                  <div key={word + 'Synonyms'} className='d-flex'>
                    <h5 style={{ color: 'white' }} key={word + " " + index}>{word}</h5>
                    <p className='ms-2' style={{ color: 'lightgray' }}>
                      {formatGivenSynonyms(synonyms[word].slice(1))}
                    </p>

                  </div>
                )
              })
              }
            </div>
            <hr className='mb-3' style={{ color: 'white' }} />

          </div>
        }

        {translations && words &&
          <Card className='p-1 bg-gray mt-3'>
            <Table hover striped bordered responsive variant='dark' className=''>

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

                {Object.keys(languageSelection).map((language) => { // Map language headers
                  if (languageSelection[language] === 1) {
                    return (
                      <tr key={language + ' Row'}>
                        <td key={language + ' Header'}>{language}</td>

                        {words.map((word) => { // Map words to their translations
                          return (<td key={language + ' : ' + word}>{translations[language][word]}</td>)
                        })}
                      </tr>
                    )
                  } else {
                    return null;
                  }
                })}
              </tbody>

            </Table>
          </Card>
        }
      </div>
    </div >
  );
}

export default App;
