import './Message.css'

interface MessageProps {
  texte: string
  type?: 'info' | 'success' | 'warning'
}

const Message = ({ texte, type = 'info' }: MessageProps) => {
  return (
    <div className={`message message-${type}`}>
      <span className="message-icon">
        {type === 'success' && '✅'}
        {type === 'warning' && '⚠️'}
        {type === 'info' && 'ℹ️'}
      </span>
      <p>{texte}</p>
    </div>
  )
}

export default Message
