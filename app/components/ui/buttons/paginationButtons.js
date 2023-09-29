export default function PaginationButton({
    value,
    onClick,
    disabled,
    currentPage,
}) {
    const focusedButton =
        value === currentPage ? "bg-[#56c1d6] text-white" : null;

    const prevNextButton =
        value === "Prev"
            ? "w-20 rounded-l"
            : value === "Next"
            ? "w-20 rounded-r"
            : "w-8";

    const hoverOnButton =
        value === currentPage || disabled ? "" : "hover:bg-[#00000004]";

    const classAttr = `my-1 bg-white border-[1px] p-2 text-sm font-medium ${prevNextButton} h-9 text-center ${focusedButton} ${hoverOnButton}`;

    return (
        <button
            className={classAttr}
            onClick={onClick}
            disabled={disabled}>
            {value}
        </button>
    );
}
