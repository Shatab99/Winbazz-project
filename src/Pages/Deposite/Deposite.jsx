import { useState } from 'react';
import bikash from '../../assets/Icons/BKash-Icon-Logo.wine.svg'
import nagad from '../../assets/Icons/Nagad-Logo.wine.png'
import upay from '../../assets/Icons/upay-icon.png'
import rocket from '../../assets/Icons/rocket-logo.png'
import DepositeModal from './DepositeModal';


const Deposite = () => {

    const [amount , setAmount] = useState(null)
    const [method, setMethod] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    // const [len, setLen]= useState(0)
    // const [err, setErr]= useState(null)
    

    return (
        <div>
            <p className="text-lg w-full text-center bg-black p-2 font-semibold text-orange-300">Make Your Deposit</p>
            <div className="p-4 mb-16">

                <div className='mb-4'>
                    <h1 className="text-lg font-semibold">Select Payment Method</h1>
                    <div className='flex flex-wrap items-center justify-start mt-4 gap-2'>
                        <img onClick={()=>setMethod('Bkash')} src={bikash} alt="" className={`w-24 h-20 border-2 rounded-2xl ${method === 'Bkash' && 'border-orange-400'} rounded-xl`} />
                        <img onClick={()=>setMethod('Nagad')} src={nagad} alt="" className={`w-24 h-20 border-2 rounded-2xl ${method === 'Nagad' && 'border-orange-400'} rounded-xl`}  />
                        <img onClick={()=>setMethod('Upay')} src={upay} alt="" className={`w-24 h-20 border-2 rounded-2xl ${method === 'Upay' && 'border-orange-400'} rounded-xl`}  />
                        <img onClick={()=>setMethod('Rocket')} src={rocket} alt="" className={`w-24 h-20 border-2 rounded-2xl ${method === 'Rocket' && 'border-orange-400'} rounded-xl`}  />
                    </div>
                </div>

                <div className='mb-4'>
                    <h1 className="text-lg font-semibold">Select Amount</h1>
                    <div className='grid grid-cols-4 mt-3 gap-2'>
                        <p onClick={()=>setAmount(200)}  className={`bg-black p-1 text-yellow-200 text-center rounded-2xl text-lg ${amount === 200 && 'bg-orange-500'}`} >200</p>
                        <p onClick={()=>setAmount(500)}  className={`bg-black p-1 text-yellow-200 text-center rounded-2xl text-lg ${amount === 500 && 'bg-orange-500'}`} >500</p>
                        <p onClick={()=>setAmount(1000)}  className={`bg-black p-1 text-yellow-200 text-center rounded-2xl text-lg ${amount === 1000 && 'bg-orange-500'}`} >1000</p>
                        <p onClick={()=>setAmount(2000)}  className={`bg-black p-1 text-yellow-200 text-center rounded-2xl text-lg ${amount === 2000 && 'bg-orange-500'}`} >2000</p>
                        <p onClick={()=>setAmount(5000)}  className={`bg-black p-1 text-yellow-200 text-center rounded-2xl text-lg ${amount === 5000 && 'bg-orange-500'}`} >5000</p>
                        <p onClick={()=>setAmount(10000)}  className={`bg-black p-1 text-yellow-200 text-center rounded-2xl text-lg ${amount === 10000 && 'bg-orange-500'}`} >10000</p>
                        <p onClick={()=>setAmount(30000)}  className={`bg-black p-1 text-yellow-200 text-center rounded-2xl text-lg ${amount === 30000 && 'bg-orange-500'}`} >30000</p>
                    </div>
                </div>
                <div className='mb-4 flex flex-col gap-3'>
                    {/* <input type="number" placeholder="Enter Amount Here" className="input input-bordered w-full max-w-sm font-bold text-black" disabled value={amount}/> */}
                    <div className='max-w-sm w-full border-2 border-black p-4 rounded-xl text-lg font-semibold'>{amount ? `You have Seleceted ৳ ${amount} BDT` : 'Please Select Amount Above'}</div>
                    <button onClick={()=> setIsOpen(true)} className='btn text-lg bg-orange-600 text-white hover:bg-orange-800 ' disabled={ !method|| !amount } >Deposite</button>
                </div>
                <DepositeModal isOpen={isOpen} setIsOpen={setIsOpen} amount={amount} method={method} />
            </div>
        </div>
    );
};

export default Deposite;