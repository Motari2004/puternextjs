'use client'

import puter from '@heyputer/puter.js'
import { useMemo, useState } from 'react'
import { getDemoPath, getErrorMessage } from './helpers'

export const FileSystemExample = () => {
  const demoPath = useMemo(getDemoPath, [])
  const [status, setStatus] = useState<string>('Idle')
  const [fileContents, setFileContents] = useState<string>('')

  const writeSampleFile = async () => {
    setStatus('Writing sample file...')
    try {
      await puter.fs.write(demoPath, `Hello from Puter.js at ${new Date().toISOString()}`)
      setStatus(`Wrote sample text to ${demoPath}`)
    } catch (error) {
      setStatus(`Write failed: ${getErrorMessage(error)}`)
    }
  }

  const readSampleFile = async () => {
    setStatus('Reading file...')
    try {
      const blob = await puter.fs.read(demoPath)
      const text = await blob.text()
      setFileContents(text)
      setStatus('Read succeeded')
    } catch (error) {
      setStatus(`Read failed: ${getErrorMessage(error)}`)
    }
  }

  return (
    <section className="card stack">
      <div className="stack">
        <h2>Puter File System</h2>
        <p>
          Creates and reads a sample file at <code>{demoPath}</code>. Uses your app data folder when
          available.
        </p>
      </div>

      <div className="actions">
        <button onClick={writeSampleFile}>Write file</button>
        <button onClick={readSampleFile}>Read file</button>
      </div>

      <p className="status">Status: {status}</p>

      {fileContents && (
        <div className="callout">
          <strong>File contents</strong>
          <pre>{fileContents}</pre>
        </div>
      )}
    </section>
  )
}
