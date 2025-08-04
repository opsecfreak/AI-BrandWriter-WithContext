"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const taskFormSchema = z.object({
  task: z
    .string()
    .trim()
    .min(12, {
      message: "Task must be at least 8 characters long",
    })
    .max(100, {
      message: "Task must be at most 100 characters long",
    }),
  description: z
    .string()
    .trim()
    .max(250, {
      message: "Description must be at most 500 characters long",
    })
    .optional(),
});

type InputType = z.infer<typeof taskFormSchema>;

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputType>({
    resolver: zodResolver(taskFormSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<InputType> = async (data) => {
     setIsSubmitting(true);
    axios.post("/api/task",data)
    .then( (response) => {
     console.log("Form submitted with data:", response.data);
    
   
    
    })
    .catch((error) =>{
        console.error("Error submitting form:", error);
    })
    .finally(() =>{
        setIsSubmitting(false);
          reset();
    })




    // setIsSubmitting(true);
    // console.log("Form submitted with data:", data);
    // setIsSubmitting(false);
    // reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="task">Task*</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            {...register("task")}
            type="text"
            placeholder="Enter your task"
          />
          <span>
            {errors.task && (
              <p className=" text-red-400 font-bold">{errors.task.message}</p>
            )}
          </span>
        </div>
        <div>
          <label htmlFor="task">AI Context</label>
          <textarea
            className="border border-gray-300 rounded p-2 w-full"
            {...register("description")}
            placeholder="Enter more context for your task if needed for AI"
          />
          <span>
            {errors.description && (
              <p className=" text-red-400 font-bold">{errors.description.message}</p>
            )}
          </span>
        </div>
        <div>
            <button 
            disabled={isSubmitting}
            className={`rounded-xl py-3 px-4 ${isSubmitting ?  "bg-gray-900":" bg-sky-600"}`}  type="submit">

                {isSubmitting ? "Computing Task" : "Submit Task"}
            </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
