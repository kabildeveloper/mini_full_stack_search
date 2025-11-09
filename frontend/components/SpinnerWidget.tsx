const SpinnerWidget = () => {
    return (
        <div className="absolute w-dvw h-dvh left-0 top-0 flex flex-col items-center justify-center min-h-screen bg-transparent">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 text-sm">Loading...</p>
        </div>
    )
}

export default SpinnerWidget;