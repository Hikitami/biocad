import css from './button.module.scss'

interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
    disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', disabled = false }) => {
    return (
        <button type={type} className={css.button} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};
