import Modal from "../../Components/Modal"
import { FaFacebook } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";


const ReferModal = ({isOpen , setIsOpen}) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <div className="grid grid-cols-3 text-5xl gap-9 p-8">
                <a href=""><FaFacebook /></a>
                <a href=""><FaSquareWhatsapp/></a>
                <a href=""><FaSquareXTwitter/></a>
                <a href=""><FaInstagramSquare/></a>
                <a href=""><FaLinkedin/></a>
                <a href=""><SiGmail/></a> 
            </div>
        </Modal>
    );
};

export default ReferModal;