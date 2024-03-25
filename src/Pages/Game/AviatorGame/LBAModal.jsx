import Modal from "../../../Components/Modal";


const LBAModal = ({ isOpen, setIsOpen, lBet, setLBet }) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <div className="flex flex-col items-center gap-4">
                <p>Right Side Bet Amount</p>
                <div className='grid grid-cols-3 gap-3'>
                    <button onClick={() => setLBet(20)} className={`btn btn-outline btn-circle  ${lBet === 20 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>20</button>
                    <button onClick={() => setLBet(30)} className={`btn btn-outline btn-circle  ${lBet === 30 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>30</button>
                    <button onClick={() => setLBet(50)} className={`btn btn-outline btn-circle  ${lBet === 50 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>50</button>
                    <button onClick={() => setLBet(100)} className={`btn btn-outline btn-circle  ${lBet === 100 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>100</button>
                    <button onClick={() => setLBet(200)} className={`btn btn-outline btn-circle  ${lBet === 200 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>200</button>
                    <button onClick={() => setLBet(500)} className={`btn btn-outline btn-circle  ${lBet === 500 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>500</button>
                </div>
                <button onClick={()=>setIsOpen(false)} className="btn btn-sm bg-orange-700 btn-wide" >Select Confirm</button>
            </div>
        </Modal>
    );
};

export default LBAModal;