import { api } from '@/lib/axios'

export const getTodos = async () => {
  const { data } = await api.get('/todos')
  return data
}

export const createTodo = async (payload: { title: string }) => {
  const { data } = await api.post('/todos', payload)
  return data
}

export const deleteTodo = async (id: string) => {
  const { data } = await api.delete(`/todos/${id}`)
  return data
}

export const toggleTodo = async (id: string) => {
  const { data } = await api.patch(`/todos/${id}`)
  return data
}