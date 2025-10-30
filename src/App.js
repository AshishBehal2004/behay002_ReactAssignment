
import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DjControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreProcessTextBody from './components/PreProcessTextBody';
import strudelImage from './icons/strudel_icon.png';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

//export function SetupButtons() {

//    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//    document.getElementById('process').addEventListener('click', () => {
//        Proc()
//    }
//    )
//    document.getElementById('process_play').addEventListener('click', () => {
//        if (globalEditor != null) {
//            Proc()
//            globalEditor.evaluate()
//        }
//    }
//    )
//}



//export function ProcAndPlay() {
//    if (globalEditor != null && globalEditor.repl.state.started == true) {
//        console.log(globalEditor)
//        Proc()
//        globalEditor.evaluate();
//    }
//}

//export function Proc() {

//    let proc_text = document.getElementById('proc').value
//    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//    ProcessText(proc_text);
//    globalEditor.setCode(proc_text_replaced)
//}

//export function ProcessText(match, ...args) {

//    let replace = ""
//    //if (document.getElementById('flexRadioDefault2').checked) {
//    //    replace = "_"
//    //}

//    return replace
//}

export default function StrudelDemo() {

    const hasRun = useRef(false);

    //defined two variables which are now going to be used for managing play and stop buttons 
    const handlePlay = () => {
        //Plays the code
        globalEditor.evaluate();
    }

    const handleStop = () => {
        globalEditor.stop();
    }
    const [songText, setSongText] = useState(stranger_tune)

  

    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            document.getElementById('proc').value = stranger_tune
            //SetupButtons()
            //Proc()
        }
    globalEditor.setCode(songText);
}, [songText]);


return (
    <div>
        
        <nav className="navbar navbar-dark bg-dark ">
            <a class="navbar-brand" href="#"><b><i>Strudel Demo</i></b></a>
            <div className="strudellogo" >
                <img className="strudelAnimation" src={strudelImage} alt="Strudel Icon" style={{ width: '50px' }}></img>
            </div>
        </nav>
        
        <main>
            <div className="container-fluid">

                <div className="row g-4 p-5 ">
                    <div className="col-sm-7" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div className="card">
                            <div className="card-body">
                                <PreProcessTextBody defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5 ">
                        <div className="card text-center" id="playAndStop">
                            <div className="card-header"><b>Controls</b></div>
                            <div className="card-body " >
                                <h5 className="card-title">Special title treatment</h5>
                                <nav >
                                    <ProcButtons />
                                    <br />
                                    <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                                </nav>
                            </div>
                        </div> 
                        
                    </div>
                </div>

                <div className="row g-4 p-5">
                    <div className="col-sm-7" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-sm-5">

                        <div className="card text-center" id="djControls">
                            <div className="card-header"><b>Controls</b></div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <DjControls />
                            </div>
                        </div> 


                      
                    </div>
                </div>

            </div>
            <canvas id="roll"></canvas>
        </main >
        <footer className="footer" role="contentinfo">
            <div className="footer-content" >
                <p className="footer-text">&copy; 2025 Strudel Demo. All rights reserved</p>
            </div>
        </footer>
        
    </div >
);


}