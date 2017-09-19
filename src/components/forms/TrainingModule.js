import React from "react";

const TrainingModule = (props) => {
  return (
    <section className = "training-module" >
      <form className = "training-form" >
        <label htmlFor="running">Running</label>
        <input name="running" type = "checkbox" value = "running"  />
        <label htmlFor="yoga">Yoga</label>
        <input name="yoga" type = "checkbox" value = "yoga"  />
        <label htmlFor="aerobics">Aerobics</label>
        <input name="aerobics" type = "checkbox" value = "aerobics"  />
        <label htmlFor="soccer" >Soccer</label>
        <input name="soccer" type = "checkbox" value = "soccer"  />
        <label htmlFor="dance">Dance</label>
        <input name="dance" type = "checkbox" value = "dance"  />
        <label htmlFor="biking">Biking</label>
        <input name="biking" type = "checkbox" value = "biking"  />
        <label htmlFor="Hiking">Hiking</label>
        <input name="hiking" type = "checkbox" value = "hiking"  />

      </form>
    </section>
  );
}

export default TrainingModule;
