export default function Page(props) {
    const { message } = props;
    return(
        <div>
        <h2>Вход выполнен успешно!</h2>
        <p>{message}</p>
      </div>
    );
}