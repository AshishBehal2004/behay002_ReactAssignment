function PlayButtons({onPlay, onStop }) {

    return (
        <>
            <div className="button-group">
                <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
                <button id="stop" className="btn btn-outline-danger" onClick={onStop} >Stop</button>
        </div>
        </>
    );
}
export default PlayButtons;