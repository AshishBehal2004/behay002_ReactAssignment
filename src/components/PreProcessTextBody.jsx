export default function PreProcessTextBody({ defaultValue, onChange }) {

   
    return (
        <>
            <div>
                <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3"><b>Text to preprocess:</b></label>
                <textarea className="form-control" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
            </div>
        </>
    );
}