function DjControls() {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpmLabel">SetCpm</span>

                <input type="text" className="form-control" id="cpm_textInput" placeholder="120" aria-label="cpm" aria-describedby="cpmLabel"></input>

            </div>
            <label htmlFor="volumeSlider" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volumeSlider"></input>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="instrument_1"></input>
                <label className="form-check-label" htmlFor="instrument_1">
                        Instrument 1
                    </label>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="instrument_2" ></input>
                <label className="form-check-label" htmlFor="instrument_2">
                    Instrument 2
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="instrument_3" ></input>
                <label className="form-check-label" htmlFor="instrument_3">
                    Instrument 3
                    </label>
            </div>
        </>
    );

}
export default DjControls