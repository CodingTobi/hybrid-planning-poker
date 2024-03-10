interface SubmitButtonProps {
    loading: boolean;
    text: string;
    className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, text, className}) => {
    return (
        <button type="submit" className={className}>
            {loading ?
                <div className="flex items-center justify-center h-full p-1">
                    <div className="animate-spin rounded-full h-[1em] w-[1em] border-b-[2px] border-gray-900" />
                </div>
                : text}
        </button>
    );
}

export default SubmitButton;