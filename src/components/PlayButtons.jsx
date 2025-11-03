export default function PlayButtons({onPlay, onStop }) {

    return (
        <>
            <div className="row">
                <div className="col">
                    <button id="play" className="btn btn-primary btn-lg" onClick={onPlay}>Play</button>
                </div>
                <div className="col">
                    <button id="stop" className="btn btn-danger btn-lg" onClick={onStop} >Stop</button>
                </div>
            </div>
        </>
    );
}
