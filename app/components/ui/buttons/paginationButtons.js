export default function PaginationButton({ value, onClick, disabled }) {
    const classAttr =
        value === "Prev" || value === "Next"
            ? "my-1 bg-white border-[1px] p-2 text-sm font-medium w-20 h-9 text-center"
            : "my-1 bg-white border-[1px] p-2 text-sm font-medium w-8 h-9 text-center";

    return (
        <button
            className={classAttr}
            onClick={onClick}
            disabled={disabled}>
            {value}
        </button>
    );
}
