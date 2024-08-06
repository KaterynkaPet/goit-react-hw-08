const Mailbox = ({ username, message}) => {

  return (
    <>
      <p>Hello {username}</p>
      {message.length > 0 && (
        <p>You have {message.length} unread message</p>
      )}
    </>
  )
}
export default Mailbox;