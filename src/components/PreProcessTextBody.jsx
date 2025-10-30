function PreProcessTextBody({ defaultValue, onChange }) {
    return (
        <>
            <div>
                <label htmlFor="exampleFormControlTextarea1" className="form-label"><b>Text to preprocess:</b></label>
                <textarea className="form-control" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
            </div>
        </>
    );
}
export default PreProcessTextBody;