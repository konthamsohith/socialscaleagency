import { motion } from 'framer-motion';

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
}

export const Switch = ({ checked, onCheckedChange, disabled = false }: SwitchProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onCheckedChange(!checked)}
            className={`
                relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-electric-purple/20
                ${checked ? 'bg-electric-purple' : 'bg-slate-200'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            <motion.span
                animate={{ x: checked ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0"
            />
        </button>
    );
};
