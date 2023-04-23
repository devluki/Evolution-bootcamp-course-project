export const Message: React.FC<MessageProps> = ({ messageText }) => {
    return (
        <h1 style={{ color: "white", textTransform: "uppercase" }}>
            {messageText}
        </h1>
    );
};
