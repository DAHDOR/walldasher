import { appDataDir, BaseDirectory, join } from '@tauri-apps/api/path'
import { open } from '@tauri-apps/plugin-dialog'
import { exists, mkdir, readFile, writeFile } from '@tauri-apps/plugin-fs'
import { createUniqueId } from 'solid-js'

export const logosDir = async () => {
  const dir = await join(await appDataDir(), 'logos')
  if (!(await exists(dir))) await mkdir('logos', { baseDir: BaseDirectory.AppData })
  return dir
}

export const openLogo = async () =>
  await open({
    defaultPath: await logosDir(),
    filters: [{ name: 'Image', extensions: ['png'] }]
  })

export const saveLogo = async (path: string) => {
  const dir = await logosDir()

  const name = createUniqueId() + '.png'
  const data = await readFile(path)
  const logoPath = await join(dir, name)

  await writeFile(logoPath, data)

  return logoPath
}
