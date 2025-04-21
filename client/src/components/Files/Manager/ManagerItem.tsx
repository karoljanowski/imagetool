const ManagerItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex gap-2 border-r pr-4 border-white/20 flex-1 last:border-r-0">
            {children}
        </div>
    )
}

export default ManagerItem;