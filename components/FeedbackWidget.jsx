import { useState } from 'react'

export default function FeedbackWidget() {
  const [text, setText] = useState('')
  const [success, setSuccess] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setText('')
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="mt-6 border p-4 rounded">
      <form onSubmit={submit}>
        <textarea data-testid="feedback-input" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-2 border rounded" />
        <button data-testid="feedback-submit" className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">Submit</button>
      </form>
      {success && <div data-testid="feedback-success-message" className="mt-2 text-green-600">Thanks for your feedback!</div>}
    </div>
  )
}
