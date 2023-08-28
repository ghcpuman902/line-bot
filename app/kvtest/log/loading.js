export default function Loading() {
    return (
    <div className="max-w-sm w-full mx-auto">
        <div className="animate-pulse">
            <div className="border border-blue-300 rounded-md text-xl text-blue-600 p-4">
                {`Hey I'm loading.`}
            </div>
        </div>
    </div>
    );
}