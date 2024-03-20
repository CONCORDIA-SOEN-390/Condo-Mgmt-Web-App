export default function CardHeader({children, title}: {children: React.ReactNode, title: string}){
    return (
        <div className="grid grid-cols-2 bg-blue-200 rounded-t-lg">
          <div className="p-2 font-semibold text-black text-2xl">{title}</div>
          <div className="p-2 flex justify-end items-center text-black text-3xl gap-5">
            {children}
          </div>
        </div>
    );
}