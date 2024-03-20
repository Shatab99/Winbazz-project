import empty from "../assets/Icons/empty.png"

const Empty = () => {
    return (
        <div className="max-w-sm mx-auto space-x-4 my-12">
           <img src={empty} alt=""  className="mx-auto w-32 h-32"/> 
           <p className="text-center animate-pulse font-semibold">Opss !! {`It's`} empty ..</p>
        </div>
    );
};

export default Empty;