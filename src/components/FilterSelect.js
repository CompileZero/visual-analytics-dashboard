import { useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';

const plans = [
    {
        name: 'Total Cases',
        description: 'Region-wise daily cases',
    },
    {
        name: 'Cases: 7 Day-Average',
        description: 'Accumulated cases in the Past 7 days',
    },
    {
        name: 'Total Deaths',
        description: 'Region-wise daily cases',
    },
    {
        name: 'Deaths: 7 Day-Average',
        description: 'Accumulated cases in the Past 7 days',
    },
];

export default function FilterSelect({ setMetric }) {
    const [selected, setSelected] = useState(plans[0].name);
    // let metric = plans[0];

    // function setSelected(value) {
    //     metric = value;
    //     setMetric(value);
    // };

    useEffect(() => {
        setMetric(selected);
    }, [selected]);

    return (
        <div className="w-full px-2 py-4
        ">

            <div className="w-full max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-4 text-black">Filter By</h3>
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">Metric</RadioGroup.Label>
                    <div className="space-y-2">
                        {plans.map((plan) => (
                            <RadioGroup.Option
                                key={plan.name}
                                value={plan.name}
                                className={({ active, checked }) =>
                                    `${active
                                        ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-opacity-60'
                                        : ''
                                    }
                  ${checked ? ' bg-yellow-300 text-gray-800' : 'bg-white'}
                    relative rounded-md border-2 px-5 py-2 cursor-pointer flex focus:outline-none`
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                                <div className="text-sm font-medium">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-bold  ${checked ? 'text-gray-900' : 'text-gray-700'
                                                            }`}
                                                    >
                                                        {plan.name}
                                                    </RadioGroup.Label>
                                                    {/* <RadioGroup.Description
                                                        as="span"
                                                        className={`inline ${checked ? 'text-sky-800' : 'text-gray-500'
                                                            }`}
                                                    >
                                                        <span>{plan.description}</span>
                                                    </RadioGroup.Description> */}
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className="flex-shrink-0 text-white">
                                                    <CheckIcon className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

