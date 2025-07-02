


const TakeTests = ({
    isOpen,
    onClose,
}: {
    isOpen: Boolean;
    onClose: () => void;
}) => {

    if (!isOpen) return null;



    return (

        <div>

            <h2 className="text-lg font-bold">Take Test</h2>


            <button
                onClick={onClose}
                className="btn btn-primary translate-y-90"
            >
                Close
            </button>
        </div>
    );
};

export default TakeTests;