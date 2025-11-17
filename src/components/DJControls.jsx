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

    //connected to save button, performs when user clicks
    function handleSave() {
        //storing all the features as an object that are used to store in localStorage of webpage
        const storingfeatures = {
            volumeKey: volume,
            cpmKey: cpm,
            mutedKey: muted,
        } 
        //here i am converting the storage into string(which is necessary to store in localStorage)
        localStorage.setItem('featureSettings', JSON.stringify(storingfeatures));
        //displaying message after click
        alert('Settings Saved!')
        //and returning the storingfeatures(which is an object)
        return storingfeatures;
    }

    //attached to Load controls, does similar as handleSave, instead it gets the item from localStorage(webpage storage) 
    //as a string(since i did conversion in handleSave() that's why )
    function loadSaved() {
        const loadingStoredFeatures = localStorage.getItem('featureSettings');
        //throws the alert message if nothing is insiede localStorage
        if (loadingStoredFeatures == null) {
            alert('Nothing is Saved')
        }
         //else part handles the conversion of string to object, and accessing each object inside that to assign the value to all the features:
        //volume, mute and cpm and then shows the message 
        else {
            const stringToObjectonvert = JSON.parse(loadingStoredFeatures);
            setVolume(stringToObjectonvert.volumeKey)
            setCpm(stringToObjectonvert.cpmKey)
            console.log("Loaded", stringToObjectonvert.mutedKey)
            setMuted(stringToObjectonvert.mutedKey)
            alert("Data is Loaded")
        }
    }

    //allows the user to change the cpm of the song, passes the event parameter in it which gets the value of html element where this handleCm is being called
    function handleCpm(event) {
        //gets the element tag
        const newCpm = parseInt(event.target.value)
        //checks if the elemnet is not isNan error(i encountered that during testing where the values in strudel editor displayed isNan, so using here),
        //sets the cpm using useState which is declared above to update the cpm using newCpm, and then in song text it updates where there is setcps() using regex to target that specific string
        if (!isNaN(newCpm)) {
            setCpm(newCpm)
            setSongText(prev => prev.replace(/setcps\(\d+\/60\/4\)/, `setcps(${newCpm}/60/4)`))
        }
    }

    //handleVolume for decreasing or inreasing
    function handleVolume(event) {
        //converting the value which is returned as a string into float in order to change the value.
        const newVolume = parseFloat(event.target.value);
        console.log(newVolume);
        //does the similar job of updating the current volume with newVolume
        setVolume(newVolume);
        //also updating the strudel editor by targeting "all(x=> x.gain(0.5))" in it , and changing only the value through regex
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
        //calling the handleProcess because that handles the replacement of those <CPM> and <VOLUME> tags in the strudel editor
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
            
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" value="" id="djRadioDrums"  onChange={handleMute('drums')} checked={muted.drums}></input>
                <label className="form-check-label" htmlFor="djRadioDrums" >
                        Drums
                    </label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" value="" id="djRadioDrums2" onChange={handleMute('drums2')} checked={muted.drums2}></input>
                <label className="form-check-label" htmlFor="djRadioDrums2" >
                        Drums 2
                </label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" value="" id="djRadioBasslines" onChange={handleMute('basslines')} checked={muted.basslines}></input>
                <label className="form-check-label" htmlFor="djRadioBasslines" >
                        Basslines
                </label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" value="" id="djRadioMain_Arp" onChange={handleMute('main_arp')} checked={muted.main_arp}></input>
                <label className="form-check-label" htmlFor="djRadioMain_Arp" >
                        main_arp
                </label>
            </div>

            <div className='container-fluid '>
                <div className="row p-3 g-1">
                    <div className="col">
                        <button id="process" className="btn btn-primary btn-lg" onClick={handlePreProcess}>Preprocess</button>
                    </div>
                    <div className="col">
                        <button id="process_play" className="btn btn-primary btn-lg" onClick={handleProcAndPlay}>Proc&Play</button>
                    </div>
                </div>
                <div className="row p-2 g-1">
                    <div className="col">
                        <button id="play" className="btn btn-primary btn-lg" onClick={onPlay}>Play</button>
                    </div>
                    <div className="col mb-2">
                        <button id="stop" className="btn btn-danger btn-lg" onClick={onStop} >Stop</button>
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
