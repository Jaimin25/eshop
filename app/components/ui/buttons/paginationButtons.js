export default function PaginationButton({
    value,
    onClick,
    disabled,
    currentPage,
}) {
    const focusedButton =
        value === currentPage ? "bg-[#56c1d6] text-white" : "bg-white";

    const prevNextButton =
        value === "Prev"
            ? "w-20 rounded-l"
            : value === "Next"
            ? "w-20 rounded-r"
            : "w-8";

    const hoverOnButton =
        value === currentPage || disabled ? "" : "hover:bg-[#00000004]";

    const classAttr = `${focusedButton} my-1 border-[1px] p-2 text-sm font-medium ${prevNextButton} h-9 text-center  ${hoverOnButton}`;

    return (
        <button
            className={classAttr}
            onClick={onClick}
            disabled={disabled}>
            {value}
        </button>
    );
}
