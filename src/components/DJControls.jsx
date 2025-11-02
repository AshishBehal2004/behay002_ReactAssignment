import { useRef, useState } from 'react';
export default function DjControls({ songText, setSongText }) {

    const orginalBeat = useRef(songText)

    const [muted, setMuted] = useState({
        drums: false,
        drums2: false,
        bassline: false,
        main_arp: false
    })
    function handleMute(event) {
        if (event.target.checked) {
            setSongText(prev => prev.replaceAll('<p1_Radio>', '_'))
        }
        else {
            setSongText(prev => prev.replaceAll('_', ' < p1_Radio > '))

        }
        //setSongText(() => result )    
        console.log("Before", songText)
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
                <input className="form-check-input" type="checkbox" value="" id="instrument_1" onChange={handleMute}></input>
                <label className="form-check-label" htmlFor="instrument_1" >
                        Instrument 1
                    </label>
            </div>

           
        </>
    );

}
