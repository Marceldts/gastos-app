import './CustomButton.css'

interface CustomButtonProps {
  text: string
  onPress: (args?: any) => void
  className?: string
}

export const CustomButton = (props: CustomButtonProps) => {
  const { text, onPress, className } = props

  return (
    <button className={`custom-button ${className ?? ''}`} onClick={onPress}>
      {text}
    </button>
  )
}
