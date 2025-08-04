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
    console.log("Submitting form data:", data);
    
    try {
      const response = await axios.post("/api/task", data);
      console.log("Form submitted successfully:", response.data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="task" className="block text-sm font-medium text-gray-700">
            Task*
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 text-gray-900"
            {...register("task")}
            type="text"
            placeholder="Enter your task"
          />
          {errors.task && (
            <p className="text-sm text-red-600 mt-1">{errors.task.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            AI Context
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none text-gray-900"
            {...register("description")}
            placeholder="Enter more context for your task if needed for AI"
            rows={3}
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
          )}
        </div>
        
        <div className="flex justify-center">
          <button 
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-md font-medium text-white transition duration-200 ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            }`}  
            type="submit"
          >
            {isSubmitting ? "Computing Task..." : "Submit Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
