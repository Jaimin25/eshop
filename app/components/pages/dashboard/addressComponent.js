export default function AddressLayout() {
    return (
        <div className="flex flex-col w-full p-2">
            <p className="text-base font-bold p-2 text-[#262626]">Address</p>
            <hr className="border-b-1 m-2" />
            <p className="px-2 py-4 pb-1 text-sm">Address</p>
            <input
                className="text-xs outline-none p-3 border mx-2 rounded-sm"
                type="text"
                placeholder="Street, House No/Apartment No"
            />
            <p className="px-2 py-4 pb-1 text-sm">City</p>
            <input
                className="text-xs outline-none p-3 border mx-2"
                type="text"
                placeholder="City"
            />
            <div className="flex">
                <div className="flex flex-col mr-2 flex-1">
                    <p className="px-2 py-4 pb-1 text-sm">State</p>
                    <input
                        className="text-xs outline-none p-3 border mx-2"
                        type="text"
                        placeholder="State"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <p className="px-2 py-4 pb-1 text-sm">Country</p>
                    <input
                        className="text-xs outline-none p-3 border mx-2"
                        type="text"
                        placeholder="Country"
                    />
                </div>
            </div>
            <p className="px-2 py-4 pb-1 text-sm">Zipcode</p>
            <input
                className="text-xs outline-none p-3 border mx-2"
                type="text"
                placeholder="Zipcode"
            />
            <div className="p-2 mt-2 text-sm text-[#323232]">
                <button className="p-2 border outline-none">
                    Save Changes
                </button>
            </div>
        </div>
    );
}
