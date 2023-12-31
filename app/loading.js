export default function Loader() {
    return (
        <div
            id="loading-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-5">
            <div className="relative inline-flex">
                <div className="w-8 h-8 bg-blue-400 rounded-full absolute top-0 left-0 animate-ping" />
            </div>
        </div>
    );
}
