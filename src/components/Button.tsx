import './Button.css'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  icon?: boolean
  iconSize?: 'small' | 'medium' | 'large'
}

const Button = ({ 
  children, 
  variant = 'secondary', 
  onClick, 
  className = '', 
  type = 'button',
  icon = false,
  iconSize = 'medium'
}: ButtonProps) => {
  return (
    <button 
      type={type}
      className={`btn btn-${variant} ${icon ? `btn-icon btn-icon-${iconSize}` : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
