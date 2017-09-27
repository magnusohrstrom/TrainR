import React from "react";

const TrainingModule = (props) => {
  return (
    <section className = "training-module" >
      {props.goSubmitIsEmpty && <h3>Please choose a work out-genre to match a buddy with!</h3>}
      <h2>Choose work-out</h2>
      <form onSubmit = {props.onSubmit}  className = "training-form" >

        <label htmlFor="running">Running</label>
        <input name="running" type = "checkbox" onChange = {props.onChange} />
        <label htmlFor="yoga">Yoga</label>
        <input name="yoga" type = "checkbox" value = "yoga" onChange = {props.onChange} />
        <label htmlFor="aerobics">Aerobics</label>
        <input name="aerobics" type = "checkbox" value = "aerobics" onChange = {props.onChange} />
        <label htmlFor="soccer" >Soccer</label>
        <input name="soccer" type = "checkbox" value = "soccer" onChange = {props.onChange} />
        <label htmlFor="dance">Dance</label>
        <input name="dance" type = "checkbox" value = "dance" onChange = {props.onChange} />
        <label htmlFor="biking">Biking</label>
        <input name="biking" type = "checkbox" value = "biking" onChange = {props.onChange} />
        <label htmlFor="Hiking">Hiking</label>
        <input name="hiking" type = "checkbox" value = "hiking" onChange = {props.onChange} />
        <input type="submit" className="input-submit" value="Find buddy!" />
      </form>
    </section>
  );
}

export default TrainingModule;
