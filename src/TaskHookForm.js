import React from "react";
import { nanoid } from "nanoid";
import { useForm, Controller } from "react-hook-form";

const TaskHookForm = ({ kisiler, submitFn }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  function onSubmit(formData) {
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
    setValue("title", "");
    setValue("description", "");
    setValue("people", []);
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: { value: 3, message: "Task başlığı en az 3 karakter olmalı" },
          })}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: { value: 10, message: "Task açıklaması en az 10 karakter olmalı" },
          })}
        ></textarea>
        <p className="input-error">{errors.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <Controller
                name="people"
                control={control}
                defaultValue={[]}
                rules={{
                  validate: {
                    min: (value) =>
                      value.length >= 1 || "Lütfen en az bir kişi seçin",
                    max: (value) =>
                      value.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    name="people"
                    value={p}
                    checked={field.value.includes(p)}
                    onChange={() => {
                      const newValue = field.value.includes(p)
                        ? field.value.filter((v) => v !== p)
                        : [...field.value, p];
                      field.onChange(newValue);
                    }}
                  />
                )}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit">
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskHookForm;
