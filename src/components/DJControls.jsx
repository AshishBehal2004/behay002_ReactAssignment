import { useState, useEffect } from 'react';
export default function DjControls({ songText, setSongText, volume, setVolume, onPlay, onStop }) {
    const [muted, setMuted] = useState({
        drums: false,
        drums2: false,
        bassline: false,
        main_arp: false
    })
    const [cpm, setCpm] = useState(140);

    

    function handleMute(sectionName) {
        return (event) => {
            const isChecked = event.target.checked
            const shouldBeMuted = isChecked
            setMuted(prev => ({
                ...prev, [sectionName]: shouldBeMuted
            }));
            if (shouldBeMuted) {
                console.log("Muting", sectionName)
                setSongText(prev => prev.replace(sectionName + ':' , '_' + sectionName + ':'));
            }
            else {
                setSongText(prev => prev.replace('_'+ sectionName + ':', sectionName + ':'));
            }
            console.log("Before", songText)
        }
    }

    function handleSave() {
        const storingfeatures = {
            volumeKey: volume,
            cpmKey: cpm,
            mutedKey: muted,
        } 
        localStorage.setItem('featureSettings', JSON.stringify(storingfeatures));
        alert('Settings Saved!')
        return storingfeatures;
    }

    function loadSaved() {
        const loadingStoredFeatures = localStorage.getItem('featureSettings');
        if (loadingStoredFeatures == null) {
            alert('Nothing is Saved')
        }
        else {
            const stringToObjectonvert = JSON.parse(loadingStoredFeatures);
            setVolume(stringToObjectonvert.volumeKey)
            setCpm(stringToObjectonvert.cpmKey)
            console.log("Loaded", stringToObjectonvert.mutedKey)
            setMuted(stringToObjectonvert.mutedKey)
            alert("Data is Loaded")
            
        }
    }

    function handleCpm(event) {
        const newCpm = parseInt(event.target.value)
        if (!isNaN(newCpm)) {
            setCpm(newCpm)
            setSongText(prev => prev.replace(/setcps\(\d+\/60\/4\)/, `setcps(${newCpm}/60/4)`))
        }
    }

    function handleVolume(event) {
        const newVolume = parseFloat(event.target.value);
        console.log(newVolume);
        setVolume(newVolume);
        //all(x => x.gain(0.5))
        setSongText(prev => prev.replace(/all\(x\s*=> x\.gain\([0-9.]+\)\)/, `all(x => x.gain(${newVolume}))`));
    }

    function handlePreProcess() {
        setSongText(curr => {
            //storing current songText that will be replaced with new values
            let processedText = curr;
            //here it targets and replaces the <CPM> text with 140(as a string), and same with <VOLUME> with 0.8(also as a string), then returns them back to 
            processedText = processedText.replace(/<CPM>/g, cpm.toString());
            processedText = processedText.replace(/<VOLUME>/g, volume.toString());
            //updated values which will be used inside songText
            return processedText;
        })
    }

    function handleProcAndPlay() {
        handlePreProcess();
        //waiting 100 miliseconds to play, as it conflicts with onPLay()
        setTimeout(() => { onPlay() }, 100)
    }
    return (
        <>  
            <div className="mb-3">
                <label >{cpm}</label>
                <input type="range" className="form-range" id="cpm_textInput" aria-describedby="cpmLabel" value={cpm} onChange={handleCpm} data-bs-toggle="tooltip" data-bs-placement="top" title="Drag the slider to increase/decrease the Cpm" min='1' max='300'></input>
            </div>
            <label htmlFor="volumeSlider" className="form-label fs-5" ><b>Volume </b></label>
            <br></br>
            <label>{volume}</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volumeSlider" value={volume} onChange={handleVolume} ></input>
           
            <label className='instrument-label fs-5' ><b>Toggle Instrument On/Off</b></label>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="instrument_drums" onChange={handleMute('drums')} checked={muted.drums}></input>
                <label className="form-check-label" htmlFor="instrument_drums" >
                        Drums
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="instrument_drums2" onChange={handleMute('drums2')} checked={muted.drums2}></input>
                <label className="form-check-label" htmlFor="instrument_drums2" >
                        Drums 2
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="instrument_basslines" onChange={handleMute('basslines')} checked={muted.basslines}></input>
                <label className="form-check-label" htmlFor="instrument_basslines" >
                        basslines
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="instrument_main_arp" onChange={handleMute('main_arp')} checked={muted.main_arp}></input>
                <label className="form-check-label" htmlFor="instrument_main_arp" >
                        main_arp
                </label>
                </div>

            <div className='container-fluid '>
                <div className="row p-3 g-1">
                    <div className="col">
                        <button id="process" className="btn btn-primary btn-sm" onClick={handlePreProcess}>Preprocess</button>
                    </div>
                    <div className="col">
                        <button id="process_play" className="btn btn-primary btn-sm" onClick={handleProcAndPlay}>Proc&Play</button>
                    </div>
                </div>
                <div className="row p-3 g-1">
                    <div className="col">
                        <button id="play" className="btn btn-primary btn-sm" onClick={onPlay}>Play</button>
                    </div>
                    <div className="col">
                        <button id="stop" className="btn btn-danger btn-sm" onClick={onStop} >Stop</button>
                    </div>
                    <div className="col">
                        <button type='button' id="save" className="btn btn-primary btn-sm" onClick={handleSave}>SAVE CONTROLS</button>
                    </div>
                    <div className="col">
                        <button type='button' id="load" className="btn btn-info btn-sm" onClick={loadSaved}>LOAD CONTROLS</button>
                    </div>
                </div>
            </div>
        </>
    );
}
