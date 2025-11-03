export default function PlayButtons({onPlay, onStop }) {

    return (
        <>
            <div className="button-group">
                <button id="play" className="btn btn-primary" onClick={onPlay}>Play</button>
                <button id="stop" className="btn btn-danger" onClick={onStop} >Stop</button>
            </div>
        </>
    );
}
