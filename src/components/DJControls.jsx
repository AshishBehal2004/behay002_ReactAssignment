import { useRef, useState } from 'react';
export default function DjControls({ songText, setSongText }) {

    

    const [muted, setMuted] = useState({
        drums: false,
        drums2: false,
        bassline: false,
        main_arp: false
    })


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
            //setSongText(() => result )    
            console.log("Before", songText)
        }
        
    }
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpmLabel">SetCpm</span>

                <input type="text" className="form-control" id="cpm_textInput" placeholder="120" aria-label="cpm" aria-describedby="cpmLabel"></input>

            </div>
            <label htmlFor="volumeSlider" className="form-label fs-5"><b>Volume</b></label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volumeSlider"></input>

            <label className='instrument-label fs-5' ><b>Toggle Instrument On/Off</b></label>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="instrument_drums" onChange={handleMute('drums')} defaultChecked={false}></input>
                <label className="form-check-label" htmlFor="instrument_drums" >
                       Drums
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="instrument_drums2" onChange={handleMute('drums2')} defaultChecked={false }></input>
                <label className="form-check-label" htmlFor="instrument_drums2" >
                        Drums 2
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="instrument_basslines" onChange={handleMute('basslines')} defaultChecked={false}></input>
                <label className="form-check-label" htmlFor="instrument_basslines" >
                        basslines
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="instrument_main_arp" onChange={handleMute('main_arp')} defaultChecked={false}></input>
                <label className="form-check-label" htmlFor="instrument_main_arp" >
                        main_arp
                    </label>
            </div>
           

           
        </>
    );

}
