'use client'

import Image from "next/image";
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
    'about.me': (
      <div className="flex flex-grow">
        <Image className="object-cover w-20 h-20 rounded-full" src="/me.JPG" alt=""></Image>
        <p className="px-3">
          Hey I&apos;m Julia! I&apos;m a professional software engineer. I&apos;ve been working in tech since the summer before my senior year of college, and have been learning passionately and vigorously since I picked up Python in my high school astronomy class. 
          <br/><br/>
          I am meticulous and hands-on in my work, and I take a research-driven approach. I am especially passionate about accessibility in technology, and believe strongly that the cutting-edge of technology at the highest echelons of the industry isn&apos;t worth anything until I see it at my public library or the boutique up the road.
          <br/><br/>
          Currently I&apos;m spending my time working on a passion project pertaining to historical western Polynesia circa 1000 C.E., but am also actively looking for a long-term project and team to join! Feel free to reach out :)
        </p>
      </div>
    ),
    'resume.to': (
      <div>

      </div>
    ),
    'skills': {
      'expert.at': (
        <div>

        </div>
      ),
      'proficient.in': (
        <div>

        </div>
      ),
      'familiar.with': (
        <div> 

        </div>
      )
    }
  };

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
            {Object.keys(fileSystem).map((item, idx) => (
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
            {fileSystem[filename[0]] as JSX.Element}    
          </div>
        );
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    let args = inputText.split(' ');
    if (event.key === 'Enter') {
      setLog(prevLog => [...prevLog, { 'type': 'input', 'content': inputText }])

      let command = args[0];

      if (commands[command]) {
        setLog(prevLog => [...prevLog, { 'type': 'output', 'content': commands[command]['content'](args.slice(1)) } ])
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
