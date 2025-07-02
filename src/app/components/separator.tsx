
interface SeparatorProps {
    size?: 'lg' | 'md' | 'sm';
}

export const Separator = ({ size = 'md' }: SeparatorProps) => {
    return (
        <hr className={`my-[${size === 'lg' ? '56px' : size === 'md' ? '32px' : '16px'}]`} />
    )
}