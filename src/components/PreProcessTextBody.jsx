function PreProcessTextBody({defaultValue, onChange }) {
    return (
        <>
            <div>
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
                <textarea className="form-control" rows="15" id="proc" defaultValue={defaultValue} onChange={onChange}></textarea>
            </div>
        </>
    );
}
export default PreProcessTextBody;