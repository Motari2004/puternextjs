'use client'

import puter from '@heyputer/puter.js'
import { useState } from 'react'
import { extractText, getErrorMessage } from './helpers'

type ChatTurn = {
  user: string
  ai: string
}

export const AIExample = () => {
  const [input, setInput] = useState<string>('What can you do?')
  const [status, setStatus] = useState<string>('Idle')
  const [history, setHistory] = useState<ChatTurn[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sendChat = async () => {
    if (!input.trim()) return
    setIsLoading(true)
    setStatus('Sending to Puter AI...')
    try {
      const response = await puter.ai.chat(input)
      const text = extractText(response)
      setHistory(prev => [...prev, { user: input.trim(), ai: text }])
      setInput('')
      setStatus('Reply received')
    } catch (error) {
      setStatus(`Error: ${getErrorMessage(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="card stack">
      <div className="stack">
        <h2>Puter AI Chat</h2>
        <p>
          Send a short prompt to <code>puter.ai.chat</code> and see the reply.
        </p>
      </div>

      <div className="chat-box">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={3}
          placeholder="Ask Puter AI anything..."
        />
        <div className="actions">
          <button onClick={sendChat} disabled={isLoading || !input.trim()}>
            {isLoading ? 'Sending...' : 'Send message'}
          </button>
          <span className="status">Status: {status}</span>
        </div>
      </div>

      {history.length > 0 ? (
        <div className="callout">
          <strong>Conversation</strong>
          <div className="chat-history">
            {history.map((turn, idx) => (
              <div key={idx} className="chat-turn">
                <div className="chat-label">You</div>
                <div className="chat-bubble">{turn.user}</div>
                <div className="chat-label">Puter AI</div>
                <div className="chat-bubble alt">{turn.ai}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
