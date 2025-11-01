function PreProcessTextBody({ defaultValue, onChange }) {

   
    return (
        <>
            <div>
                <label htmlFor="exampleFormControlTextarea1" className="form-label fs-2"><i><b>Text to preprocess:</b></i></label>
                <textarea className="form-control" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
            </div>
        </>
    );
}
export default PreProcessTextBody;