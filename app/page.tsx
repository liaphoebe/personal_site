'use client'

import { useState } from "react";

export default function Home() {

  interface Entry {
    type: string,
    content: string
  }

  interface Commands {
    [key: string]: {
      desc: string,
      content: Function
    }
  }

  interface Directory {
    [key: string]: JSX.Element | Directory
  }

  const [inputText, setInputText] = useState('');
  const [log, setLog] = useState<Array<Entry>>([]);
  const promptLabel = 'jps-mbp:~$'

  const fileSystem: Directory = {
    'root': {
      'about.me': (
        <div className="flex flex-grow">
          <img className="object-cover w-20 h-20 rounded-full" src="/me.JPG" alt=""></img>
          <p className="px-3">
            Hey I&apos;m Julia! I&apos;m a professional software engineer. I&apos;ve been working in tech since the summer before my senior year of college, and have been learning passionately and vigorously since I picked up Python in my high school astronomy class.
            <br /><br />
            I am meticulous and hands-on in my work, and I take a research-driven approach. I am especially passionate about accessibility in technology, and believe strongly that the cutting-edge of technology at the highest echelons of the industry isn&apos;t worth anything until I see it at my public library or the boutique up the road.
            <br /><br />
            Currently I&apos;m spending my time working on a passion project pertaining to historical western Polynesia circa 1000 C.E., but am also actively looking for a long-term project and team to join! Feel free to reach out :)
          </p>
        </div>
      ),
      'resume.to': (
        <div className="flex py-3">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <button className="p-2 bg-blue-500 text-white mt-4 rounded">
              View My Resume
            </button>
          </a>
        </div>
      ),
      'skills': {
        'proficient.in': (
          <div>
            Java Python Ruby Javascript HTML/CSS Golang C <br/>
            React vue.js Angular next.js ext.js <br/>
            Spring Rails Flask <br/>
            PostgresQL MySQL Oracle GraphQL <br/>
            AWS (S3 EC2 RDS) <br/>
            git bash linux
          </div>
        ),
        'familiar.with': (
          <div>
            clojure lisp <br/>
            kafka <br/>
            windows <br/>
            figma <br/>
          </div>
        )
      }
    }
  };

  const [curPath, setCurPath] = useState('root');
  const [curDir, setCurDir] = useState(fileSystem[curPath]);

  const commands: Commands = {
    'help': {
      'desc': 'display available commands',
      'content': () => {
        return (
          <div className="flex-grow flex flex-col">
            {Object.keys(commands).map((item, idx) => (
              <div key={idx}>
                <span className="pl-5 text-white-400 font-bold">{item}</span>
                <span className="text-white-400"> - {commands[item]['desc']}</span>
              </div>
            ))}
          </div>
        )
      }
    },
    'echo': {
      'desc': 'repeat text. usage: echo <text>',
      'content': (text: string[]) => {
        return (
          <div className="flex-grow flex pl-5 sm:pl-0">
            {text.join(' ')}
          </div>
        )
      }
    },
    'ls': {
      'desc': 'display directory contents',
      'content': () => {
        return (
          <div className="flex-grow flex pl-5 sm:pl-0">
            {Object.keys(curDir).map((item, idx) => (
              <div key={idx} className="px-1">
                <p className={styleFilename(item)}>{item}</p>
              </div>
            ))}
          </div>
        )
      }
    },
    'cat': {
      'desc': 'display contents of <filename>. Usage: cat <filename>',
      'content': (filename: string[]) => {
        return (
          <div className="flex-grow flex pl-5 sm:pl-0">
            {(curDir as Directory)[filename[0]] as JSX.Element}    
          </div>
        );
      }
    },
    'pwd': {
      'desc': 'display current directory',
      'content': () => {
        return (
          <div className="flex-grow flex pl-5 sm:pl-0">
            {curPath}
          </div>
        )
      }
    },
    'cd': {
      'desc': 'change directory. usage: cd <directory>',
      'content': (args: string[]) => {
        let path: string = args[0] || '/';
        let sequence = path.split('/');
        let tmpPath = curPath;
        let tmpDir: Directory = curDir as Directory;
        
        const move = (step: string) => {
          switch (step) {
            case '':
              tmpPath = 'root';
              tmpDir = fileSystem['root'] as Directory;
              break;
            case '..':
              if (tmpPath == 'root') {
                return -3; // Error code for cd .. past root
              }

              // Cheating here lol
              tmpPath = 'root';
              tmpDir = fileSystem['root'] as Directory;
              break;
            case '.':
              tmpPath = tmpPath;
              tmpDir = tmpDir;
              break;
            default:
              if (step.includes('.')) {
                return -1; // Error code for trying to move into a file
              }
              if (!Object.keys(curDir).includes(step)) {
                return -2; // Error code for trying to move into a directory that dne
              }

              tmpPath = `${tmpPath}/${step}`
              tmpDir = tmpDir[step] as Directory;
          }
          return 0;
        };

        while (sequence.length > 0) {
          let val = sequence.shift() as string;

          switch (move(val)) {
            case 0:
              continue;
            case -1:
              return (
                <div className="flex-grow flex pl-5 sm:pl-0">
                  Error: {val} is a file
                </div>
              )
            case -2:
              return (
                <div className="flex-grow flex pl-5 sm:pl-0">
                  Error: {val} does not exist
                </div>
              )
            case -3:
              return (
                <div className="flex-grow flex pl-5 sm:pl-0">
                  Error: can't go up past root-level directory
                </div>
              )
          }
        }

        setCurPath(tmpPath);
        setCurDir(tmpDir);  
        return (
          <div/>
        )
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    let args = inputText.split(' ');
    if (event.key === 'Enter') {
      setLog(prevLog => [...prevLog, { 'type': 'input', 'content': inputText }])

      let command = args[0];

      if (commands[command]) {
        const output = { 'type': 'output', 'content': commands[command]['content'](args.slice(1)) };

        setLog(prevLog => [...prevLog, output ]);
      }
      setInputText('');
    }
  }

  const styleFilename = (filename: string) => {
    if (filename.includes('.')) {
      return "";
    } else {
      return "font-bold text-green-500";
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 sm:p-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 ">

      <div className="w-full">
        <div className="coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased 
              bg-gray-800  pb-6 pt-4 rounded-lg leading-normal overflow-hidden">
          <div className="top mb-2 flex">
            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="mt-4 flex flex-col">

            <div className="flex-grow flex pl-5 sm:pl-0">
              <span className="text-green-400">{promptLabel}</span>
              <p className="flex-1 typing items-center pl-2">
                Welcome to my CLI! You can learn more about me here :)
              </p>
              <br />
            </div>

            <div className="flex-grow flex pl-5 sm:pl-0">
              <span className="text-green-400">{promptLabel}</span>
            </div>

            <div className="flex-grow flex pl-5 sm:pl-0">
              <span className="text-green-400">{promptLabel}</span>
              <p className="flex-1 typing items-center pl-2">
                help
              </p>
              <br/>
            </div>

            <div className="flex-grow flex pl-5 sm:pl-0">
              {commands['help']['content']()}
            </div>        

            <div id="log" className="flex-grow flex flex-col pl-5 sm:pl-0">
              {log.map((item, idx) => (
                <div key={idx} className="flex-grow flex">
                  { item['type'] == 'input' && <span className="text-green-400">{promptLabel}</span> }
                  <p className="flex-1 typing items-center pl-2 ">{item['content']}</p>
                </div>
              ))}
            </div>

            <div id="prompt" className="flex-grow flex">
              <span className="text-green-400 pl-5 sm:pl-0">{promptLabel}</span>
              <p className="flex-1 typing items-center pl-2">
                <input id="terminal-input" className="text-white-400 text-white bg-transparent w-full outline-none" 
                  value={inputText} autoFocus onKeyDown={handleKeyDown} onChange={(e) => setInputText(e.target.value)}></input>
                <br></br>
              </p>
            </div>
  
          </div>
        </div>
      </div>
   
    </main>
  );
}
