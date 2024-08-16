
import CustomFileUpload from './FileUploadSection';

function FileUploadSection() {
    return (<>
        <div className="flex justify-center items-center h-screen">
            <div className="items-center justify-center w-[90vw] md:w-[48rem]">
                <h1 className="text-4xl text-center py-4 font-extrabold">UBC Schedule Viewer</h1>
                <h2 className="text-base text-center text-[#83828B] pb-10">Convert the excel file of your schedule into an organized looking schedule.</h2>
                <CustomFileUpload></CustomFileUpload>
            </div>
        </div>
    </>);
}

export default FileUploadSection;