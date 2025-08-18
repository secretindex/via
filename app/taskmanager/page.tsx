"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, BaseSyntheticEvent } from "react"
import axios from "axios"
import useSWR from "swr"
import { Trash2 } from "lucide-react"

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

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.taskList as Array<TaskList>)

const TaskManager = () => {
  const emptyTask: Task = { title: "", description: "" }

  const [newTask, setNewTask] = useState<Task>(emptyTask)
  const { data, error, isLoading, mutate } = useSWR("/api/tasks", fetcher)

  console.log(data)

  const deleteTask = async (id: string) => {
    const res = await axios.delete(`/api/tasks/${id}`)
    console.log(res.data.status)
    mutate()
  }

  const handleSubmitTask = async (e: any) => {
    e.preventDefault()

    const response = await axios.post("/api/tasks", newTask)
    console.log(response.data)

    mutate()
  }

  return (
    <div className="h-screen w-full flex flex-col gap-4 justify-center items-center">
      <div className="rounded-md p-4 w-2/3 flex flex-col gap-4 border-[1px] border-[#0003]">
        <div>
          <h1 className="text-2xl text-center font-bold">Task Manager</h1>
        </div>
        <div>
          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-800">Title</label>
              <Input
                type="text"
                name="title"
                id="title"
                onChange={(e: BaseSyntheticEvent) =>
                  setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-800">Description</label>
              <Input
                type="text"
                name="description"
                id="description"
                onChange={(e: BaseSyntheticEvent) =>
                  setNewTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Button className="w-full" onClick={handleSubmitTask}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col rounded-md p-4 gap-4 w-2/3 border-[1px] border-[#0003]">
        <h2 className="text-lg font-bold text-center">Tasks</h2>
        <div>
          <ul className="flex flex-col gap-2">
            {isLoading && <div>Loading...</div>}
            {data &&
              data.map((task, i) => {
                return (
                  <li
                    key={task.id}
                    className="flex gap-2 items-center justify-between border-[1px] border-[#0003] rounded-md px-6 p-2"
                  >
                    <div></div>
                    <div className="flex items-center gap-4">
                      <span>{task.title}</span>
                      <span className="text-sm text-gray-600">
                        {task.description}
                      </span>
                    </div>
                    <div>
                      <Button
                        className="cursor-pointer bg-transparent border-[1px] hover:bg-red-100 border-[#0003] text-red-500"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </li>
                )
              })}
            {error ||
              ((data as Array<any>).length < 1 && (
                <div className="w-full flex justify-center">
                  <span className="text-red-400 text-sm text-center">
                    There's no task yet...
                  </span>{" "}
                </div>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TaskManager
