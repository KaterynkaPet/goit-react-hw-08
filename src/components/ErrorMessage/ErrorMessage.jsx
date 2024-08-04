import css from './ErrorMessage.module.css'

const ErrorMessage = ({ message }) => {
  return (
        <p className={css.error}>Try reloading...</p>
    )
}

export default ErrorMessage;