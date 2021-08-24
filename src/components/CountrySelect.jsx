import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import NetherlandsData from "../tasks/NetherlandsData";
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

const country = [
    { name: 'All' },
    { name: 'Germany' },
    { name: 'Netherlands' },
];

export default function CountrySelect({ setZoomSelect, setCountry }) {
    const [selected, setSelected] = useState(country[0]);

    useEffect(() => {
        // console.log("Use effect called");
        // console.log(selected);
        // console.log(setCountry);
        setCountry(selected.name);
        if (selected.name == "All") {
            setZoomSelect({ zoom: 6, center: [51, 10] });

        }
        if (selected.name == "Germany") {
            setZoomSelect({ zoom: 8, center: [51, 10] });

        }
        else if (selected.name == "Netherlands") {
            setZoomSelect({ zoom: 8, center: [52, 5] });
        }
    }, [selected]);

    return (

        <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
                <h3 className="text-xl font-bold my-4 text-black">View Country</h3>
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border-gray-500 border-2 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        {/* <SelectorIcon
                                className="w-5 h-5 text-gray-400"
                                aria-hidden="true"
                            /> */}
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {country.map((person, personIdx) => (
                            <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                }
                                value={person}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`${selected ? 'font-medium' : 'font-normal'
                                                } block truncate`}
                                        >
                                            {person.name}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`${active ? 'text-amber-600' : 'text-amber-600'
                                                    }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                            >
                                                {/* <CheckIcon className="w-5 h-5" aria-hidden="true" /> */}
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>

    );
}