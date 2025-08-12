"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, BaseSyntheticEvent } from "react";
import axios from "axios";

type Task = {
  title: string
  description: string
}

type TaskList = {
  id: string
  title: string
  description: string
  created_at: string
}

const TaskManager = () => {
  const emptyTask: Task = { title: "", description: "" }

  const [newTask, setNewTask] = useState<Task>(emptyTask)
  const [taskList, setTaskList] = useState<TaskList[]>([])

  const fetchTasks = async () => {
    const res = await axios.get("/api/tasks")
    console.log(res)

    setTaskList(res.data.taskList)
  }
  
  const deleteTask = async (id: string) => {
    console.log(id)

    const res = await axios.delete("/api/tasks/" + id)

    console.log(res)
  }

  const handleSubmitTask = async (e: any) => {
    e.preventDefault()

    const response = await axios.post("/api/tasks",  newTask)

    console.log(response)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="h-screen w-full flex flex-col gap-4 justify-center items-center">
      <div className="rounded-md p-4 w-2/3 flex flex-col gap-4 border-[1px] border-[#0003]">
        <div>
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </div>
        <div>
          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-800">Title</label>
              <Input type="text" name="title" id="title" onChange={(e: BaseSyntheticEvent) => setNewTask(prev => ({ ...prev, title: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-800">Description</label>
              <Input type="text" name="description" id="description" onChange={(e: BaseSyntheticEvent) => setNewTask(prev => ({ ...prev, description: e.target.value }))} />
            </div>
            <div>
              <Button className="w-full" onClick={handleSubmitTask}>Submit</Button>
            </div>
          </form>
        </div>
      </div>
      <div className="rounded-md p-4 w-2/3 border-[1px] border-[#0003]">
        <h2 className="text-sm font-bold text-center">Tasks</h2>
        <div>
          <ul>
            {
              taskList && taskList.map((task, i) => {
                return (
                  <li key={task.id} className="flex gap-2 items-center justify-between border-[1px] border-[#0003] rounded-md p-2">
                    <div className="flex items-center gap-4">
                      <span>{task.title}</span>
                      <span className="text-sm text-gray-800">{task.description}</span>
                    </div>
                    <div>
                      <Button onClick={() => deleteTask(task.id)}>Delete</Button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TaskManager