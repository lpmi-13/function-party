import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

const initialFunctionString = `
// complete the function below so it returns twice the input
const multiplyByTwo = FILL_ME_IN;
multiplyByTwo(10);
`

const testTheFunction = code => eval(code) === 20

class App extends Component {
  state = {
    id: '',
    js: initialFunctionString,
  }

  runCode = () => {
    let documentContents;
    const { js } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    try {
      if(testTheFunction(js)) {
        documentContents = 'CONGRATS!!!!';
      } else {
        documentContents = 'Nope, not yet...';
      }
    } catch (error) {
      documentContents = 'cannot parse the code';
    }

       document.open();
       document.write(documentContents);
       document.close();
  };

    render() {
      const { handleCodeUpdate, runCode } = this;

      const { js } = this.state;
      const codeMirrorOptions = {
        theme: 'material',
        lineNumbers: true,
        scrollbarStyle: null,
        lineWrapping: true,
      };

      return (
         <div className="App">
            <section className="playground">
              <div className="code-editor js-code">
                <div className="editor-header">Higher Order Functions</div>
                <CodeMirror
                  value={js}
                  options={{
                    mode: 'javascript',
                    ...codeMirrorOptions,
                  }}
                  onBeforeChange={(editor, data, js) => {
                    this.setState({ js });
                  }}
                />
              </div>
              <iframe title="result" className="iframe" ref="iframe" />
            </section>
            <section>
              <button className="runCode" onClick={runCode}>Run the Code</button>
            </section>
          </div>
        );
      }
    }

export default App;
