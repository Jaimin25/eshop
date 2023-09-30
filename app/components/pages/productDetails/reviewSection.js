import { Button, Rating } from "@material-tailwind/react";
import Select from "react-select";
import { FormEvent } from "react";

const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
];

export default function Review() {
    async function onSubmit(event) {
        event.preventDefault();
    }
    return (
        <div className="p-4 px-6 w-11/12 md:w-7/12 lg:w-3/5 bg-white m-2 rounded shadow">
            <h1 className="p-1 mt-2 text-base font-semibold text-[#262626]">
                Add Review
            </h1>
            <form onSubmit={onSubmit}>
                <p className="p-1 mt-2">Title</p>
                <input
                    type="text"
                    placeholder="Enter Review Title"
                    className="h-[45px] w-full text-sm px-[10px] py-[8px] border rounded-sm cursor-text outline-none"
                    required></input>
                <p className="p-1 mt-2">Comment</p>
                <textarea
                    type="text"
                    placeholder="Write comment"
                    rows="5"
                    className=" w-full resize-y text-sm px-[10px] py-[8px] border rounded-sm cursor-text outline-none"
                    required></textarea>
                <p className="p-1 mt-2">Rating</p>

                <Rating
                    className="mx-[2px]"
                    onChange={(count) => console.log(count)}
                />
                <p className="p-1 mt-2">Will you recommend this product?</p>
                <Select
                    className="text-sm"
                    options={options}
                />
                <Button
                    type="submit"
                    size="sm"
                    variant="outlined"
                    className="my-4"
                    ripple={false}>
                    Submit
                </Button>
            </form>
        </div>
    );
}
