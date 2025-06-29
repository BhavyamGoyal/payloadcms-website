import type { Access } from 'payload'

export const admins: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  return false
}

export const editors: Access = ({ req: { user } }) => {
  if (user?.role === 'admin' || user?.role === 'editor') return true
  return false
}

export const previewers: Access = ({ req: { user } }) => {
  if (user?.role === 'admin' || user?.role === 'editor' || user?.role === 'previewer') return true
  return false
}

export const adminOrEditor: Access = ({ req: { user } }) => {
  if (user?.role === 'admin' || user?.role === 'editor') return true
  return false
}