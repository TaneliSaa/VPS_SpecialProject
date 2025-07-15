
interface Props {
    isOpen: Boolean;
    onClose: () => void;
}


const PatientIntroduction = ({isOpen, onClose}: Props)=> {

    if (!isOpen) return null;



    return (

        <div>

            <h2 className="text-lg font-bold">Patient Introduction</h2>

            <button
                className="btn btn-primary translate-y-87"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    );
};

export default PatientIntroduction;