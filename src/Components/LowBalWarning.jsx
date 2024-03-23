import Modal from "./Modal";


const LowBalWarning = ({setIsOpenLb , isOpenLb}) => {
    return (
        <Modal isOpen={isOpenLb} setIsOpen={setIsOpenLb}>
            <div className="flex flex-col items-center gap-5">
                <p className="font-bold text-orange-200 ">Warning !</p>
                <p className="text-3xl font-bold text-red-500 ">Low Balence !!</p>
                <button onClick={()=> setIsOpenLb(false)} className="btn btn-wide btn-sm bg-orange-600 text-red-50">Yeah, I know !</button>
            </div>
        </Modal>
    );
};

export default LowBalWarning;